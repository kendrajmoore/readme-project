# Generated by Django 5.0 on 2023-12-09 01:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('readme_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='readme',
            name='github_handle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='readmes', to=settings.AUTH_USER_MODEL),
        ),
    ]
