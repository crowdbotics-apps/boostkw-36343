from rest_framework.generics import *

from .serializers import *


class RoofTypeListAPI(ListAPIView):
    serializer_class = RoofTypeSerializer
    queryset = RoofType.objects.all()
