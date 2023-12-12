# Generated by Django 4.2.4 on 2023-12-07 07:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mrtravel', '0015_rent_total_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='rent',
            name='hotel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hotel_rooms_rented', to='mrtravel.hotelinfo'),
        ),
        migrations.AlterField(
            model_name='rent',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customer_rooms_rented', to=settings.AUTH_USER_MODEL),
        ),
    ]