
from django.urls import path
from . import views  

urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login_form, name="login_form"),
    path('logout', views.logout_view, name="logout_view"),
    path('register', views.register_view, name="register_view"),
    path('grid', views.grid, name="grid"),

    # API routes
    path('authentication', views.authentication, name="authentication"),
    path('login_user', views.login_user, name="login_user"),
]