from django.db import models

# Create your models here.

class Convenio(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default='')
    nome = models.CharField(max_length=150, default='')
    cnpj = models.CharField(max_length=18, default='')
    telefone = models.CharField(max_length=15, default='')
    email = models.EmailField(default='')
    cep = models.CharField(max_length=9, default='')
    logradouro = models.CharField(max_length=150, default='')
    numero = models.CharField(max_length=10, default='')
    complemento = models.CharField(max_length=150, default='')  
    bairro = models.CharField(max_length=100, default='')
    cidade = models.CharField(max_length=100, default='')
    uf = models.CharField(max_length=2, default='')
    desconto = models.FloatField(default=0.0)  
    data_validade = models.DateField(default=None, null=True, blank=True)  
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome} | E-mail: {self.email}'