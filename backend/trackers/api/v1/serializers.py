from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from crews.api.v1.serializers import CrewSerializer
from roofs.api.v1.serializers import RoofTypeSerializer
from trackers.models import *


class TrackerInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerInput
        fields = '__all__'


class JobProcessSerializer(serializers.ModelSerializer):
    time_spent = serializers.JSONField(source='get_time_spent', read_only=True)

    class Meta:
        model = JobProcess
        fields = '__all__'
        extra_kwargs = {
            'customer_tracker': {
                'read_only': True
            }
        }


class CustomerTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerTracker
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }


class CustomerTrackerSerializerWithJobProcess(serializers.ModelSerializer):
    # job_processes = JobProcessSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerTracker
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }

    def to_representation(self, instance):
        res = super(self.__class__, self).to_representation(instance)
        res['roof_type'] = RoofTypeSerializer(instance.roof_type).data
        res['crew'] = CrewSerializer(instance.crew).data
        res['job_processes'] = JobProcessSerializer(instance.job_processes, many=True).data
        return res
