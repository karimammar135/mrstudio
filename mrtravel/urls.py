
from django.urls import path, re_path
from . import views  

urlpatterns = [
    path('', views.index, {'path': ''}, name="index"),
    re_path(r'^(?P<path>.*)/$', views.index, name="index"),
    
    # API routes
    path('authentication', views.authentication, name="authentication"),
    path('login_user', views.login_user, name="login_user"),
    path('register', views.register_view, name="register_view"),
    path('logout', views.logout_view, name="logout_view"),
    path('user_info', views.user_info, name="user_info"),
    path('submit_hotel_form', views.submit_hotel_form, name="submit_hotel_form"),
]