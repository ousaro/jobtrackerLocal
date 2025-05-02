from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import JobApplication

class JobApplicationSerializer(DocumentSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'
