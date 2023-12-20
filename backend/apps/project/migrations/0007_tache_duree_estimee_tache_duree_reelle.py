# Generated by Django 4.2.7 on 2023-12-12 04:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_rename_nom_activite_name_rename_nom_categorie_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tache',
            name='duree_estimee',
            field=models.DurationField(default=datetime.timedelta(seconds=14400), verbose_name='Durée estimée'),
        ),
        migrations.AddField(
            model_name='tache',
            name='duree_reelle',
            field=models.DurationField(blank=True, null=True, verbose_name='Durée réelle'),
        ),
    ]
