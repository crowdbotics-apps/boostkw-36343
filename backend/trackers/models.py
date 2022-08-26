from django.contrib.postgres.fields import ArrayField
from django.db import models

from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from modules.model_mixins import TimeStampModel


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
