from django.urls import path
from .views import *

app_name = 'trackers'

urlpatterns = [
    path('admin/process-fields-uppdate/', update_job_process_field_view),
]
