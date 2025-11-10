
from django.urls import path
from . import views

urlpatterns = [
   path('', views.home, name='home'),
    path('login/', views.login_view, name='login'), # Assumindo que sua view de login se chama login_view
    path('logout/', views.logout_view, name='logout'), # Assumindo que sua view de logout se chama logout_view
    path('signup/', views.signup_view, name='signup'), # Assumindo que sua view de cadastro se chama signup_view
    
    # NOVAS ROTAS DO HEADER (Resolvendo o NoReverseMatch)
    path('contato/', views.contato, name='contato'), 
    path('fale-conosco/', views.fale_conosco, name='fale_conosco'),
]

