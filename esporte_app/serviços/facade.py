  # esporte_app/services/facade.py

# Corrected import
from .repositories import AtletaRepository, SessaoRepository
from datetime import datetime

class MovimentoInteligenteFacade:
      def __init__(self):
          self.atleta_repo = AtletaRepository()
          self.sessao_repo = SessaoRepository()

      # Operação de alto nível: cadastrar atleta
      def cadastrar_atleta(self, nome: str, idade: int, email: str):
          atleta = self.atleta_repo.create(nome=nome, idade=idade, email=email)
          return atleta

      # Operação de alto nível: registrar sessão
      def registrar_sessao(self, atleta_id: int, atividade_id: int, duracao_minutos: int):
          atleta = self.atleta_repo.get(atleta_id)
          # validações simples podem ocorrer aqui
          sessao = self.sessao_repo.create(
              atleta=atleta, atividade_id=atividade_id, duracao_minutos=duracao_minutos
          )
          return sessao

      # Consulta agregada
      def total_tempo_estudo(self, atleta_id: int):
          return self.sessao_repo.total_minutos_para_atleta(atleta_id)
  