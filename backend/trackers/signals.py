from django.db.models.signals import *
from django.dispatch import receiver
from django.utils import timezone

from modules.utils import datetime_difference_in_seconds
from .models import *
from .utils import create_customer_tracker_job_process


@receiver(post_save, sender=CustomerTracker)
def model_customer_tracker_post_save(sender, created, instance, **kwargs):
    if created or instance.job_processes.count() < 1:
        create_customer_tracker_job_process(instance, created=True)
    status_changed = instance.data_changed(['status'])
    # print(status_changed)
    if status_changed and instance.status == CustomerTracker.STATUS_CLOSED:
        from trackers.utils import close_trackers_job_process
        close_trackers_job_process(instance)

    # if created:
    #     create_customer_tracker_job_process(instance, intial=True)


@receiver(pre_save, sender=JobProcess)
def model_job_process_pre_save(sender, instance, **kwargs):
    pass
    # if instance.pk:
    #     is_paused_changed = instance.data_changed(['is_paused'])
    #     print(is_paused_changed)
    #     if is_paused_changed and instance.is_paused:
    #         time_now = timezone.now()
    #         if instance.last_paused_datetime:
    #             last_paused_datetime = instance.last_paused_datetime
    #             instance.last_paused_datetime = time_now
    #             datetime_diff_seconds = round(datetime_difference_in_seconds(last_paused_datetime, time_now))
    #             total_paused_time_seconds = instance.total_paused_time_seconds + datetime_diff_seconds
    #             instance.total_paused_time_seconds = total_paused_time_seconds
    # if is_paused_changed and instance.is_paused is False:
    #     time_now = timezone.now()
    #     if instance.last_paused_datetime:
    #         datetime_diff_seconds = round(datetime_difference_in_seconds(instance.last_paused_datetime, time_now))
    #         print(datetime_diff_seconds)
    #         total_paused_time_seconds = instance.total_paused_time_seconds + datetime_diff_seconds
    #         instance.total_paused_time_seconds = total_paused_time_seconds
    # if instance.pk:
    #     is_last_paused_datetime_changed = instance.data_changed(['last_paused_datetime'])
    #     if is_last_paused_datetime_changed:
    #         last_paused_datetime = instance.last_paused_datetime
    #         print('last_paused_datetime', last_paused_datetime)


@receiver(post_save, sender=JobProcess)
def model_job_process_post_save(sender, created, instance, **kwargs):
    # print(instance.updated)
    pass
