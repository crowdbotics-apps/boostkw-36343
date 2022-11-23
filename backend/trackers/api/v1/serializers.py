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
            },
            'total_paused_time_seconds': {
                'read_only': True
            }
        }

    def validate(self, attrs):
        errors = {}
        if self.instance.pk:
            instance_last_paused_datetime = self.instance.last_paused_datetime
            total_paused_time_seconds = self.instance.total_paused_time_seconds
            start_datetime = self.instance.start_datetime
            end_datetime = self.instance.end_datetime
            instance_status = self.instance.status
            if 'status' in attrs:
                status = attrs.get('status')
            if 'start_datetime' in attrs:
                start_datetime = attrs.get('start_datetime')

            if not start_datetime or start_datetime == "":
                errors.update({
                    'start_datetime': _('Start Datetime is required.')
                })

            if 'end_datetime' in attrs:
                end_datetime = attrs.get('end_datetime')

            if end_datetime and end_datetime < start_datetime:
                errors.update({
                    'end_datetime': _('End Datetime must be greater than or equal to Start datetime.')
                })

            # instance_is_paused = self.instance.is_paused

            # is_paused = attrs.get('is_paused', None)
            if 'status' in attrs and attrs.get('status') != JobProcess.STATUS_PAUSED and 'last_paused_datetime' in \
                    attrs:
                attrs.pop('last_paused_datetime')

            if 'last_paused_datetime' in attrs and (
                    'status' not in attrs or attrs.get('status') != JobProcess.STATUS_PAUSED):
                errors.update({
                    'status': 'This field is required and value must be "paused" for "last_paused_datetime" field.'
                })
            if 'last_paused_datetime' in attrs:
                last_paused_datetime = attrs.get('last_paused_datetime')
                if end_datetime and last_paused_datetime > end_datetime:
                    errors.update({
                        'last_paused_datetime': _('Last paused Datetime must be less than or equal to end datetime.')
                    })
                if (start_datetime and last_paused_datetime < start_datetime) or \
                        (instance_last_paused_datetime and last_paused_datetime <
                         instance_last_paused_datetime):
                    # raise serializers.ValidationError({
                    #         'last_paused_datetime': [
                    #             _('Must be greater than Start Datetime.')
                    #         ]
                    #     })
                    errors.update(
                        {
                            'last_paused_datetime': [
                                _('Must be greater than Start Datetime/Previous Last Paused Datetime.')
                            ]
                        }

                    )
            if 'status' in attrs and attrs.get('status') == JobProcess.STATUS_ACTIVE:
                if instance_status == JobProcess.STATUS_PAUSED:
                    second_difference = datetime_difference_in_seconds(self.instance.last_paused_datetime,
                                                                       attrs.get('resuming_datetime'))
                    attrs['total_paused_time_seconds'] = total_paused_time_seconds + round(second_difference)

                # if self.instance.last_paused_datetime and last_paused_datetime >= self.instance.last_paused_datetime:
                #     # second_difference_check = datetime_difference_in_seconds(self.instance.last_paused_datetime,
                #     #                                                    last_paused_datetime)
                #     second_difference = datetime_difference_in_seconds(self.instance.last_paused_datetime,
                #                                                        last_paused_datetime)
                #     print(round(second_difference))
                #     attrs['total_paused_time_seconds'] = total_paused_time_seconds + round(second_difference)

            if 'status' in attrs and attrs.get('status') == JobProcess.STATUS_COMPLETED:
                if 'end_datetime' not in attrs:
                    errors.update({
                        'end_datetime': _('`end_datetime` is required for status `completed`.')
                    })

            if 'end_datetime' in attrs:
                end_datetime = attrs.get('end_datetime')
                if 'status' not in attrs or attrs.get('status') != JobProcess.STATUS_COMPLETED:
                    errors.update({
                        'status': _('Status `completed` is required for `end_datetime`.')
                    })
                last_paused_datetime = self.instance.last_paused_datetime
                if 'last_paused_datetime' in attrs:
                    last_paused_datetime = attrs.get('last_paused_datetime')

                if (self.instance.start_datetime and end_datetime < self.instance.start_datetime) or (
                        last_paused_datetime and end_datetime < last_paused_datetime):
                    errors.update(
                        {
                            'end_datetime': [
                                _('Must be greater than or equal to Start Datetime/Last '
                                  'Paused Datetime.')
                            ]
                        }

                    )

            if len(errors) > 0:
                raise serializers.ValidationError(errors)

        return attrs


class JobProcessListSerializer(serializers.ModelSerializer):
    time_spent = serializers.JSONField(source='get_time_spent', read_only=True)
    time_spent_seconds = serializers.JSONField(source='get_time_spent_seconds', read_only=True)

    class Meta:
        model = JobProcess
        fields = '__all__'
        extra_kwargs = {
            'customer_tracker': {
                'read_only': True
            },
            'total_paused_time_seconds': {
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
    total_time_spent_seconds = serializers.IntegerField(read_only=True, default=0)
    total_seconds_per_job = serializers.IntegerField(read_only=True, default=0)

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


class CustomerTrackerDetailSerializer(serializers.ModelSerializer):
    # total_time_spent_seconds = serializers.IntegerField(source='get_total_time_spent_seconds', read_only=True)
    total_time_spent_seconds = serializers.IntegerField(read_only=True)
    total_time_spent_display = serializers.SerializerMethodField(method_name='get_total_time_spent_display')

    class Meta:
        model = CustomerTracker
        fields = '__all__'

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

    def get_total_time_spent_display(self, instance):
        if instance.total_time_spent_seconds:
            return seconds_to_readable_time(instance.total_time_spent_seconds)
        return {
            'hours': 0,
            'minutes': 0,
            'left_seconds': 0,
        }
