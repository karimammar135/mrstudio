
from django.urls import path
from . import views  

urlpatterns = [
    path('', views.index, name="index"),  
    path('grid', views.grid, name="grid"),

    # API routes
    path('authentication', views.authentication, name="authentication"),
]