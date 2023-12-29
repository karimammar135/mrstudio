from django.shortcuts import render, redirect
from django.db import IntegrityError
from django.urls import reverse
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

import datetime
import random

from .models import User, HotelInfo, RoomSize, Rent

# views
def index(request, path):
    return render(request, 'mrtravel/index.html')


''' API ROUTES '''

def username_exists(username):
    return User.objects.filter(username=username).exists()

## REGISTER USER API
def register_view(request):
    if request.method == "POST":
        # Get data required
        data = json.loads(request.body)

        # Enssure password matches confirmation password
        if data["password"] != data["confirmation"]:
            return JsonResponse({"error": "Confirmation Password doesn't match password"}, status=400)

        # Ensure username is not taken
        if username_exists(data['username']):
            return JsonResponse({"error": "This username is already taken"}, status=400)

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

''' Helper function '''
def checkExpiration(rooms):
    for room in rooms:
        survey_end_date = room.survey_end_date
        current_date = datetime.datetime.now()
        if survey_end_date.strftime("%Y") < current_date.strftime("%Y"):
            room.expired = True
            room.save()
        if survey_end_date.strftime("%Y") == current_date.strftime("%Y"):
            if survey_end_date.strftime("%m") < current_date.strftime("%m"):
                room.expired = True
                room.save()
            if survey_end_date.strftime("%m") == current_date.strftime("%m"):
                if survey_end_date.strftime("%d") < current_date.strftime("%d"):
                    room.expired = True
                    room.save()

# User Info API
def user_info(request):
    # If the user has an hotel
    try:
        user_info = request.user.serialize()
        hotel = HotelInfo.objects.get(owner=request.user)
        rooms_rented = hotel.hotel_rooms_rented.all()
        hotel_rooms = hotel.room_sizes.all()
        checkExpiration(rooms_rented)
        return JsonResponse({"user_info": user_info, "hotel": hotel.serialize(), "rooms_rented":  [room.serialize() for room in rooms_rented], "hotel_rooms": [room.serialize() for room in hotel_rooms]}, safe=False)
    
    # If the user haven't added his hotel yet
    except HotelInfo.DoesNotExist:
        print('no hotel')
        rooms_rented = request.user.customer_rooms_rented.all()
        checkExpiration(rooms_rented)
        return JsonResponse({"user_info": user_info, "hotel": False, "rooms_rented": [room.serialize() for room in rooms_rented], "hotel_rooms": None}, safe=False)
    
    except AttributeError:
        return JsonResponse({"error": "user not logged in"}, status=400)


# Submit Hotel Form
def hotels(request, limit):
    # Post method
    if request.method == "POST":
        # collect the data submited
        data = json.loads(request.body)

        if len(data['rooms']) == 0:
            return JsonResponse({"error": "No rooms created in this hotel"}, status=400)
        
        # save data in the database
        ''' Save hotel '''
        try:
            hotel = HotelInfo(owner=request.user, hotel_name=data['hotel_name'], hotel_description=data['description'], locality=data['locality'], city=data['city'], country=data['country'], youtube_video=data['youtube_video_url'], picture_url=data['pic_url'], location=data['location_url'], check_in=data['check_in'], check_out=data['check_out'], security_deposit=data['security_deposit'], direct_payment_discount=data['direct_payment_discount'], mrtravel_hyphin=data['mrtravel_hyphin'], feature1=data['feature1'], feature2=data['feature2'], feature3=data['feature3'], feature4=data['feature4'])
            hotel.save()
        except KeyError:
            # Return error message
            return JsonResponse({"error": "Key error in hotel info"}, status=400)

        '''Save rooms'''
        for room in data['rooms']:
            try:
                room_size = RoomSize(hotel=hotel, size=room['size'], price_per_day=room['price'], discount=room['discount'], discount_type = room['discount_type'], amount= room['amount'], available_rooms= room['amount'])
                room_size.save()
            except KeyError:
                # Return error message
                return JsonResponse({"error": "key error in rooms' info"}, status=400)

        # Return a success message
        return JsonResponse({"message": "data received and saved successfully"}, status=201)
    
    # Get method
    else:
        # cast to integer
        try:
            limit = int(limit)  
        except ValueError:
            return JsonResponse({"error": "limit must be in integer"}, safe=False)
        
        if limit == -1:
            hotels = HotelInfo.objects.all()
        else:
            hotels = list(HotelInfo.objects.all()[:limit])
            hotels = random.sample(hotels, limit)
        
        return JsonResponse([hotel.serialize() for hotel in hotels], safe=False)
    
# Hotel Info
def hotel_info(request, id):
    try:
        hotel = HotelInfo.objects.get(id=id)
        rooms = hotel.room_sizes.all()
        for room in rooms:
            room.available_rooms = room.amount - len(room.rents.all())
            room.save()
        
        return JsonResponse({"hotel": hotel.serialize(), "rooms": [room.serialize() for room in rooms]}, safe=False)
    
    except HotelInfo.DoesNotExist:
        return JsonResponse({"error": "Hotel not found"}, status=400)
    
