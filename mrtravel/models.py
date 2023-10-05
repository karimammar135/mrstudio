from django.db import models
from django.contrib.auth.models import AbstractUser

# User Model
class User(AbstractUser):
    hotelier = models.BooleanField(default=False)

# Hotel Details Model
class HotelInfo(models.Model):
    ''' Hotel information fields '''
    hotel_name = models.CharField(max_length=64)
    hotel_description = models.TextField()
    locality = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    country = models.CharField(max_length=64)

    ''' Url fields '''
    youtube_video = models.URLField()
    picture_url = models.URLField()
    location = models.URLField()

    ''' Time fields '''
    check_in = models.TimeField()
    check_out = models.TimeField()

    ''' Price details '''
    security_deposit = models.FloatField()
    mrtravel_hyphen = models.BooleanField(default=False)
    
    def __str__(self):
        return f"hotel_name: {self.hotel_name}, hotel_description: {self.hotel_description}, locality: {self.locality}, city: {self.city}, country: {self.country}, youtube_video: {self.youtube_video}, picture_url: {self.picture_url}, location: {self.location}, check_in: {self.check_in}, check_out: {self.check_out}"


# Room sizes model
class RoomSize(models.Model):
    hotel = models.ForeignKey(HotelInfo, on_delete=models.CASCADE, related_name="room_sizes")
    size = models.IntegerField()
    price_per_day = models.FloatField()
    discount = models.IntegerField()

    def __str__(self):
        return f"room_size: {self.size}, price_per_day: {self.price_per_day}, discount: {self.discount}"