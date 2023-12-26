
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
    path('hotels/limit<str:limit>', views.hotels, name="hotels"),
    path('hotel_info<int:id>', views.hotel_info, name="hotel_info"),
    path('rent_room', views.rent_room, name="rent_room"),
    path('complete_payment', views.complete_payment, name="complete_payment"),
    path('edit_hotel<int:id>', views.edit_hotel, name="edit_hotel"),
    path('delete_room<int:id>', views.delete_room, name="delete_room"),
    path('add_room', views.add_room, name="add_room"),
    path('edit_room', views.edit_room, name="edit_room"),
    path('delete_rent<int:id>', views.delete_rent, name="delete_rent"),
]