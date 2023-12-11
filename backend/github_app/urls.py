from django.urls import path
from .views import Github_info

urlpatterns = [
    path('', Github_info.as_view(), name='github-info'),
]