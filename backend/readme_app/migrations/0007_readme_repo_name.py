# Generated by Django 5.0 on 2023-12-13 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('readme_app', '0006_readme_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='readme',
            name='repo_name',
            field=models.TextField(default='Unknown'),
        ),
    ]
