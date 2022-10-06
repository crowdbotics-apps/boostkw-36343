from django.db.models.signals import *
from django.dispatch import receiver

from .models import *
from .utils import create_customer_tracker_job_process


@receiver(post_save, sender=CustomerTracker)
def customer_tracker_post_save(sender, created, instance, **kwargs):
    print(created)
    print(instance)
    if created:
        create_customer_tracker_job_process(instance, intial=created)

    # if created:
    #     create_customer_tracker_job_process(instance, intial=True)
