from datetime import timedelta

from rest_framework.generics import *
from rest_framework.response import Response
from django.db.models.functions import Coalesce
from .filtersets import CustomerTrackerFilterSet
from .serializers import *
from ...db_utils import customer_tracker_job_process_subqs


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
        print(request.headers)
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
