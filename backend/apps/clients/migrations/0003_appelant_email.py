# Generated by Django 4.2.7 on 2023-12-12 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_appelant_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='appelant',
            name='email',
            field=models.EmailField(default='email@email.com', max_length=254, verbose_name='email'),
        ),
    ]
