from django_filters.rest_framework import filterset

from trackers.models import JobProcess


class JobProcessFilterSet(filterset.FilterSet):
    class Meta:
        model = JobProcess
        fields = ['customer_tracker']
