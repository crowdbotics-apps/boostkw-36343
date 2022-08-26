from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from crews.models import *


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = '__all__'


class CrewSerializerName(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ['id', 'name', 'slug']
