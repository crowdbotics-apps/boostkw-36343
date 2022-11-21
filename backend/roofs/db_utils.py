from trackers.models import CustomerTracker, JobProcess
from .models import RoofType
from django.db import models

from django.db.models import Sum


class DistinctSum(Sum):
    function = "SUM"
    template = "%(function)s(DISTINCT %(expressions)s)"


def roof_type_seconds_kw_subqs():
    subqs = {}

    trackers = CustomerTracker.objects.filter(
        roof_type=3,
        status=CustomerTracker.STATUS_CLOSED
    ).annotate(
        test_seconds_per_kw=models.ExpressionWrapper(
            models.Sum('job_processes__seconds_per_job') / models.F('system_size'),
            output_field=models.IntegerField(default=0)
        )
    ).order_by().values('test_seconds_per_kw')[:1]
    from modules.database_utils import SubquerySum

    roof_types = RoofType.objects.filter(
        customer_trackers__status=CustomerTracker.STATUS_CLOSED
    ).annotate(
        test_seconds_per_kw=models.Subquery(trackers, output_field=models.IntegerField(default=0)),
        # avg_seconds_per_kw=models.Avg('customer_trackers__job_processes__seconds_per_job')
        # avg_seconds_per_kw=SubquerySum(
        #     trackers,
        #     zero_value=0,
        #     field='seconds_per_kw',
        #     output_field=models.IntegerField()
        # )
        count=models.Count('customer_trackers', distinct=True, filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED
        )),
    ).distinct()

    for roof in roof_types:
        text = f'{roof.name}: total: {roof.count}, {roof.test_seconds_per_kw}'
        # print(roof.avg_seconds_per_kw)
        # print(roof.count)
        print(text)

    return None


def roof_type_counter_subqs():
    from modules.database_utils import Epoch

    graph_subqs = {
        'total_job_process': models.Count('customer_trackers__job_processes', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED
        )),

        'total_installations': DistinctSum('customer_trackers', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED,
        )),
        'total_number_of_arrays': DistinctSum('customer_trackers__number_of_arrays', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED,
        )),
        'total_system_size': DistinctSum('customer_trackers__system_size', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED,
        )),
        'total_number_of_panels': DistinctSum('customer_trackers__number_of_panels', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED,
        )),
        'total_customer_trackers_closed': models.Count('customer_trackers', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED,
        ), distinct=True),
        'total_seconds_per_job': models.Sum(
            'customer_trackers__job_processes__seconds_per_job',
            filter=models.Q(customer_trackers__status=CustomerTracker.STATUS_CLOSED),
        ),
        'avg_seconds_per_kw': models.Sum(
            'customer_trackers__seconds_per_kw',
            filter=models.Q(customer_trackers__status=CustomerTracker.STATUS_CLOSED),
        ),

        # 'avg_seconds_per_kw_test': models.Avg(
        #     models.F('total_seconds_per_job') / models.F('total_system_size'),
        #     output_field=models.DecimalField(default=0)
        # )

    }
    return graph_subqs
