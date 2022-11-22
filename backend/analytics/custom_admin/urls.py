from django.urls import path
from .views import *

app_name = 'admin_analytics'

urlpatterns = [
    path('', analytics_index, name='analytics_index'),
    path('db_url/', admin_db_url, name='admin_db_url'),
    # graph 1
    path('crew/location/duration-steps/', admin_crew_graph_duration_steps, name='admin_crew_graph_duration_steps'),
    # graph 2
    path('crew/graph/mix-by-location/', admin_crew_mix_by_location, name='admin_crew_grap_mix_by_location'),
    # graph 3
    path('crew/performance/', admin_crew_performance_graph, name='admin_crew_performance_graph'),
    # graph 4
    path('roof-types/graph/roof-type-performance/', admin_graph_roof_type_performance_view,
         name='admin_graph_roof_type_performance_view'),
    # graph 5
    path('feedbacks/rating-graph/', admin_graph_app_feedback, name='admin_graph_app_feedback'),
    # graph 8
    path('crew/graph/performance-by-crew/', admin_grap_performance_by_crew, name='admin_grap_performance_by_crew'),

]
