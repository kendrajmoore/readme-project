# Generated by Django 5.0 on 2023-12-13 14:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('readme_app', '0005_remove_readme_repo_name_remove_readme_username_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='readme',
            name='username',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='readmes', to=settings.AUTH_USER_MODEL),
        ),
    ]
