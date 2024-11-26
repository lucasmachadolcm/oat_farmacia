from django.db import models

class Produtos(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default='')
    nome = models.CharField(max_length=150, default='')
    descricao = models.CharField(max_length=500, default='')
    preco = models.FloatField(default=0.0)  # Corrigido
    categoria = models.CharField(max_length=150, default='')
    quantidade = models.IntegerField(default=0)
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome}'
