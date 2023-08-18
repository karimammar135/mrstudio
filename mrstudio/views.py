from django.shortcuts import render
from .models import User
import json
from django.http import JsonResponse

# views
def index(request):
    return render(request, 'mrstudio/index.html')

# Authentication
def authentication(request):
    
    return JsonResponse({"authenticated": request.user.is_authenticated}, status=201)
