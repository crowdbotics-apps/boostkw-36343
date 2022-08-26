from django.db import models

from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from modules.model_mixins import TimeStampModel


class RoofType(TimeStampModel):
    name = models.CharField(_('Name'), max_length=120, unique=True)
    slug = AutoSlugField(populate_from=['name'], unique=True, overwrite=True)
    order = models.PositiveIntegerField(_('Order'))

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('order',)
        verbose_name = _('Roof Type')
        verbose_name_plural = _('List of All Roof Types')
