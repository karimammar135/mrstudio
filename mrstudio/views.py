from django.shortcuts import render, redirect
from django.db import IntegrityError
from django.urls import reverse
from .models import User
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

# views
def index(request):
    return render(request, 'mrstudio/index.html')

def login_form(request):
    return render(request, 'mrstudio/index.html')


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
    return redirect(reverse("index"))

# Authentication
def authentication(request):
    return JsonResponse({"authenticated": request.user.is_authenticated}, status=201)

# Grid test
def grid(request):
    return render(request, "mrstudio/grid.html")