from allauth.utils import generate_unique_username
from django.db.models.signals import *
from django.dispatch import receiver

from .models import *


@receiver(pre_save, sender=User)
def user_model_pre_save(sender, instance, **kwargs):
    if not instance.username or instance.username == "":
        first_name = instance.first_name
        last_name = instance.last_name
        email = instance.email
        name = instance.name
        username = generate_unique_username([first_name, last_name, email, name, 'user'])
        instance.username = username

    if not instance.pk and instance.profile_picture:
        profile_picture = instance.profile_picture
        instance.profile_picture = None
        instance._updated_profile_picture = profile_picture

    # if instance.pk and instance.data_changed(['profile_picture']):


@receiver(post_save, sender=User)
def user_model_post_save(sender, created, instance, **kwargs):
    if created and '_updated_profile_picture' in instance.__dict__:
        instance.profile_picture = instance._updated_profile_picture
        pre_save.disconnect(user_model_pre_save, sender=User)
        instance.save()
        pre_save.connect(user_model_pre_save, sender=User)
