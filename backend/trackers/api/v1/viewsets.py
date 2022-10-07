from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .filtersets import JobProcessFilterSet
from .serializers import *


class CustomerTrackerInputViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerTrackerSerializerWithJobProcess
    queryset = CustomerTracker.objects.all()
    search_fields = ['job_code', 'customer_name']

    def get_queryset(self):
        return CustomerTracker.objects.select_related(
            'user', 'crew', 'roof_type'
        ).prefetch_related(
            'job_processes'
        ).filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['GET', 'POST'], url_path='job-processes', name='Job Processes',
            url_name='job_processes',
            serializer_class=JobProcessSerializer)
    def get_job_processes(self, *args, **kwargs):
        instance = self.get_object()
        if self.request.method == 'GET':
            if instance.job_processes.count() < 1:
                from trackers.utils import create_customer_tracker_job_process
                create_customer_tracker_job_process(instance, created=True)
            serializer = JobProcessSerializer(instance.job_processes, many=True)
            return Response(serializer.data)

        elif self.request.method == 'POST':
            serializer = JobProcessSerializer(data=self.request.data, context={'request': self.request})
            if serializer.is_valid(raise_exception=True):
                serializer.save(customer_tracker=instance)
                return Response(serializer.data)
            return Response(serializer.errors)

        return Response(status=400)

    @action(detail=True, methods=['GET', 'PATCH'], url_path=r'job-processes/(?P<job_process_id>\d+)',
            url_name='job_process_detail',
            name='Job Process Detail', serializer_class=JobProcessSerializer)
    def get_job_process_detail(self, *args, **kwargs):
        print(kwargs.get('pk'))
        print(kwargs.get('job_process_id'))
        customer_tracker_id = kwargs.get('pk')
        try:
            customer_tracker = CustomerTracker.objects.get(id=customer_tracker_id)
        except CustomerTracker.DoesNotExist:
            return Response({'detail': 'Invalid customer tracker request.'}, status=404)

        job_process_id = kwargs.get('job_process_id')
        try:
            job_process = JobProcess.objects.get(id=job_process_id, customer_tracker_id=customer_tracker_id)
        except JobProcess.DoesNotExist:
            raise Http404

        if self.request.method == 'GET':
            serializer = JobProcessSerializer(job_process)
            return Response(serializer.data)
        # elif self.request.method == 'POST':
        # instance = self.get_object()
        return Response({'instance': 1})


class JobProcessViewSet(viewsets.ModelViewSet):
    serializer_class = JobProcessSerializer
    queryset = JobProcess.objects.none()
    search_fields = ['title']
    filterset_class = JobProcessFilterSet

    def get_queryset(self):
        return JobProcess.objects.filter(customer_tracker__user=self.request.user)
