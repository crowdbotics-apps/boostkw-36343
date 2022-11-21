from django.utils import timezone
from django.db import models

from modules.utils import datetime_difference_in_seconds


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


def get_job_time_spent_seconds(job):
    from trackers.models import JobProcess
    if job.start_datetime:
        if not job.end_datetime and job.resuming_datetime and job.status == JobProcess.STATUS_ACTIVE:
            seconds = datetime_difference_in_seconds(job.start_datetime, job.resuming_datetime)
            return round(seconds) - job.total_paused_time_seconds
        if not job.end_datetime and job.last_paused_datetime and job.status == JobProcess.STATUS_PAUSED:
            seconds = datetime_difference_in_seconds(job.start_datetime, job.last_paused_datetime)
            return round(seconds) - job.total_paused_time_seconds
        elif job.end_datetime and job.start_datetime:
            start_end_seconds = datetime_difference_in_seconds(job.start_datetime, job.end_datetime)
            return start_end_seconds - job.total_paused_time_seconds
    return 0


def create_customer_tracker_job_process(instance, created=False):
    from .models import (InitialJobProcess, JobProcess)
    if created and instance.job_processes.count() < 1:
        initial_job_processes = InitialJobProcess.objects.filter(is_active=True, location=instance.location).order_by(
            'position')
        # print(initial_job_processes)
        items = []
        for item in initial_job_processes:
            items.append(
                JobProcess(customer_tracker=instance, title=item.title, position=item.position,
                           status=JobProcess.STATUS_PENDING)
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


def update_tracker_fields(tracker):
    from trackers.models import CustomerTracker

    start_time = timezone.now()
    trackers = CustomerTracker.objects.filter(id=tracker).annotate(
        total_seconds_per_job=models.Sum('job_processes__seconds_per_job'),
        calc_seconds_per_kw=models.ExpressionWrapper(
            models.F('total_seconds_per_job') / models.F('system_size'),
            output_field=models.IntegerField(default=0)
        )
    )

    bulk_items = []

    for tracker in trackers:
        tracker.seconds_per_kw = tracker.calc_seconds_per_kw
        bulk_items.append(tracker)

    update_qs = CustomerTracker.objects.bulk_update(bulk_items, ['seconds_per_kw'], batch_size=1000)
    end_time = timezone.now()
    total_seconds = (end_time - start_time).total_seconds()
    print(total_seconds)
    return update_qs


def update_all_tracker_fields():
    from trackers.models import CustomerTracker
    start_time = timezone.now()
    trackers = CustomerTracker.objects.annotate(
        total_seconds_per_job=models.Sum('job_processes__seconds_per_job'),
        calc_seconds_per_kw=models.ExpressionWrapper(
            models.F('total_seconds_per_job') / models.F('system_size'),
            output_field=models.IntegerField(default=0)
        )
    )

    bulk_items = []

    for tracker in trackers:
        tracker.seconds_per_kw = tracker.calc_seconds_per_kw
        bulk_items.append(tracker)

    update_qs = CustomerTracker.objects.bulk_update(bulk_items, ['seconds_per_kw'], batch_size=1000)
    end_time = timezone.now()
    total_seconds = (end_time - start_time).total_seconds()
    print(total_seconds)
    return update_qs
