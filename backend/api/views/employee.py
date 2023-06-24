from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Employee
from ..serializers import EmployeeSerializer


class EmployeeView(APIView):

    def get(self, request, pk=None):
        if pk:
            obj = Employee.objects.get(id=pk)
            serializer = EmployeeSerializer(obj)
            return Response(serializer.data)

        objs = Employee.objects.all()
        serializer = EmployeeSerializer(objs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'message': 'Employee created!'}, status=status.HTTP_200_OK)
        if serializer.errors.get('cpf'):
            message = 'CPF already exists.'
        else:
            message = serializer.errors
        return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeUpdateView(APIView):

    def post(self, request, pk):
        try:
            obj = Employee.objects.get(pk=pk)
        except:
            return Response('Object not found in database.')

        serializer = EmployeeSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'message': 'Employee updated!'}, status=status.HTTP_200_OK)
        if serializer.errors.get('cpf'):
            message = 'CPF already exists.'
        else:
            message = serializer.errors
        return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDeleteView(APIView):

    def post(self, request, pk):
        try:
            obj = Employee.objects.get(pk=pk)
        except:
            return Response(data={'message': 'Object not found in database.'})
        obj.delete()
        return Response(data={'message': 'Employee deleted!'}, status=status.HTTP_200_OK)
