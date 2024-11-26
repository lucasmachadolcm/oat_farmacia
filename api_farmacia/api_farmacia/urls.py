from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from cliente.views import ClienteView
from convenio.views import ConvenioView
from fornecedor.views import FornecedorView
from funcionario.views import FuncionarioView
from produto.views import ProdutosView
from receita.views import ReceitaView

# Cria um router para registrar as rotas da API
rotas = routers.DefaultRouter()
rotas.register(r'clientes', ClienteView, basename='Cliente')
rotas.register(r'convenios', ConvenioView, basename='Convenio')
rotas.register(r'fornecedores', FornecedorView, basename='Fornecedor')
rotas.register(r'funcionarios', FuncionarioView, basename='Funcionario')
rotas.register(r'produtos', ProdutosView, basename='Produtos')
rotas.register(r'receitas', ReceitaView, basename='Receita')

# Define as URLs
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(rotas.urls)),  # Inclui as rotas registradas no router
]

