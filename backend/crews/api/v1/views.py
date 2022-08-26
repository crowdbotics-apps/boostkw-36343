from rest_framework.generics import *

from .serializers import *


class CrewListAPI(ListAPIView):
    permission_classes = []
    authentication_classes = []
    serializer_class = CrewSerializer
    queryset = Crew.objects.all()
    pagination_class = None

