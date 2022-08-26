from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from modules.model_mixins import TimeStampModel


class UserFeedback(TimeStampModel):
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='user_feedback')
    rating = models.PositiveIntegerField(_('Rating'), validators=[
        MinValueValidator(1), MaxValueValidator(5)
    ])
    comment = models.TextField(_('Comment'), blank=True)

    def __str__(self):
        return '%s' % self.user.__str__()

    class Meta:
        ordering = ('-created',)
        verbose_name = _('User Feedback')
        verbose_name_plural = _('List of All Feedbacks')
