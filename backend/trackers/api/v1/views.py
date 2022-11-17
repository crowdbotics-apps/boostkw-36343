from datetime import timedelta

from django.utils import timezone
from rest_framework.generics import *
from rest_framework.response import Response
from django.db.models.functions import Coalesce
from .filtersets import CustomerTrackerFilterSet
from .serializers import *


class TrackerInputListAPI(ListAPIView):
    serializer_class = TrackerInputSerializer
    queryset = TrackerInput.objects.all()


class CustomerTrackerActiveDetailAPIView(RetrieveAPIView):
    serializer_class = CustomerTrackerSerializerWithJobProcess
    queryset = CustomerTracker.objects.none()

    def get_queryset(self):
        return CustomerTracker.objects.select_related(
            'user', 'crew', 'roof_type'
        ).prefetch_related(
            'job_processes'
        ).filter(user=self.request.user, status=CustomerTracker.STATUS_ACTIVE)

    def get_object(self):
        try:
            return self.get_queryset().first()
        except CustomerTracker.DoesNotExist:
            raise Http404


class CustomerTrackerListAPIView(ListCreateAPIView):
    serializer_class = CustomerTrackerSerializerWithJobProcess
    queryset = CustomerTracker.objects.all()
    search_fields = ['job_code', 'customer_name']
    filterset_class = CustomerTrackerFilterSet
    ordering_fields = ['created', 'updated']

    def get_queryset(self):
        from trackers.db_utils import customer_tracker_job_process_subqs
        queryset = CustomerTracker.objects.select_related(
            'user', 'crew', 'roof_type'
        ).prefetch_related(
            'job_processes'
        ).filter(user=self.request.user)
        queryset = queryset.annotate(
            total_time_spent_seconds=customer_tracker_job_process_subqs(),
        )
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        check_active = self.get_queryset().filter(status=CustomerTracker.STATUS_ACTIVE).exists()
        if check_active:
            return Response({
                'detail': 'You already have an active project.'
            }, status=400)
        return super(CustomerTrackerListAPIView, self).create(request, *args, **kwargs)


class CustomerTrackerDetailAPIView(RetrieveUpdateDestroyAPIView):
    # serializer_class = CustomerTrackerSerializerWithJobProcess
    serializer_class = CustomerTrackerDetailSerializer

    def get_queryset(self):
        from trackers.db_utils import customer_tracker_job_process_subqs
        queryset = CustomerTracker.objects.select_related(
            'user', 'crew', 'roof_type'
        ).prefetch_related(
            'job_processes'
        ).filter(user=self.request.user)
        queryset = queryset.annotate(
            total_time_spent_seconds=customer_tracker_job_process_subqs(),
        )
        return queryset

    def update(self, request, *args, **kwargs):
        return super(CustomerTrackerDetailAPIView, self).update(request, *args, **kwargs)


class CustomerTrackerJobProcessListAPIView(ListCreateAPIView):
    serializer_class = JobProcessListSerializer
    queryset = JobProcess.objects.none()
    pagination_class = None

    def get_queryset(self):
        queryset = JobProcess.objects.filter(customer_tracker_id=self.kwargs.get('pk'),
                                             customer_tracker__user=self.request.user)

        return queryset


class CustomerTrackerJobProcessDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = JobProcessSerializer
    queryset = JobProcess.objects.none()
    lookup_url_kwarg = 'job_process_id'

    def get_queryset(self):
        return JobProcess.objects.filter(customer_tracker_id=self.kwargs.get('pk'),
                                         customer_tracker__user=self.request.user)


