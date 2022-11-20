from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from crews.models import Crew
from crews.db_utils import crew_counter_subqs
from django.db import models

from trackers.models import JobProcess, InitialJobProcess, CustomerTracker
from trackers.utils import seconds_to_readable_time


@login_required
@staff_member_required
def analytics_index(request):
    data = {
        'title': 'Analytics'
    }
    return render(request, 'analytics/admin/index.html', data)


# Graph 1
@login_required
@staff_member_required
def admin_crew_graph_by_location(request):
    # queryset = Crew.objects.annotate(**crew_counter_subqs())
    queryset = Crew.objects.all()
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
        total_seconds_per_job=models.Sum('customer_trackers__job_processes__seconds_per_job'),
        total_seconds_per_job_roof=models.Sum('customer_trackers__job_processes__seconds_per_job',
                                              filter=models.Q(customer_trackers__location='roof')),
        total_seconds_per_job_ground=models.Sum('customer_trackers__job_processes__seconds_per_job',
                                                filter=models.Q(customer_trackers__location='ground')),
        avg_seconds_per_job=models.Avg('customer_trackers__job_processes__seconds_per_job'),
        avg_seconds_per_job_roof=models.Avg('customer_trackers__job_processes__seconds_per_job',
                                            filter=models.Q(customer_trackers__location='roof')),
        avg_seconds_per_job_ground=models.Avg('customer_trackers__job_processes__seconds_per_job',
                                              filter=models.Q(customer_trackers__location='ground')),
    )
    print(result)
    total_minutes_per_job_roof = result['total_seconds_per_job_roof'] / 60
    total_minutes_per_job_ground = result['total_seconds_per_job_ground'] / 60
    total_minutes_per_job = result['total_seconds_per_job'] / 60

    avg_minutes_per_job_roof = 0
    avg_minutes_per_job_ground = 0
    avg_minutes_seconds_per_job = 0
    if result['total_job_process_roof'] and result['total_job_process_roof'] > 0:
        avg_minutes_per_job_roof = result['total_seconds_per_job_roof'] / result['total_job_process_roof'] / 60

    if result['total_seconds_per_job_ground'] and result['total_seconds_per_job_ground'] > 0:
        avg_minutes_per_job_ground = result['total_seconds_per_job_ground'] / result['total_job_process_ground'] / 60

    if result['total_job_process'] and result['total_job_process'] > 0:
        avg_minutes_per_job = result['total_seconds_per_job'] / result['total_job_process'] / 60

    data = {
        # 'queryset': queryset,
        'title': 'Crew Graph by Location',
        'result': result,
        'total_minutes_per_job_roof': round(total_minutes_per_job_roof),
        'total_minutes_per_job_ground': round(total_minutes_per_job_ground),
        'total_minutes_per_job': round(total_minutes_per_job),
        'avg_minutes_per_job_roof': round(avg_minutes_per_job_roof),
        'avg_minutes_per_job_ground': round(avg_minutes_per_job_ground),
        'avg_minutes_per_job': round(avg_minutes_seconds_per_job),
    }

    return render(request, 'analytics/admin/graphs/crew_mins_by_location.html', data)


# Graph 2
@login_required
@staff_member_required
def admin_crew_performance_graph(request):
    crews = Crew.objects.annotate(
        total_installations=models.Count('customer_trackers', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED
        )),
        total_kw_installations=models.Sum('customer_trackers__system_size', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED
        ), output_field=models.IntegerField(0)),
        avg_seconds_per_kw=models.Avg('customer_trackers__seconds_per_kw', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED
        ), output_field=models.IntegerField(0))
    )
    data = {
        'title': 'Summary of Crew Performance',
        'crews': crews,
    }
    return render(request, 'analytics/admin/graphs/crew_graph_performance.html', data)


