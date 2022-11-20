from django.urls import path
from .views import *

app_name = 'admin_analytics'

urlpatterns = [
    path('', analytics_index, name='analytics_index'),
    path('crew/graph/location/', admin_crew_graph_by_location, name='admin_crew_graph_by_location'),
    path('location/duration-steps/', graph_duration_steps, name='graph_duration_steps'),
    path('roof-types/graph/', admin_roof_type_graph_view, name='roof_type_graph_view'),

]
