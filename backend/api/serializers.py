from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

from .models import Company, Employee

User = get_user_model()


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username']


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password_confirm = serializers.CharField(required=True)

    class Meta:
        model = User


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'cnpj', 'active']


class EmployeeSerializer(serializers.ModelSerializer):
    company_name = serializers.ReadOnlyField(source='company.name', required=False)
    dt_birth = serializers.DateField(format='%d/%m/%Y', input_formats=['%d/%m/%Y'])

    class Meta:
        model = Employee
        fields = ['id', 'name', 'cpf', 'dt_birth', 'company', 'company_name', 'active']
