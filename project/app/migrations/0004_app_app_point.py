# Generated by Django 4.2.5 on 2023-10-23 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_app_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='app_point',
            field=models.IntegerField(default=100),
            preserve_default=False,
        ),
    ]