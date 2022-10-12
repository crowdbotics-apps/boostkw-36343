from django.core import validators
from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db import models

from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from modules.model_mixins import TimeStampModel, ModelFieldChangeStatusMixin
from modules.utils import datetime_difference_in_seconds
from trackers.validators import job_code_validator
from trackers.utils import (seconds_to_readable_time)

LOCATION_ROOF = 'roof'
LOCATION_GROUND = 'ground'

LOCATION_CHOICES = (
    (LOCATION_ROOF, 'Roof'),
    (LOCATION_GROUND, 'Ground')
)


class TrackerInput(TimeStampModel):
    TRACKER_INPUT_TYPE_WORDS = 'words'
    TRACKER_INPUT_TYPE_NUMBERS = 'numbers'
    TRACKER_INPUT_TYPE_DECIMALS = 'decimals'
    TRACKER_INPUT_TYPE_CHOICES = (
        (TRACKER_INPUT_TYPE_WORDS, _('Words')),
        (TRACKER_INPUT_TYPE_NUMBERS, _('Numbers')),
        (TRACKER_INPUT_TYPE_DECIMALS, _('Decimals')),
    )
    name = models.CharField(_('Name'), max_length=120, unique=True)
    slug = AutoSlugField(populate_from=['name'], unique=True, overwrite=True)
    input_type = models.CharField(_('Type'), choices=TRACKER_INPUT_TYPE_CHOICES, max_length=10)

    values = ArrayField(
        models.CharField(max_length=120, blank=True)
    )

    class Meta:
        ordering = ('name',)
        verbose_name = _('Roof Type')
        verbose_name_plural = _('List of All Tracker Input Types')


class InitialJobProcess(TimeStampModel):
    title = models.CharField(_('Title'), max_length=250)
    position = models.PositiveIntegerField(default=1, validators=[
        validators.MinValueValidator(1)
    ])
    location = models.CharField(choices=LOCATION_CHOICES, max_length=10)

    is_active = models.BooleanField(_('Active'), default=False)

    def __str__(self):
        return '%s' % self.title

    class Meta:
        ordering = ('position',)
        verbose_name = _('Initial Job Process')
        verbose_name_plural = _('Initial Job Processes')


class CustomerTracker(ModelFieldChangeStatusMixin, TimeStampModel):
    STATUS_ACTIVE = 'active'
    STATUS_CLOSED = 'closed'
    STATUS_CANCELLED = 'cancelled'

    STATUS_CHOICES = (
        (STATUS_ACTIVE, _('Active')),
        (STATUS_CLOSED, _('Closed')),
        (STATUS_CANCELLED, _('Cancelled')),
    )

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='customer_trackers')

    job_code = models.CharField(_('Job Code'), max_length=250, unique=True, validators=[
        job_code_validator
    ])
    customer_name = models.CharField(_('Customer Name'), max_length=250)
    system_size = models.DecimalField(_('System Size'), max_digits=20, decimal_places=2, help_text=_('In kW'))
    number_of_panels = models.PositiveIntegerField(_('Number of Panels'), )
    roof_type = models.ForeignKey('roofs.RoofType', on_delete=models.SET_NULL, null=True, blank=True)
    number_of_arrays = models.PositiveIntegerField(_('Number of Arrays'))

    is_battery = models.BooleanField(default=False)
    number_of_batteries = models.PositiveIntegerField(null=True, blank=True, validators=[
        validators.MinValueValidator(1)
    ])

    crew = models.ForeignKey('crews.Crew', on_delete=models.SET_NULL, null=True, blank=True)

    location = models.CharField(choices=LOCATION_CHOICES, max_length=10, default='', null=True, blank=True)

    number_of_workers = models.PositiveIntegerField()

    status = models.CharField(choices=STATUS_CHOICES, default=STATUS_ACTIVE, max_length=10)

    def __str__(self):
        return '%s' % self.job_code

    class Meta:
        ordering = ('-created',)
        verbose_name = _('Customer Tracker')
        verbose_name_plural = _('Customer Trackers')

        constraints = [
            models.UniqueConstraint(
                fields=['status', 'user'],
                name='user_customer_tracker_active_unique',
                condition=models.Q(status='active')
            )
        ]

    def clean(self):
        user = self.user
        status = self.status
        is_battery = self.is_battery
        if not self.pk and status == CustomerTracker.STATUS_ACTIVE:
            check_active = CustomerTracker.objects.filter(user=user, status=status)
            if check_active.exists():
                raise ValidationError({
                    'user': _('User already have an active project.')
                })

        if is_battery and (not self.number_of_batteries or self.number_of_batteries < 1):
            raise ValidationError({
                'number_of_batteries': _('Field is required and number must be greater than 0.')
            })


class JobProcess(ModelFieldChangeStatusMixin, TimeStampModel):
    STATUS_PENDING = 'pending'
    STATUS_ACTIVE = 'active'
    STATUS_COMPLETED = 'completed'
    STATUS_PAUSED = 'paused'

    STATUS_CHOICES = (
        (STATUS_PENDING, _('Pending')),
        (STATUS_ACTIVE, _('Active')),
        (STATUS_COMPLETED, _('Closed')),
        (STATUS_PAUSED, _('Paused')),
    )
    customer_tracker = models.ForeignKey('trackers.CustomerTracker', on_delete=models.CASCADE,
                                         related_name='job_processes')

    title = models.CharField(_('Title'), max_length=250)
    position = models.PositiveIntegerField(default=1, validators=[
        validators.MinValueValidator(1)
    ])
    # is_active = models.BooleanField(_('Active'), default=False)
    # is_completed = models.BooleanField(_('Completed'), default=False)
    # is_paused = models.BooleanField(_('Paused'), default=False)
    status = models.CharField(_('Status'), choices=STATUS_CHOICES, default=STATUS_PENDING, max_length=10)
    # time_spent_seconds = models.PositiveIntegerField(default=0)
    total_paused_time_seconds = models.PositiveIntegerField(default=0)
    start_datetime = models.DateTimeField(_('Start Time'), null=True, blank=True, )
    end_datetime = models.DateTimeField(_('End Time'), null=True, blank=True)
    last_paused_datetime = models.DateTimeField(_('Last Paused Time'), null=True, blank=True)

    def __str__(self):
        return '%s' % self.title

    class Meta:
        ordering = ('position',)
        verbose_name = _('Job Process')
        verbose_name_plural = _('Job Processes')

    @property
    def get_time_spent_seconds(self):
        if self.start_datetime:
            if not self.end_datetime and (self.start_datetime and self.last_paused_datetime):
                seconds = datetime_difference_in_seconds(self.start_datetime, self.last_paused_datetime)
                return round(seconds) - self.total_paused_time_seconds
            elif self.end_datetime and self.start_datetime:
                start_end_seconds = datetime_difference_in_seconds(self.start_datetime, self.end_datetime)
                return start_end_seconds - self.total_paused_time_seconds
        return 0

    @property
    def get_time_spent(self):
        if self.get_time_spent_seconds:
            return seconds_to_readable_time(self.get_time_spent_seconds)

        return {
            'hours': 0,
            'minutes': 0,
            'left_seconds': 0,
        }
