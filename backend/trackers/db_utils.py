from django.db import models
from trackers.models import JobProcess


def customer_tracker_job_process_subqs():
    from modules.database_utils import Epoch
    diff_resuming_datetime = Epoch(
        models.F('job_processes__resuming_datetime') - models.F('job_processes__start_datetime'))
    diff_last_paused_datetime = Epoch(
        models.F('job_processes__last_paused_datetime') - models.F('job_processes__start_datetime'))
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
                    then=diff_last_paused_datetime - models.F('job_processes__total_paused_time_seconds')
                    ),
        output_field=models.IntegerField(),
        default=0
    ), output_field=models.IntegerField(default=0))
