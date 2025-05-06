from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine.generics import (
    ListCreateAPIView, 
    RetrieveUpdateDestroyAPIView
)
from .models import JobApplication
from .serializers import JobApplicationSerializer

class JobApplicationListCreateView(ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    #permission_classes = [IsAuthenticated]

class JobApplicationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    #permission_classes = [IsAuthenticated]


class HealthCheckView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"status": "ok"}, status=200)