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
            },
            'location': {
                'required': True
            },
            'roof_type': {
                'required': True
            },
            'crew': {
                'required': True
            }
        }

    def to_representation(self, instance):
        res = super(self.__class__, self).to_representation(instance)
        res['roof_type'] = None
        if instance.roof_type:
            res['roof_type'] = RoofTypeSerializer(instance.roof_type).data
        res['crew'] = None
        if instance.crew:
            res['crew'] = CrewSerializer(instance.crew).data
        res['job_processes'] = JobProcessSerializer(instance.job_processes, many=True).data
        return res

    def validate(self, attrs):
        if self.instance:
            if 'job_code' in attrs:
                attrs.pop('job_code')

        if not self.instance:
            is_battery = attrs.get('is_battery', False)
            number_of_batteries = attrs.get('number_of_batteries', None)
            attrs['status'] = 'active'
            if is_battery and number_of_batteries is None:
                raise serializers.ValidationError({
                    'number_of_batteries': _('This field is required if the battery is selected.')
                })
            if not is_battery and number_of_batteries:
                raise serializers.ValidationError({
                    'number_of_batteries': _('This field is required if the battery is selected.')
                })

            attrs['is_battery'] = is_battery

        return attrs
