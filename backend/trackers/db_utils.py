from django.db import models
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
