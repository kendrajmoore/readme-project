from django.db import models

from github_app.models import GitHubRepository
from user_app.models import User

class Readme(models.Model):
    project_name = models.CharField(max_length=200, blank=False, null=False)
    repo_name = models.TextField(default="Unknown")
    description = models.TextField(default="Unknown")
    tools = models.TextField(default="Unknown")
    reason = models.TextField(default="Unknown")
    content = models.TextField(default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True)
    logo_url = models.URLField(max_length=1024, blank=True, null=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name='readmes', null=True)
    github_repository = models.ForeignKey(GitHubRepository, null=True, blank=True, on_delete=models.CASCADE, related_name='readmes')
