from rest_framework import serializers
from .models import Cliente, Convenio, Fornecedor, Funcionario, Produtos, Receita

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'  

class ConvenioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convenio
        fields = '__all__'  

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'  

class FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = '__all__'  

class ProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtos
        fields = '__all__'  

class ReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receita
        fields = '__all__'  
