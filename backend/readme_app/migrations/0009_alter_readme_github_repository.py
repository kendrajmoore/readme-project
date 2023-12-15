# Generated by Django 5.0 on 2023-12-15 22:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('github_app', '0001_initial'),
        ('readme_app', '0008_readme_logo_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='readme',
            name='github_repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='readmes', to='github_app.githubrepository'),
        ),
    ]
