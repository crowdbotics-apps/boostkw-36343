from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from feedbacks.models import *


class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = '__all__'


class UserFeedbackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = '__all__'

        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }
