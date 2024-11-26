from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [ 
    path('<str:model_name>/', views.generic_manager, name="generic_manager"),
    path('<str:model_name>/<str:pk>/', views.generic_manager, name="generic_manager_by_id"),
]

""" 
 path('clientes/', views.get_clientes, name="get_all_clientes"),
    path('convenios/', views.get_convenios, name="get_all_convenios"),
    path('fornecedores/', views.get_fornecedores, name="get_all_fornecedores"),
    path('funcionarios/', views.get_funcionarios, name="get_all_funcionarios"),
    path('produtos/', views.get_produtos, name="get_all_produtos"),
    path('receitas/', views.get_receitas, name="get_all_receitas"),
    
    # Endpoints para busca e atualização por nome
    path('clientes/<str:nome>/', views.get_cliente_by_name, name="get_cliente_by_name"),
    path('convenios/<str:nome>/', views.get_convenio_by_name, name="get_convenio_by_name"),
    path('fornecedores/<str:nome>/', views.get_fornecedor_by_name, name="get_fornecedor_by_name"),
    path('funcionarios/<str:nome>/', views.get_funcionario_by_name, name="get_funcionario_by_name"),
    path('produtos/<str:nome>/', views.get_produto_by_name, name="get_produto_by_name"),
    path('receitas/<str:nome_paciente>/', views.get_receita_by_name, name="get_receita_by_name"), """