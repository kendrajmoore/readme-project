# Generated by Django 5.0 on 2023-12-09 00:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Readme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=200)),
                ('repo_name', models.CharField(max_length=200)),
                ('description', models.TextField(default='Unknown')),
                ('tools', models.TextField(default='Unknown')),
                ('reason', models.TextField(default='Unknown')),
                ('content', models.TextField(default='Unknown')),
                ('github_handle', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='readmes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
