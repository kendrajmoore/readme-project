from django.urls import path
from .views import Get_readme

urlpatterns = [
    path('', Get_readme.as_view(), name='get-readme'),
]