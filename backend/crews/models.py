from django.db import models
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from modules.model_mixins import TimeStampModel


class Crew(TimeStampModel):
    name = models.CharField(_('Crew Name'), unique=True, max_length=120,
                            help_text=_('Name must be unique.'))
    slug = AutoSlugField(populate_from=['name'], unique=True, overwrite=True)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('name',)
        verbose_name = _('Crew')
        verbose_name_plural = _('List of All Crews')
