from django.urls import path
from .views import Sign_up, Log_in, Info, Log_out, Update

urlpatterns = [
    path("", Info.as_view(), name="info"),
    path("signup/", Sign_up.as_view(), name='signup'),
    path("login/", Log_in.as_view(), name="login"),
    path("logout/", Log_out.as_view(), name='logout'),
    path("update/", Update.as_view(), name='update'),
]