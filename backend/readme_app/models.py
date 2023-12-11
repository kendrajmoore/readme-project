from django.db import models

from user_app.models import User

class Readme(models.Model):
    project_name = models.CharField(max_length=200, blank=False, null=False)
    repo_name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(default="Unknown")
    tools = models.TextField(default="Unknown")
    reason = models.TextField(default="Unknown")
    content = models.TextField(default="Unknown")
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name='readmes', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
