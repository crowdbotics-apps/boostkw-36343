from rest_framework.generics import *

from .serializers import *


class TrackerInputListAPI(ListAPIView):
    serializer_class = TrackerInputSerializer
    queryset = TrackerInput.objects.all()
