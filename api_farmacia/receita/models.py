from django.db import models

class Receita(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default='')
    nome_paciente = models.CharField(max_length=150, default='')
    nome_medico = models.CharField(max_length=150, default='')
    crm = models.CharField(max_length=20, default='')
    data = models.DateField(default=None, null=True, blank=True) 
    medicamentos_prescritos = models.CharField(max_length=500, default='')
    dosagem = models.CharField(max_length=300, default='')
    
    def __str__(self):
        return f'ID : {self.id} | Nome: {self.nome_paciente}'