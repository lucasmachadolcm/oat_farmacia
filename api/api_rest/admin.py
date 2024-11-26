from django.contrib import admin

# Register your models here.
from .models import Cliente, Convenio, Fornecedor, Funcionario, Produtos, Receita

admin.site.register(Cliente)
admin.site.register(Convenio)
admin.site.register(Fornecedor)
admin.site.register(Funcionario)
admin.site.register(Produtos)
admin.site.register(Receita)