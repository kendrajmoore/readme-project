from django.db import models

class Readme(models.Model):
    project_name = models.CharField(max_length=200, blank=False, null=False)
    repo_name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(default="Unknown")
    tools = models.TextField(default="Unknown")