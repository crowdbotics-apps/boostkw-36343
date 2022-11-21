from django.urls import path
from .views import *

app_name = 'admin_analytics'

urlpatterns = [
    path('', analytics_index, name='analytics_index'),
    path('db_url/', admin_db_url, name='admin_db_url'),
    path('crew/graph/location/', admin_crew_graph_by_location, name='admin_crew_graph_by_location'),
    path('crew/performance/', admin_crew_performance_graph, name='admin_crew_performance_graph'),
    path('location/duration-steps/', graph_duration_steps, name='graph_duration_steps'),
    path('roof-types/graph/', admin_roof_type_graph_view, name='roof_type_graph_view'),
    path('feedbacks/graph/', admin_graph_app_feedback, name='admin_graph_app_feedback'),

]
