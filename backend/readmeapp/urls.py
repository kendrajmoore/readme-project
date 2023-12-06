from django.urls import path
from .views import 

urlpatterns = [
    path("", Info.as_view(), name="info"),

]