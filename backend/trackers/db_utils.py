from django.db import models
from django.utils import timezone

from trackers.models import JobProcess


def customer_tracker_job_process_subqs():
    from modules.database_utils import Epoch
    diff_resuming_datetime = Epoch(
        models.F('job_processes__resuming_datetime') - models.F('job_processes__start_datetime'))
    diff_last_paused_datetime = Epoch(
        models.F('job_processes__last_paused_datetime') - models.F('job_processes__start_datetime'))

    diff_start_end_datetime = Epoch(models.F('job_processes__end_datetime') - models.F('job_processes__start_datetime'))

    return models.Sum(models.Case(
        models.When(job_processes__start_datetime__isnull=False, job_processes__resuming_datetime__isnull=False,
                    job_processes__end_datetime__isnull=True,
                    job_processes__status=JobProcess.STATUS_ACTIVE,
                    then=diff_resuming_datetime - models.F('job_processes__total_paused_time_seconds'),
                    ),
        models.When(job_processes__end_datetime__isnull=True, job_processes__last_paused_datetime__isnull=False,
                    job_processes__status=JobProcess.STATUS_PAUSED,
                    then=diff_last_paused_datetime - models.F('job_processes__total_paused_time_seconds')
                    ),
        models.When(job_processes__start_datetime__isnull=False,
                    job_processes__end_datetime__isnull=False,
                    then=diff_start_end_datetime - models.F('job_processes__total_paused_time_seconds')
                    ),
        output_field=models.IntegerField(),
        default=0
    ), output_field=models.IntegerField(default=0))


def customer_tracker_total_seconds_per_job():
    return models.Sum('job_processes__seconds_per_job')


def customer_tracker_avg_seconds_per_kw():
    from trackers.models import CustomerTracker
    trackers = CustomerTracker.objects.filter(
        roof_type=3,
        status=CustomerTracker.STATUS_CLOSED
    ).annotate(
        seconds_per_kw=models.ExpressionWrapper(
            models.Sum('job_processes__seconds_per_job') / models.F('system_size'),
            output_field=models.IntegerField()
        )
    )
    # res = trackers.aggregate(seconds_per_kw=models.Avg('seconds_per_job'))
    return trackers.values('seconds_per_kw')


def job_process_time_spend_seconds_sub_qs():
    from modules.database_utils import Epoch
    diff_resuming_datetime = Epoch(models.F('resuming_datetime') - models.F('start_datetime'))
    diff_last_paused_datetime = Epoch(models.F('last_paused_datetime') - models.F('start_datetime'))
    diff_start_end_datetime = Epoch(models.F('end_datetime') - models.F('start_datetime'))
    return models.Case(
        models.When(start_datetime__isnull=False, resuming_datetime__isnull=False,
                    end_datetime__isnull=True,
                    status=JobProcess.STATUS_ACTIVE,
                    then=diff_resuming_datetime - models.F('total_paused_time_seconds')
                    ),
        models.When(end_datetime__isnull=True, last_paused_datetime__isnull=False,
                    status=JobProcess.STATUS_PAUSED,
                    then=diff_last_paused_datetime - models.F('total_paused_time_seconds')
                    ),
        models.When(start_datetime__isnull=False,
                    end_datetime__isnull=False,
                    then=diff_start_end_datetime - models.F('total_paused_time_seconds')
                    ),

        output_field=models.IntegerField(),
        default=0
    )


def job_process_workers_seconds():
    time_spent_seconds = job_process_time_spend_seconds_sub_qs(),
    # seconds_per_job=models.F('time_spent_seconds') * models.F('customer_tracker__number_of_workers')
    system_size = models.F('customer_tracker__system_size')


def update_job_process_seconds_per_job_field():
    start_time = timezone.now()
    job_processes = JobProcess.objects.annotate(
        time_spent_seconds=job_process_time_spend_seconds_sub_qs(),
        total_seconds_per_job=models.ExpressionWrapper(
            models.F('customer_tracker__number_of_workers') * models.F('time_spent_seconds'),
            output_field=models.IntegerField(default=0)
        )
    ).all()
    bulk_items = []
    for job in job_processes:
        # print(job.total_seconds_per_job)
        job.seconds_per_job = job.total_seconds_per_job
        # job.save()
        bulk_items.append(job)

    update_qs = JobProcess.objects.bulk_update(bulk_items, ['seconds_per_job'], batch_size=1000)
    end_time = timezone.now()
    total_seconds = (end_time - start_time).total_seconds()
    print(total_seconds)
    return update_qs
    # return 'update_qs'

    # return job_processes.update(seconds_per_job=models.F('total_seconds_per_job'))
