
from django.urls import path
from . import views  

urlpatterns = [
    path('', views.index, name="index"),  

    # API routes
    path('authentication', views.authentication, name="authentication"),
]