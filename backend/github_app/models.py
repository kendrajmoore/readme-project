from django.db import models

class GitHubRepository(models.Model):
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.owner}/{self.name}"
