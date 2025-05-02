from rest_framework_mongoengine.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from .models import JobApplication
from .serializers import JobApplicationSerializer

class JobApplicationListCreateView(ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

class JobApplicationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
