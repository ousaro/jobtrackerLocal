from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_mongoengine.generics import (
    ListCreateAPIView, 
    RetrieveUpdateDestroyAPIView
)
from django.conf import settings
from bson import ObjectId


from .models import JobApplication
from .serializers import JobApplicationSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import status
from utils.rabbitmq import (publish_event, publish_to_app_queue)

class JobApplicationListCreateView(ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    #permission_classes = [IsAuthenticated]
    # def create(self, request, *args, **kwargs):
    #         serializer = self.get_serializer(data=request.data)
    #         try:
    #             serializer.is_valid(raise_exception=True)
    #         except ValidationError as exc:
    #             # LOG the error for debugging
    #             print("Validation Error:", exc.detail)
    #             return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
    #         return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        application = serializer.save()
        # Publish to RabbitMQ
        publish_event(
            settings.RABBITMQ_ROUTING_KEY_APPLICATION_CREATED, 
            JobApplicationSerializer(application).data
        )
        applicationData = JobApplicationSerializer(application).data
        # Publish to application index queue
        data = {
            "id": applicationData["id"],
            "position_title": applicationData["position_title"]
        }
        payload = {"action": "create", "data": data}
        publish_to_app_queue(
            payload
        )

class JobApplicationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    #permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        application = serializer.save()
        publish_event(
            settings.RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED, 
            JobApplicationSerializer(application).data
        )
        applicationData = JobApplicationSerializer(application).data
        # Publish to application index queue
        data = {
            "id": applicationData["id"],
            "position_title": applicationData["position_title"]
        }
        payload = {"action": "create", "data": data}
        publish_to_app_queue(
            payload
        )
    
    def perform_destroy(self, instance):
        data = {"id": str(instance.id)}
        payload = {"action": "delete", "data": data}
        publish_to_app_queue(
            payload
        )
        instance.delete()

class JobApplicationBulkRetrieveView(APIView):
    def post(self, request, *args, **kwargs):
        ids = request.data if isinstance(request.data, list) else []
        object_ids = [ObjectId(i) for i in ids if ObjectId.is_valid(i)]
        queryset = JobApplication.objects(id__in=object_ids)
        serializer = JobApplicationSerializer(queryset, many=True)
        return Response(serializer.data)

class HealthCheckView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"status": "ok"}, status=200)
