from django.urls import path
from .views import GetUserGitHubProfile, PushReadme

urlpatterns = [
    path('<str:username>/', GetUserGitHubProfile.as_view(), name='get-readme'),
    path('<int:repo_id>/', PushReadme.as_view(), name='push-readme'),
]