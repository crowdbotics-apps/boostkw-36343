from rest_framework.generics import *

from .serializers import *


class TrackerInputListAPI(ListAPIView):
    serializer_class = TrackerInputSerializer
    queryset = TrackerInput.objects.all()


class CustomerTrackerListAPIView(ListCreateAPIView):
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


class CustomerTrackerDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CustomerTrackerSerializerWithJobProcess

    def get_queryset(self):
        return CustomerTracker.objects.select_related(
            'user', 'crew', 'roof_type'
        ).prefetch_related(
            'job_processes'
        ).filter(user=self.request.user)


class CustomerTrackerJobProcessListAPIView(ListCreateAPIView):
    serializer_class = JobProcessSerializer
    queryset = JobProcess.objects.none()
    pagination_class = None

    def get_queryset(self):
        return JobProcess.objects.filter(customer_tracker_id=self.kwargs.get('pk'),
                                         customer_tracker__user=self.request.user)


class CustomerTrackerJobProcessDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = JobProcessSerializer
    queryset = JobProcess.objects.none()

    def get_queryset(self):
        return JobProcess.objects.filter(customer_tracker_id=self.kwargs.get('pk'),
                                         customer_tracker__user=self.request.user)
