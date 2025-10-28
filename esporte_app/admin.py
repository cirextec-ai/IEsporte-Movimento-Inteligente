  # esporto_app/admin.py
from django.contrib import admin
from .models import Atleta, Atividade, Sessao

admin.site.register(Atleta)
admin.site.register(Atividade)
admin.site.register(Sessao)
  

# Register your models here.
