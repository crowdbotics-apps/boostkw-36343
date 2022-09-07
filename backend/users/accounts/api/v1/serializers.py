from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from dj_rest_auth.serializers import PasswordResetSerializer

from crews.api.v1.serializers import CrewSerializerName
from users.accounts.forms import CustomResetPasswordForm
from users.api.v1.serializers import ProfileSerializer
from users.models import *
from users.utils import BRANCH_CHOICES

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    branch = serializers.ChoiceField(choices=BRANCH_CHOICES, required=True, allow_blank=False, write_only=True)
    job_title = serializers.ChoiceField(choices=Profile.JOB_TITLE_CHOICES, required=True, allow_blank=False,
                                        write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'profile_picture', 'crew', 'branch',
                  'job_title')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
            'first_name': {
                'required': True,
            },
            'last_name': {
                'required': True,
            },
            'crew': {
                'required': True,
            },
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')
        profile_picture = validated_data.get('profile_picture')
        crew = validated_data.get('crew')

        branch = validated_data.pop('branch')
        job_title = validated_data.pop('job_title')

        name = f'{first_name} {last_name}'
        user = User(
            first_name=first_name,
            last_name=last_name,
            email=validated_data.get('email'),
            name=name.strip(),
            crew=crew,
            username=generate_unique_username([
                name.strip(),
                email,
                'user'
            ])
        )
        if profile_picture:
            user.profile_picture = profile_picture
        user.set_password(validated_data.get('password'))
        user.save()
        if user:
            try:
                Profile.objects.create(user=user, branch=branch, job_title=job_title)
            except Exception as err:
                print(err)
        request = self._get_request()
        try:
            setup_user_email(request, user, [])
        except Exception as err:
            print(err)
            pass

        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class UserSerializerForAuth(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture', 'date_joined',
                  'crew', 'profile']
        read_only_fields = ('username', 'email',)

    def to_representation(self, instance):
        res = super(UserSerializerForAuth, self).to_representation(instance)
        if instance.crew:
            res['crew'] = CrewSerializerName(instance.crew).data

        return res

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profile = validated_data.pop('profile')
            super(UserSerializerForAuth, self).update(instance, validated_data)
            try:
                ProfileSerializer().update(instance.profile, profile)
            except Profile.DoesNotExist:
                Profile.objects.create(user=instance, **profile)
            return instance
        return super(UserSerializerForAuth, self).update(instance, validated_data)


class AccountPasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    # password_reset_form_class = CustomResetPasswordForm
    password_reset_form_class = ResetPasswordForm

    def save(self):
        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account.forms import default_token_generator
        else:
            from django.contrib.auth.tokens import default_token_generator

        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL')
        subject = f'BOOSTKW | Password Reset E-mail'
        opts = {
            'subject': subject,
            'use_https': request.is_secure(),
            'from_email': f'BOOSTKW <{from_email}>',
            'request': request,
            'token_generator': default_token_generator,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class UserAthleteSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'password', 'profile_picture',)
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
            'username': {
                'read_only': True,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')
        profile_picture = validated_data.get('profile_picture')
        username = generate_unique_username([
            first_name, last_name, email, 'user'
        ])
        user = User(
            email=validated_data.get('email'),
            first_name=first_name,
            last_name=last_name,
            username=username,
        )
        user.set_password(validated_data.get('password'))
        if profile_picture:
            user.profile_picture = profile_picture
        user.save()

        request = self._get_request()
        try:
            setup_user_email(request, user, [])
        except Exception as err:
            print(err)
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()
