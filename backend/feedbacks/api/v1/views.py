from rest_framework.generics import *
from rest_framework.response import Response

from .serializers import *


class UserFeedbackCreateAPIView(CreateAPIView, RetrieveUpdateAPIView):
    serializer_class = UserFeedbackCreateSerializer
    queryset = UserFeedback.objects.none()

    def get_queryset(self):
        return UserFeedback.objects.filter(user=self.request.user)

    def get_object(self):
        try:
            return self.request.user.user_feedback
        except UserFeedback.DoesNotExist:
            raise Http404

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            user_feedback = request.user.user_feedback
        except UserFeedback.DoesNotExist:
            return super(UserFeedbackCreateAPIView, self).create(request, *args, **kwargs)

        if user_feedback:
            serializer = UserFeedbackCreateSerializer(user_feedback, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        return Response({'detail': 'Invalid request'}, status=400)
