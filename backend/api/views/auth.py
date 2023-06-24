from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import UserLoginSerializer, UserSerializer, ChangePasswordSerializer


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            if user:
                login(request, user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data={'message': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # check current password
            if not user.check_password(serializer.data.get('current_password')):
                return Response(data={'message': 'Incorrect current password.'}, status=status.HTTP_400_BAD_REQUEST)
            # check confirmation password
            if serializer.data.get('new_password') != serializer.data.get('new_password_confirm'):
                return Response(data={'message': 'Passwords does not match.'}, status=status.HTTP_400_BAD_REQUEST)
            # check if old and new password are same
            if serializer.data.get('new_password') == serializer.data.get('current_password'):
                return Response(data={'message': 'Current and new password must be different.'},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response(data={'message': 'Password changed successfully!'}, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# reset password api
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    send_mail(
        # title:
        'Password Reset for Bix Test',
        # message:
        f'Hello, you have requested to reset your password! Click the link to create a new password:'
        f'http://localhost:3000/new-password/confirm/{reset_password_token.key}',
        # from:
        'noreply@somehost.local',
        # to:
        [reset_password_token.user.email]
    )
