from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('api/signin/', views.api_signin, name='api_signin'),
    path('logout/', views.logout_view, name='logout'),
]
