from django.shortcuts import render, redirect
from django.db import IntegrityError
from django.urls import reverse
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

from .models import User, HotelInfo, RoomSize

# views
def index(request, path):
    return render(request, 'mrtravel/index.html')


''' API ROUTES '''

## REGISTER USER API
def register_view(request):
    if request.method == "POST":
        # Get data required
        data = json.loads(request.body)

        # Enssure password matches confirmation password
        if data["password"] != data["confirmation"]:
            return JsonResponse({"error": "Confirmation Password doesn't match password"}, status=400)
        
        # Attempt to create user
        try: 
            user = User.objects.create_user(data["username"], data["email"], data["password"])
            user.hotelier = data["hotelier_account"]
            user.save()
        except IntegrityError:
            return JsonResponse({"error": "Coudn't create user"}, status=400)
        login(request, user)

        # return success message
        return JsonResponse({"message": "User created successfully"}, status=201)
        

## LOGIN USER API
def login_user(request):
    # If Post request
    if request.method == "POST":
        # Get data required
        data = json.loads(request.body)

        # Attempt to login user
        user = authenticate(request, username=data["username"], password=data["password"])

        # Check if authentication is successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "User Logged in successfully"}, status=201)
        else:
            return JsonResponse({"error": "Username and/or password is/are not correct"}, status=400)
    

# LOGOUT 
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "user successfuly loged out"}, status=201)


# Authentication
def authentication(request):
    return JsonResponse({"authenticated": request.user.is_authenticated}, status=201)

# User Info API
def user_info(request):
    try:
        user_info = request.user.serialize()
        return JsonResponse(user_info, safe=False)
    except AttributeError:
        return JsonResponse({"error": "user not logged in"}, status=400)


# Submit Hotel Form
def hotels(request):
    # Post method
    if request.method == "POST":
        # collect the data submited
        data = json.loads(request.body)

        if len(data['rooms']) == 0:
            return JsonResponse({"error": "No rooms created in this hotel"}, status=400)
        
        # save data in the database
        ''' Save hotel '''
        try:
            hotel = HotelInfo(hotel_name=data['hotel_name'], hotel_description=data['description'], locality=data['locality'], city=data['city'], country=data['country'], youtube_video=data['youtube_video_url'], picture_url=data['pic_url'], location=data['location_url'], check_in=data['check_in'], check_out=data['check_out'], security_deposit=data['security_deposit'], direct_payment_discount=data['direct_payment_discount'], mrtravel_hyphin=data['mrtravel_hyphin'], feature1=data['feature1'], feature2=data['feature2'], feature3=data['feature3'], feature4=data['feature4'])
            hotel.save()
        except KeyError:
            # Return error message
            return JsonResponse({"error": "Key error in hotel info"}, status=400)

        '''Save rooms'''
        for room in data['rooms']:
            try:
                room_size = RoomSize(hotel=hotel, size=room['size'], price_per_day=room['price'], discount=room['discount'], discount_type = room['discount_type'])
                room_size.save()
            except KeyError:
                # Return error message
                return JsonResponse({"error": "key error in rooms' info"}, status=400)

        # Return a success message
        return JsonResponse({"message": "data received and saved successfully"}, status=201)
    
    # Get method
    else:
        hotels = HotelInfo.objects.all()
        return JsonResponse([hotel.serialize() for hotel in hotels], safe=False)
    
# Hotel Info
def hotel_info(request, id):
    try:
        hotel = HotelInfo.objects.get(id=id)
        rooms = hotel.room_sizes.all()
        print(rooms)
        return JsonResponse({"hotel": hotel.serialize(), "rooms": [room.serialize() for room in rooms]}, safe=False)
    
    except HotelInfo.DoesNotExist:
        return JsonResponse({"error": "Hotel not found"}, status=400)