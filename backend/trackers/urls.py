from django.urls import path
from .views import *

app_name = 'trackers'

urlpatterns = [
    path('admin/process-fields-update/', update_job_process_field_view),
    path('admin/update-tracker-fields/', update_tracker_field_view),
]
