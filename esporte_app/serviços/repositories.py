# esporte_app/serviços/repositories.py
from esporte_app.models import Atleta, Sessao
from django.db.models import Sum

class AtletaRepository:
    def get(self, atleta_id: int):
        return Atleta.objects.get(pk=atleta_id)

    def create(self, nome: str, idade: int, email: str):
        return Atleta.objects.create(nome=nome, idade=idade, email=email)

class SessaoRepository:
    def create(self, atleta, atividade_id: int, duracao_minutos: int):
        return Sessao.objects.create(atleta=atleta, atividade_id=atividade_id, duracao_minutos=duracao_minutos)

    def total_minutos_para_atleta(self, atleta_id: int):
        return Sessao.objects.filter(atleta_id=atleta_id).aggregate(total=Sum('duracao_minutos'))['total'] or 0
