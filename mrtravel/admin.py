from django.contrib import admin
from .models import User, RoomSize, HotelInfo

# Register models
admin.site.register(User)
admin.site.register(RoomSize)
admin.site.register(HotelInfo)
