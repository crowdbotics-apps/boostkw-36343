from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from roofs.models import *


class RoofTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoofType
        fields = '__all__'
