from django.urls import path
from . import views

urlpatterns = [
   path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup_view, name='signup'),
    path('contato/', views.contato, name='contato'), 
    path('fale-conosco/', views.fale_conosco, name='fale_conosco'),
    path('delete_account/', views.delete_account, name='delete_account'),
]