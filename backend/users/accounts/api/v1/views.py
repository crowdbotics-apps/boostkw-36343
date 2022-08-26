from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.translation import ugettext_lazy as _

from .serializers import *


class AccountTokenLoginAPIView(CreateAPIView):
    permission_classes = []
    authentication_classes = []
    serializer_class = AuthTokenSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializerForAuth(user)
        return Response({"token": token.key, "user": user_serializer.data})


class AccoutnDeleteAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        if 'is_confirm' not in request.data:
            return Response({
                'success': False,
                'message': _('You have to comfirm to delete this account.'),
                'error': _('`is_confirm` key required as true'),
            }, status=400)
        is_confirm = request.data.get('is_confirm', False)
        if is_confirm:
            user = User.objects.get(id=request.user.id)
            try:
                user.delete()
                return Response({
                    'success': True,
                    'message': _('Account Deleted')
                }, status=200)
            except Exception as e:
                print(e)
                return Response({
                    'success': False,
                    'message': _('Failed to delete the account.'),
                }, status=400)
        return Response({
            'success': False,
            'message': _('Failed to delete the account.'),
            'error': _('`is_confirm` key required as true'),
        }, status=400)


class AccountAuthUserProfileAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializerForAuth
    queryset = User.objects.none()

    # def get_serializer_class(self):
    #     if self.request.method in ['PATCH', 'PUT']:
    #         return UserAuthProfileSerializer
    #     return UserSerializerForAuth

    def get_object(self):
        return self.request.user
