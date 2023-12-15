from django.urls import path
from .views import GetUserGitHubProfile, PushReadme

urlpatterns = [
    path('<str:username>/', GetUserGitHubProfile.as_view(), name='get-readme'),
    path('push/<int:readme_id>/', PushReadme.as_view(), name='push-readme'),
]