from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from trackers.models import *


class TrackerInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerInput
        fields = '__all__'
