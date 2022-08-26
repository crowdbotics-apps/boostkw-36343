from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
import os

from modules.model_mixins import TimeStampModel
from .utils import BRANCH_CHOICES


def user_profile_picture_path(instance, filename):
    return os.path.join(
        'users', f'user_{instance.id}', 'profile_picture', filename
    )


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    email = models.EmailField(_('Email'), unique=True)

    profile_picture = models.ImageField(_('Profile Picture'), upload_to=user_profile_picture_path, default=None,
                                        null=True, blank=True)

    crew = models.ForeignKey('crews.Crew', null=True, blank=True, on_delete=models.SET_NULL)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    @property
    def get_branch(self):
        if self.profile and self.profile.branch:
            return {
                'value': self.profile.branch,
                'name': self.profile.get_branch_display(),
            }
        return None

    @property
    def get_job_title(self):
        if self.profile and self.profile.job_title:
            return {
                'value': self.profile.job_title,
                'name': self.profile.get_job_title_display(),
            }
        return None


class Profile(TimeStampModel):
    JOB_TITLE_CHOICES = (
        ('installer', _('Installer')),
        ('lead_installer', _('Lead Installer')),
        ('foreman', _('Foreman')),
        ('electrician', _('Electrician')),
        ('pv_installer', _('PV Installer')),
    )

    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='profile')
    branch = models.CharField(_('Branch'), choices=BRANCH_CHOICES, max_length=10, default='', null=True, blank=True)
    job_title = models.CharField(_('Job Title'), choices=JOB_TITLE_CHOICES, max_length=20, default='', null=True,
                                 blank=True)

    class Meta:
        ordering = ('user__username',)
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')
