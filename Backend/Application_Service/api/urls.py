from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationRetrieveUpdateDestroyView
)

urlpatterns = [
    path('applications/', JobApplicationListCreateView.as_view()),
    path('applications/<str:id>/', JobApplicationRetrieveUpdateDestroyView.as_view()),
]
