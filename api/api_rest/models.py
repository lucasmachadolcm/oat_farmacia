from django.db import models

# Create your models here.
class Cliente(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome = models.CharField(max_length=150, default='')
    cpf = models.CharField(max_length=14, default='')
    telefone = models.CharField(max_length=15, default='')
    email = models.EmailField(default='')
    cep = models.CharField(max_length=9, default='')
    logradouro = models.CharField(max_length=150, default='')
    numero = models.CharField(max_length=10, default='')
    complemento = models.CharField(max_length=150, default='')  
    bairro = models.CharField(max_length=100, default='')
    cidade = models.CharField(max_length=100, default='')
    uf = models.CharField(max_length=2, default='')
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome} | E-mail: {self.email}'
    

class Convenio(models.Model):
    id = models.BigIntegerField(primary_key=True)
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
    
    
class Fornecedor(models.Model):
    id = models.BigIntegerField(primary_key=True)
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
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome} | E-mail: {self.email}'
    
    
class Funcionario(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome = models.CharField(max_length=150, default='')
    cpf = models.CharField(max_length=14, default='')
    telefone = models.CharField(max_length=15, default='')
    email = models.EmailField(default='')
    cep = models.CharField(max_length=9, default='')
    logradouro = models.CharField(max_length=150, default='')
    numero = models.CharField(max_length=10, default='')
    complemento = models.CharField(max_length=150, default='')  
    bairro = models.CharField(max_length=100, default='')
    cidade = models.CharField(max_length=100, default='')
    uf = models.CharField(max_length=2, default='')
    cargo = models.CharField(max_length=150, default='')
    salario = models.FloatField(default=0.0)  
    data_admissao = models.DateField(default=None, null=True, blank=True)  
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome} | E-mail: {self.email}'

class Produtos(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome = models.CharField(max_length=150, default='')
    descricao = models.CharField(max_length=500, default='')
    preco = models.FloatField(default=0.0)  # Corrigido
    categoria = models.CharField(max_length=150, default='')
    quantidade = models.IntegerField(default=0)
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome}'
    

class Receita(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nome_paciente = models.CharField(max_length=150, default='')
    nome_medico = models.CharField(max_length=150, default='')
    crm = models.CharField(max_length=20, default='')
    data = models.DateField(default=None, null=True, blank=True) 
    medicamentos_prescritos = models.CharField(max_length=500, default='')
    dosagem = models.CharField(max_length=300, default='')
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome_paciente}'