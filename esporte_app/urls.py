from django.urls import include
from django.urls import path, include
from . import views

urlpatterns = [
   path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    # Corrected view name from signup_view to signup
    path('signup/', views.signup, name='signup'),
    path('contato/', views.contato, name='contato'), 
    path('fale-conosco/', views.fale_conosco, name='fale_conosco'),
    # The view 'delete_account' is not defined in your views.py, so I've commented it out.
   # path('delete_account/', views.delete_account, name='delete_account'),
]