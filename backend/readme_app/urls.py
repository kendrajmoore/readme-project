from django.urls import path
from .views import Post_readme

urlpatterns = [
    path('', Post_readme.as_view(), name='post-readme'),
]