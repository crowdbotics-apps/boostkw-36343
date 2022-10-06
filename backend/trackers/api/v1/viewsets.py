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
            serializer = JobProcessSerializer(instance.job_processes, many=True)
            return Response(serializer.data)

        elif self.request.method == 'POST':
            serializer = JobProcessSerializer(data=self.request.data, context={'request': self.request})
            if serializer.is_valid(raise_exception=True):
                serializer.save(customer_tracker_input=instance)
                return Response(serializer.data)
            return Response(serializer.errors)

        return Response(status=400)


class JobProcessViewSet(viewsets.ModelViewSet):
    serializer_class = JobProcessSerializer
    queryset = JobProcess.objects.none()
    search_fields = ['title']
    filterset_class = JobProcessFilterSet

    def get_queryset(self):
        return JobProcess.objects.filter(customer_tracker__user=self.request.user)
