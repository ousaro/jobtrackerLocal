from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationRetrieveUpdateDestroyView,
    HealthCheckView
)

urlpatterns = [
    path('applications/', JobApplicationListCreateView.as_view()),
    path('applications/<str:id>/', JobApplicationRetrieveUpdateDestroyView.as_view()),
    path('health/', HealthCheckView.as_view()),
]
