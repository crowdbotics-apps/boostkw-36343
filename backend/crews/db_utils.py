from .models import Crew
from django.db import models
from trackers.models import CustomerTracker, JobProcess


def crew_counter_subqs():
    from modules.database_utils import Epoch
    diff_resuming_datetime = Epoch(
        models.F('customer_trackers__job_processes__resuming_datetime') - models.F(
            'customer_trackers__job_processes__start_datetime'))
    diff_last_paused_datetime = Epoch(
        models.F('customer_trackers__job_processes__last_paused_datetime') - models.F(
            'customer_trackers__job_processes__start_datetime'))

    diff_start_end_datetime = Epoch(models.F('customer_trackers__job_processes__end_datetime') - models.F(
        'customer_trackers__job_processes__start_datetime'))
    subqs = {
        'seconds_worked': models.Sum(models.Case(
            models.When(customer_trackers__job_processes__start_datetime__isnull=False,
                        customer_trackers__job_processes__resuming_datetime__isnull=False,
                        customer_trackers__job_processes__end_datetime__isnull=True,
                        customer_trackers__job_processes__status=JobProcess.STATUS_ACTIVE,
                        then=diff_resuming_datetime - models.F(
                            'customer_trackers__job_processes__total_paused_time_seconds'),
                        ),
            models.When(customer_trackers__job_processes__end_datetime__isnull=True,
                        customer_trackers__job_processes__last_paused_datetime__isnull=False,
                        customer_trackers__job_processes__status=JobProcess.STATUS_PAUSED,
                        then=diff_last_paused_datetime - models.F(
                            'customer_trackers__job_processes__total_paused_time_seconds')
                        ),
            models.When(customer_trackers__job_processes__start_datetime__isnull=False,
                        customer_trackers__job_processes__end_datetime__isnull=False,
                        then=diff_start_end_datetime - models.F(
                            'customer_trackers__job_processes__total_paused_time_seconds')
                        ),
            output_field=models.IntegerField(),
            default=0
        ), output_field=models.IntegerField(default=0)),
        'installations': models.Sum('customer_trackers__system_size', ),
        'total_customer_trackers_closed': models.Count('customer_trackers', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED)),
        'seconds_per_kw': models.ExpressionWrapper(
            models.F('seconds_worked') / models.F('total_customer_trackers_closed'),
            output_field=models.DecimalField(default=0, decimal_places=2),
        ),
    }
    # queryset = Crew.objects.annotate(**subqs)
    # for item in queryset:
    #     print(item.__dict__)
    return subqs
