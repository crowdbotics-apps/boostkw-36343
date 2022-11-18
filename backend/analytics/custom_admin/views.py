from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from crews.models import Crew
from crews.db_utils import crew_counter_subqs
from django.db import models

from trackers.models import JobProcess, InitialJobProcess


@login_required
@staff_member_required
def analytics_index(request):
    data = {
        'title': 'Analytics'
    }
    return render(request, 'analytics/admin/index.html', data)


@login_required
@staff_member_required
def admin_crew_graph_by_location(request):
    queryset = Crew.objects.annotate(**crew_counter_subqs())
    # print(queryset)
    result = queryset.aggregate(
        total_job_process=models.Count('customer_trackers__job_processes'),
        total_job_process_roof=models.Count(
            'customer_trackers__job_processes',
            filter=models.Q(customer_trackers__location='roof')
        ),
        total_job_process_ground=models.Count(
            'customer_trackers__job_processes',
            filter=models.Q(customer_trackers__location='ground')
        ),
        # avg_seconds_worked_job=models.ExpressionWrapper(
        #     models.F('seconds_worked') / models.F('total_job_process'),
        #     output_field=models.DecimalField(decimal_places=2, default=0),
        # ),
        # avg_seconds_worked_job_roof=models.Case(
        #     models.When(
        #         customer_trackers__location='roof',
        #         then=models.F('seconds_worked') / models.F('total_job_process')
        #     ),
        #     output_field=models.DecimalField(decimal_places=2, default=0),
        #     default=0
        #
        # ),
        # avg_seconds_worked_job_ground=models.Case(
        #     models.When(
        #         customer_trackers__location='ground',
        #         then=models.F('seconds_worked') / models.F('total_job_process')
        #     ),
        #     output_field=models.DecimalField(decimal_places=2, default=0),
        #     default=0
        #
        # ),
        total_seconds_worked=models.Sum('seconds_worked'),
        total_seconds_worked_roof=models.Sum('seconds_worked', filter=models.Q(customer_trackers__location='roof')),
        total_seconds_worked_ground=models.Sum('seconds_worked', filter=models.Q(customer_trackers__location='ground')),
        avg_seconds_worked=models.Avg('seconds_worked'),
        avg_seconds_worked_roof=models.Avg('seconds_worked', filter=models.Q(customer_trackers__location='roof')),
        avg_seconds_worked_ground=models.Avg('seconds_worked', filter=models.Q(customer_trackers__location='ground')),
    )
    print(result)
    total_minutes_worked_roof = result['total_seconds_worked_roof'] / 60
    total_minutes_worked_ground = result['total_seconds_worked_ground'] / 60
    total_minutes_worked = result['total_seconds_worked'] / 60

    avg_minutes_worked_roof = 0
    avg_minutes_worked_ground = 0
    avg_minutes_worked = 0
    if result['total_job_process_roof'] and result['total_job_process_roof'] > 0:
        avg_minutes_worked_roof = result['total_seconds_worked_roof'] / result['total_job_process_roof'] / 60

    if result['total_seconds_worked_ground'] and result['total_seconds_worked_ground'] > 0:
        avg_minutes_worked_roof = result['total_seconds_worked_ground'] / result['total_job_process_ground'] / 60

    if result['total_job_process'] and result['total_job_process'] > 0:
        avg_minutes_worked = result['total_seconds_worked'] / result['total_job_process'] / 60

    data = {
        # 'queryset': queryset,
        'title': 'Crew Graph by Location',
        'result': result,
        'total_minutes_worked_roof': round(total_minutes_worked_roof),
        'total_minutes_worked_ground': round(total_minutes_worked_ground),
        'total_minutes_worked': round(total_minutes_worked),
        'avg_minutes_worked_roof': round(avg_minutes_worked_roof),
        'avg_minutes_worked_ground': round(avg_minutes_worked_ground),
        'avg_minutes_worked': round(avg_minutes_worked),
    }

    return render(request, 'analytics/admin/graphs/crew_mins_by_location.html', data)


@login_required
@staff_member_required
def graph_duration_steps(request):
    from trackers.db_utils import job_process_time_spend_seconds_sub_qs
    initial_job_processes = InitialJobProcess.objects.all()
    processes = [{'id': item.id, 'title': item.title, 'type': item.location} for item in initial_job_processes]
    job_processes = JobProcess.objects.annotate(
        time_spent_seconds=job_process_time_spend_seconds_sub_qs(),
        number_of_workers=models.F('customer_tracker__number_of_workers')
    ).annotate(
        total_workers_second=models.ExpressionWrapper(
            models.F('time_spent_seconds') * models.F('number_of_workers'),
            output_field=models.IntegerField(default=0)
        )
    )
    subqs = {}
    for item in processes:
        _id = item.get('id')
        title = item.get('title')
        subqs[f'count_{_id}'] = models.Count('id', filter=models.Q(title__exact=title),
                                             output_field=models.IntegerField(default=0))
        subqs[f'total_workers_second_{_id}'] = models.Sum('total_workers_second', filter=models.Q(title__exact=title),
                                                          output_field=models.IntegerField(default=0))

    results = job_processes.aggregate(**subqs)

    roof_list = []
    ground_list = []
    for item in processes:
        _id = item.get('id')
        count_value = results[f'count_{_id}']
        total_workers_second = results[f'total_workers_second_{_id}']
        total_workers_mins = round(total_workers_second / 60)
        new_item = next((x for x in processes if x['id'] == _id), None)
        new_item['total'] = count_value
        new_item['total_workers_second'] = total_workers_second
        new_item['total_workers_mins'] = total_workers_mins

        if new_item['type'] == 'roof':
            roof_list.append(new_item)
        elif new_item['type'] == 'ground':
            ground_list.append(new_item)

    data = {
        'title': 'Duration of Steps (in mins)',
        'results': results,
        'roof_list': roof_list,
        'roof_count': len(roof_list),
        'ground_list': ground_list,
        'ground_count': len(ground_list),
    }
    # print(data)
    return render(request, 'analytics/admin/graphs/duration_of_steps.html', data)
