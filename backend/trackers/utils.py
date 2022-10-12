from django.utils import timezone
from django.db import models


def seconds_to_readable_time(seconds):
    seconds = seconds % (24 * 3600)
    hours = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60

    return {
        'hours': int(hours),
        'minutes': int(minutes),
        'seconds': int(seconds)
    }


def create_customer_tracker_job_process(instance, created=False):
    from .models import (InitialJobProcess, JobProcess)
    if created and instance.job_processes.count() < 1:
        initial_job_processes = InitialJobProcess.objects.filter(is_active=True, location=instance.location).order_by(
            'position')
        print(initial_job_processes)
        items = []
        for item in initial_job_processes:
            items.append(
                JobProcess(customer_tracker=instance, title=item.title, position=item.position,
                           is_active=item.is_active)
            )

        if len(items) > 0:
            try:
                JobProcess.objects.bulk_create(items, batch_size=len(items))
            except Exception as err:
                print(err)
                return None
        return None

    return None


def close_trackers_job_process(tracker):
    from .models import CustomerTracker, JobProcess
    if tracker.status == CustomerTracker.STATUS_CLOSED:
        job_process_is_active = tracker.job_processes.filter(status=JobProcess.STATUS_ACTIVE,
                                                             end_datetime__isnull=True)
        # print(job_process_is_active, 'job_process_is_active')
        job_process_is_paused = tracker.job_processes.filter(status=JobProcess.STATUS_PAUSED,
                                                             end_datetime__isnull=True)
        job_process_is_pending = tracker.job_processes.filter(status=JobProcess.STATUS_PENDING,
                                                              end_datetime__isnull=True)
        # print('job_process_is_paused', job_process_is_paused)
        now = timezone.now()
        job_process_is_active.update(status=JobProcess.STATUS_COMPLETED, end_datetime=now)
        job_process_is_paused.update(status=JobProcess.STATUS_COMPLETED, end_datetime=models.F('last_paused_datetime'))
        job_process_is_pending.update(
            status=JobProcess.STATUS_COMPLETED, start_datetime=now,
            last_paused_datetime=now, end_datetime=now,
        )
