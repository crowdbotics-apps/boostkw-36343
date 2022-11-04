from django_filters.rest_framework import filterset

from trackers.models import JobProcess, CustomerTracker


class CustomerTrackerFilterSet(filterset.FilterSet):
    class Meta:
        model = CustomerTracker
        fields = ['status', 'is_battery', 'crew', 'roof_type', 'location']


class JobProcessFilterSet(filterset.FilterSet):
    class Meta:
        model = JobProcess
        fields = ['customer_tracker', 'status']