class UserTrackerStatsDetailView(RetrieveAPIView):
    def get_queryset(self):
        return self.request.user.customer_trackers.all()

    def get(self, request, *args, **kwargs):
        from trackers.db_utils import customer_tracker_job_process_subqs, job_process_time_spend_seconds_sub_qs

        trackers = CustomerTracker.objects.filter(user=self.request.user,
                                                  status=CustomerTracker.STATUS_CLOSED).annotate(
            total_job_process=models.Count('job_processes'),
        )

        job_processes = JobProcess.objects.filter(
            customer_tracker__user=self.request.user,
            customer_tracker__status=CustomerTracker.STATUS_CLOSED
        ).annotate(
            time_spent_seconds=job_process_time_spend_seconds_sub_qs(),
            # seconds_per_job=models.F('time_spent_seconds') * models.F('customer_tracker__number_of_workers')
            system_size=models.F('customer_tracker__system_size'),
            number_of_workers=models.F('customer_tracker__number_of_workers')
        ).annotate(
            seconds_per_job=models.ExpressionWrapper(
                models.F('time_spent_seconds') * models.F('number_of_workers'),
                output_field=models.IntegerField(),
            ),
            seconds_per_kw=models.ExpressionWrapper(
                models.F('seconds_per_job') / models.F('system_size'),
                output_field=models.DecimalField(default=0, decimal_places=2),
            )

        )
        total_job_process = job_processes.count()
        job_processes_result = job_processes.aggregate(
            total_time_spent_seconds=models.Sum('time_spent_seconds', output_field=models.IntegerField(default=0)),
            total_seconds_per_job=models.Sum('seconds_per_job', output_field=models.IntegerField(default=0)),
            total_system_size=models.Sum('system_size', output_field=models.DecimalField(default=0, decimal_places=2)),
            avg_seconds_per_kw=models.Avg('seconds_per_kw',
                                          output_field=models.DecimalField(default=0, decimal_places=2)),
        )

        now_year = timezone.now().year

        monthly_list_avg = job_processes.filter(created__year=now_year).annotate(
            month=models.functions.ExtractMonth('created'),
            year=models.functions.ExtractYear('created'),
        ).order_by().values(
            'year', 'month'
        ).annotate(
            avg_time_spent_seconds=models.Avg('time_spent_seconds'),
            avg_seconds_per_kw=models.Avg('seconds_per_kw'),
        ).values('year', 'month', 'avg_time_spent_seconds', 'avg_seconds_per_kw')

        # for m in monthly_list_avg:
        #     print(m)

        for job in job_processes:
            print('time_spent_seconds', job.time_spent_seconds)
            # print('seconds_per_job', job.seconds_per_job)
        #     print('seconds_per_kw', job.seconds_per_kw)
        # print('seconds_per_job', job.number_of_workers * int(job.time_spent_seconds))
        response = {
            'success': True,
            'total_job_process': total_job_process,
            'total_time_spent_seconds': job_processes_result['total_time_spent_seconds'],
            'total_seconds_per_job': job_processes_result['total_seconds_per_job'],
            'total_system_size': job_processes_result['total_system_size'],
            'avg_seconds_per_kw': 0,
            'total_installations': trackers.count(),
            # 'working_time': working_time,
        }
        if job_processes_result['avg_seconds_per_kw']:
            response['avg_seconds_per_kw'] = round(job_processes_result['avg_seconds_per_kw'], 2),

        if monthly_list_avg:
            response['monthly_list_avg'] = monthly_list_avg

        return Response(response)


class UserTrackerStatsDailyChartDetailView(RetrieveAPIView):
    def get_queryset(self):
        return self.request.user.customer_trackers.all()

    def get(self, request, *args, **kwargs):
        month = request.GET.get('month', None)
        year = request.GET.get('year', None)
        now_datetime = timezone.now()

        if not month:
            month = now_datetime.month
        if not year:
            year = now_datetime.year
        from trackers.db_utils import customer_tracker_job_process_subqs, job_process_time_spend_seconds_sub_qs

        job_processes = JobProcess.objects.filter(
            customer_tracker__user=self.request.user,
            customer_tracker__status=CustomerTracker.STATUS_CLOSED,
            created__year=year, created__month=month
        ).annotate(
            time_spent_seconds=job_process_time_spend_seconds_sub_qs(),
            # seconds_per_job=models.F('time_spent_seconds') * models.F('customer_tracker__number_of_workers')
            system_size=models.F('customer_tracker__system_size'),
            number_of_workers=models.F('customer_tracker__number_of_workers')
        ).annotate(
            seconds_per_job=models.ExpressionWrapper(
                models.F('time_spent_seconds') * models.F('number_of_workers'),
                output_field=models.IntegerField(),
            ),
            seconds_per_kw=models.ExpressionWrapper(
                models.F('seconds_per_job') / models.F('system_size'),
                output_field=models.DecimalField(default=0, decimal_places=2),
            )

        )

        daily_list_avg = job_processes.annotate(
            day=models.functions.ExtractDay('created'),
            month=models.functions.ExtractMonth('created'),
            year=models.functions.ExtractYear('created'),
        ).order_by().values(
            'day', 'month', 'year',
        ).annotate(
            avg_time_spent_seconds=models.Avg('time_spent_seconds'),
            avg_seconds_per_kw=models.Avg('seconds_per_kw'),
        ).values('year', 'month', 'day', 'avg_time_spent_seconds', 'avg_seconds_per_kw').order_by(
            '-day', '-month', '-year',
        )

        if daily_list_avg and len(daily_list_avg):
            return Response(daily_list_avg)

        return Response([])
