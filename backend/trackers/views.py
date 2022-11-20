from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render


@login_required
@staff_member_required
def update_job_process_field_view(request):
    from trackers.db_utils import update_job_process_seconds_per_job_field
    res = update_job_process_seconds_per_job_field()
    print(res)
    return HttpResponse('updated')
