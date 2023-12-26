from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date

# User Model
class User(AbstractUser):
    hotelier = models.BooleanField(default=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "hotelier": self.hotelier
        }

# Hotel Details Model
class HotelInfo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="hotel", blank=True, null=True)
    ''' Hotel information fields '''
    hotel_name = models.CharField(max_length=64)
    hotel_description = models.TextField()
    locality = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    country = models.CharField(max_length=64)

    ''' Url fields '''
    youtube_video = models.URLField()
    picture_url = models.URLField()
    location = models.URLField(max_length=500)

    ''' Time fields '''
    check_in = models.TimeField()
    check_out = models.TimeField()

    ''' Price details '''
    security_deposit = models.FloatField()
    direct_payment_discount = models.IntegerField(default=0)
    mrtravel_hyphin = models.BooleanField(default=False)

    ''' Features '''
    feature1 = models.CharField(max_length=64)
    feature2 = models.CharField(max_length=64)
    feature3 = models.CharField(max_length=64)
    feature4 = models.CharField(max_length=64)
    
    def __str__(self):
        return f"hotel_name: {self.hotel_name}, hotel_description: {self.hotel_description}, locality: {self.locality}, city: {self.city}, country: {self.country}, youtube_video: {self.youtube_video}, picture_url: {self.picture_url}, location: {self.location}, check_in: {self.check_in}, check_out: {self.check_out}, features: 4 features"
    
    def serialize(self):
        return {
            "id": self.id,
            "owner_id": self.owner.id,
            "name": self.hotel_name,
            "description": self.hotel_description,
            "locality": self.locality,
            "city": self.city,
            "country": self.country,
            "youtube_video": self.youtube_video,
            "picture_url": self.picture_url,
            "location": self.location,
            "check_in": self.check_in.strftime("%I:%M %p"),
            "check_out": self.check_out.strftime("%I:%M %p"),
            "security_deposit": self.security_deposit,
            "direct_payment_discount": self.direct_payment_discount,
            "mrtravel_hyphin": self.mrtravel_hyphin,
            "feature1": self.feature1,
            "feature2": self.feature2,
            "feature3": self.feature3,
            "feature4": self.feature4
        }


# Room sizes model
class RoomSize(models.Model):
    hotel = models.ForeignKey(HotelInfo, on_delete=models.CASCADE, related_name="room_sizes")
    size = models.IntegerField()
    price_per_day = models.FloatField()
    discount = models.IntegerField(blank=True, default=0)
    discount_type = models.CharField(max_length=64, default="first_day")
    amount = models.IntegerField(default=1)
    available_rooms = models.IntegerField(default=1)

    def __str__(self):
        return f"room_size: {self.size}, price_per_day: {self.price_per_day}, discount: {self.discount}, discount_type: {self.discount_type}, amount: {self.amount}, available_rooms: {self.available_rooms}"
    
    def serialize(self):
        return {
            "id": self.id,
            "size": self.size,
            "price_per_day": self.price_per_day,
            "discount": self.discount,
            "discount_type": self.discount_type,
            "amount": self.amount,
            "available_rooms": self.available_rooms
        }
    
# Rent
class Rent(models.Model):
    room_size = models.ForeignKey(RoomSize, on_delete=models.CASCADE, related_name="rents")
    hotel = models.ForeignKey(HotelInfo, on_delete=models.CASCADE, related_name="hotel_rooms_rented", blank=True, null=True)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customer_rooms_rented")
    total_price = models.IntegerField(default=0)
    survey_date = models.DateField(default=date.today)
    survey_end_date = models.DateField(default=date.today)
    duration = models.IntegerField(default=1)
    payment = models.BooleanField(default=False)
    expired = models.BooleanField(default=False)

    def __str__(self):
        return f"room_size: {self.room_size.size}, hotel: {self.hotel}, customer: {self.customer}, total_price:{self.total_price}, survey_date: {self.survey_date}, survey_end_date: {self.survey_end_date}, payment: {self.payment}, expired: {self.expired}"
    
    def serialize(self):
        return {
            "id": self.id,
            "hotel": self.hotel.serialize(),
            "customer": self.customer.serialize(),
            "total_price": self.total_price,
            "survey_date": self.survey_date.strftime("%d/%m/%Y"),
            "survey_date_named": self.survey_date.strftime("%d - %B - %Y"),
            "survey_end_date": self.survey_end_date,
            "duration": self.duration,
            "room_size": self.room_size.serialize(), 
            "payment": self.payment,
            "expired": self.expired
        }