# graph 3
@login_required
@staff_member_required
def graph_duration_steps(request):
    from trackers.db_utils import job_process_time_spend_seconds_sub_qs
    initial_job_processes = InitialJobProcess.objects.all()
    processes = [{'id': item.id, 'title': item.title, 'type': item.location} for item in initial_job_processes]
    trackers = CustomerTracker.objects.filter().order_by('-location')
    subqs_trackers = {}
    for item in processes:
        _id = item.get('id')
        title = item.get('title')
        subqs_trackers[f'count_{_id}'] = models.Count('id', filter=models.Q(job_processes__title__exact=title),
                                                      output_field=models.IntegerField(default=0))

        subqs_trackers[f'total_seconds_per_job_{_id}'] = models.Sum('job_processes__seconds_per_job',
                                                                    filter=models.Q(job_processes__title__exact=title),
                                                                    output_field=models.IntegerField(default=0)
                                                                    )

    results_trackers = trackers.aggregate(**subqs_trackers)

    trackers_roof_list = []
    trackers_ground_list = []
    for item in processes:
        _id = item.get('id')
        count_value = results_trackers[f'count_{_id}']
        total_seconds_per_job = results_trackers[f'total_seconds_per_job_{_id}']
        total_seconds_per_job_mins = round(total_seconds_per_job / 60)
        new_item = next((x for x in processes if x['id'] == _id), None)
        new_item['total'] = count_value
        new_item['total_seconds_per_job'] = total_seconds_per_job
        new_item['total_seconds_per_job_mins'] = total_seconds_per_job_mins
        if int(count_value) > 0:
            new_item['avg_total_seconds_per_job_mins'] = total_seconds_per_job_mins / int(count_value)
        else:
            new_item['avg_total_seconds_per_job_mins'] = 0

        if new_item['type'] == 'roof':
            trackers_roof_list.append(new_item)
        elif new_item['type'] == 'ground':
            trackers_ground_list.append(new_item)

    # print(trackers_roof_list)
    # print(trackers_ground_list)
    data = {
        'title': 'Duration of Steps (Avg in mins)',
        'results': results_trackers,
        'roof_list': trackers_roof_list,
        'roof_count': len(trackers_roof_list),
        'ground_list': trackers_ground_list,
        'ground_count': len(trackers_ground_list),
    }

    return render(request, 'analytics/admin/graphs/duration_of_steps.html', data)


# graph 4
@login_required
@staff_member_required
def admin_roof_type_graph_view(request):
    from roofs.models import RoofType
    from roofs.db_utils import roof_type_counter_subqs
    roof_types = RoofType.objects.filter(
        customer_trackers__status=CustomerTracker.STATUS_CLOSED,
    ).annotate(
        **roof_type_counter_subqs()
    ).annotate(
        avg_seconds_per_kw=models.Avg('customer_trackers__seconds_per_kw')
    )

    chart_data = []
    for roof in roof_types:
        # print(roof.avg_seconds_per_kw)
        hours = seconds_to_readable_time(roof.avg_seconds_per_kw).get('hours')
        chart_data.append({
            'name': roof.name,
            'hours': int(hours)
        })

    data = {
        'title': _('Roof Types'),
        'roof_types': roof_types,
        'chart_data': chart_data,
    }
    return render(request, 'analytics/admin/graphs/roof_type_graphs.html', data)


# graph 5
@login_required
@staff_member_required
def admin_graph_app_feedback(request):
    from feedbacks.models import UserFeedback
    user_feedbacks = UserFeedback.objects.all().aggregate(
        total_users_review=models.Count('user', distinct=True),
        avg_rating=models.Avg('rating', output_field=models.DecimalField(default=0, decimal_places=2)),
    )
    from users.models import User
    users = User.objects.filter(is_active=True)

    avg_rating = 0
    if user_feedbacks['avg_rating']:
        avg_rating = user_feedbacks['avg_rating']

    data = {
        'title': 'App Feedback',
        'total_users': users.count(),
        'total_users_review': user_feedbacks['total_users_review'],
        'avg_rating': round(avg_rating, 1),
    }

    return render(request, 'analytics/admin/graphs/app_feedback.html', data)
