from django.db import models

class Atleta(models.Model):
    nome = models.CharField(max_length=100)
    idade = models.PositiveIntegerField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome

class Atividade(models.Model):
    NIVEIS = [
        ('iniciante', 'Iniciante'),
        ('intermediario', 'Intermediário'),
        ('avancado', 'Avançado'),
    ]
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    nivel = models.CharField(max_length=20, choices=NIVEIS, default='iniciante')

    def __str__(self):
        return self.nome

class Sessao(models.Model):
    atleta = models.ForeignKey(Atleta, on_delete=models.CASCADE)
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE)
    data = models.DateTimeField(auto_now_add=True)
    duracao_minutos = models.PositiveIntegerField()

    class Meta:
        unique_together = ('atleta', 'atividade', 'data')

    def __str__(self):
        return f"{self.atleta} - {self.atividade} @ {self.data}"
