from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

# router.register('customer-tracker-inputs', viewsets.CustomerTrackerInputViewSet, basename='customer_tracker_inputs')
router.register('job-processes', viewsets.JobProcessViewSet, basename='job_processes')

app_name = 'trackers'
urlpatterns = [
    path('', include(router.urls)),
    path('input-types/', views.TrackerInputListAPI.as_view(), name='tracker_inputs'),
    path('customer-tracker-active/', views.CustomerTrackerActiveDetailAPIView.as_view(),
         name='customer_tracker_active'),
    path('customer-tracker-inputs/', views.CustomerTrackerListAPIView.as_view(), name='customer_tracker_inputs'),
    path('customer-tracker-inputs/<int:pk>/', views.CustomerTrackerDetailAPIView.as_view(),
         name='customer_tracker_input_detail'),

    path('customer-tracker-inputs/<int:pk>/job-processes/', views.CustomerTrackerJobProcessListAPIView.as_view(),
         name='customer_tracker_input_job_processes'),
    path('customer-tracker-inputs/<int:pk>/job-processes/<int:job_process_id>/',
         views.CustomerTrackerJobProcessDetailAPIView.as_view(),
         name='customer_tracker_input_job_process_detail'),

    path('stats/', views.UserTrackerStatsDetailView.as_view(), name='user_tracker_stats'),
]
