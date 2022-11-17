from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render


@login_required
def admin_crew_graph(request):
    return HttpResponse('ok')
