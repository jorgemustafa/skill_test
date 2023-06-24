from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Company
from ..serializers import CompanySerializer


class CompanyView(APIView):

    def get(self, request, pk=None):
        if pk:
            obj = Company.objects.get(id=pk)
            serializer = CompanySerializer(obj)
            return Response(serializer.data)

        objs = Company.objects.all()
        serializer = CompanySerializer(objs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'message': 'Company created!'}, status=status.HTTP_200_OK)
        if serializer.errors.get('cnpj'):
            message = 'CNPJ already exists.'
        else:
            message = serializer.errors
        return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)


class CompanyUpdateView(APIView):

    def post(self, request, pk):
        try:
            obj = Company.objects.get(pk=pk)
        except:
            return Response('Object not found in database')

        serializer = CompanySerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'message': 'Company updated!'}, status=status.HTTP_200_OK)
        if serializer.errors.get('cnpj'):
            message = 'CNPJ already exists.'
        else:
            message = serializer.errors
        return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)


class CompanyDeleteView(APIView):

    def post(self, request, pk):
        try:
            obj = Company.objects.get(pk=pk)
        except:
            return Response(data={'message': 'Object not found in database'})
        obj.delete()
        return Response(data={'message': 'Company deleted!'}, status=status.HTTP_200_OK)