# Rent room 
def rent_room(request):
    # Load data
    data = (json.loads(request.body))['payment_details']

    try:
        # Collect required data
        room_size = RoomSize.objects.get(id=(data['room_selected'])['id'])
        if int(room_size.amount) <= int(len(room_size.rents.all())):
            return JsonResponse({"error": "No more available rooms"}, status=201)
        customer = request.user
        survey_date = data['survey_date']
        survey_end_date = data['survey_end_date']
        total_price = data['total_price']
        hotel = HotelInfo.objects.get(id=room_size.hotel.id)
        payment = data['payment']
        duration = data['duration']
    except RoomSize.DoesNotExist:
        return JsonResponse({"error": "some data does not exist"}, status=201)
    
    # Save the rent in the database
    rent = Rent(room_size=room_size, hotel=hotel, customer=customer, total_price=total_price ,survey_date=survey_date, survey_end_date=survey_end_date, payment=payment, duration=duration)
    rent.save()

    # Update the available rooms in the specific room size
    room_size.available_rooms = room_size.amount - int(len(room_size.rents.all()))
    room_size.save()

    # Return success message
    return JsonResponse({"message": "room rented"}, status=201)


## Complete Payment
def complete_payment(request):
    # Load data
    data = (json.loads(request.body))['payment_details'] 

    try:
        rented_room = Rent.objects.get(id=data['id'])
        rented_room.payment = True
        rented_room.save()
    except Rent.DoesNotExist:
        # Return failure message
        return JsonResponse({"error": "Rent wasn't fount"}, status=201)

    # Return success message
    return JsonResponse({"message": "Payment completed"}, status=201)


## Edit Hotel Details
def edit_hotel(request, id):
    # Load data
    data = json.loads(request.body)
    
    # Get the appropriate hotel and update its fields
    try:
        hotel = HotelInfo.objects.get(id=id)
        hotel.hotel_name = data['hotel_name']
        hotel.locality = data['locality']
        hotel.city = data['city']
        hotel.country = data['country']
        hotel.location = data['location_url']
        hotel.youtube_video = data['youtube_video_url']
        hotel.hotel_description = data['description']
        hotel.feature1 = data['feature1']
        hotel.feature2 = data['feature2']
        hotel.feature3 = data['feature3']
        hotel.feature4 = data['feature4']
        hotel.picture_url = data['pic_url']
        hotel.direct_payment_discount = data['direct_payment_discount']
        hotel.mrtravel_hyphin = data['mrtravel_hyphin']
        hotel.check_in=data['check_in']
        hotel.check_out = data['check_out']
        hotel.security_deposit = data['security_deposit']
        hotel.save()
        
        # Return success message
        return JsonResponse({"message": "Hotel edited successfulu"}, status=201)
    
    except HotelInfo.DoesNotExist:
        # Return error message
        return JsonResponse({"error": "key error in rooms' info"}, status=400)
    

''' Delete Roomm '''
def delete_room(request, id):
    # Get the specific room
    try:
        room = RoomSize.objects.get(id=id)
        room.delete()
    except RoomSize.DoesNotExist:
        # Return success message
        return JsonResponse({"error": f"Couldn't find room with id:{id}"}, status=400)

    # Return success message
    return JsonResponse({"message": f"Successfully deleted room{id}"}, status=201)

''' Add room '''
def add_room(request):
    # Get submitted data
    data = json.loads(request.body)

    try:
        hotel = HotelInfo.objects.get(id=data['hotel_id'])
        hotel_rooms = hotel.room_sizes.all()
        for room in hotel_rooms:
            if int(data['size']) == int(room.size):
                # Return error
                return JsonResponse({"error": "This room size has already been added!"}, status=400)
            
        new_room = RoomSize(hotel=hotel, size=data['size'], price_per_day=data['price'] ,discount=data['discount'], discount_type=data['discount_type'], amount=data['amount'], available_rooms=data['amount'])
        new_room.save()
    except HotelInfo.DoesNotExist:
        # Return error
        return JsonResponse({"error": "Hotel not found"}, status=400)

    # Return success message
    return JsonResponse({"message": "Room added"}, status=201)

''' Edit Room '''
def edit_room(request):
    # Collect submitted data
    data = json.loads(request.body)

    try:
        room = RoomSize.objects.get(id=data['id'])
        room.size = data['size']
        room.price_per_day = data['price_per_day']
        room.amount = data['amount']
        room.discount = data['discount']
        room.discount_type = data['discount_type']
        room.save()
    except RoomSize.DoesNotExist:
        # Return error
        return JsonResponse({"error": "Room not found"}, status=400)

    # Return success message
    return JsonResponse({"message": "Room edited successfully"}, status=201)

''' Delete rent '''
def delete_rent(request, id):
    # Get the appropriate rent
    try:
        rent = Rent.objects.get(id=id)
        rent.delete()
    except Rent.DoesNotExist:
        # Return filure messgae
        return JsonResponse({"error": "Rent not found"})

    # Return success message
    return JsonResponse({"message": "Rent deleted successfully"}, status=201)