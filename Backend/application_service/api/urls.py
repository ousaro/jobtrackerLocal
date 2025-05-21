from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationRetrieveUpdateDestroyView,
    JobApplicationBulkRetrieveView,
    HealthCheckView
)

urlpatterns = [
    path('applications', JobApplicationListCreateView.as_view()),
    path("applications/ids", JobApplicationBulkRetrieveView.as_view()),
    path('applications/<str:id>', JobApplicationRetrieveUpdateDestroyView.as_view()),
    path('health', HealthCheckView.as_view()),
]
