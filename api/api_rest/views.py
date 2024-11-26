from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Cliente, Convenio, Fornecedor, Funcionario, Produtos, Receita
from .serializers import (
    ClienteSerializer, ConvenioSerializer, FornecedorSerializer,
    FuncionarioSerializer, ProdutosSerializer, ReceitaSerializer
)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def generic_manager(request, model_name, pk=None):
    # Dicionário para mapear nomes aos modelos e serializers
    model_map = {
        'clientes': (Cliente, ClienteSerializer),
        'convenios': (Convenio, ConvenioSerializer),
        'fornecedores': (Fornecedor, FornecedorSerializer),
        'funcionarios': (Funcionario, FuncionarioSerializer),
        'produtos': (Produtos, ProdutosSerializer),
        'receitas': (Receita, ReceitaSerializer),
    }

    if model_name not in model_map:
        return Response({'error': 'Modelo inválido'}, status=status.HTTP_400_BAD_REQUEST)

    model_class, serializer_class = model_map[model_name]

    if request.method == 'GET':
        if pk:
            # Buscar item específico
            try:
                instance = model_class.objects.get(pk=pk)
                serializer = serializer_class(instance)
                return Response(serializer.data)
            except model_class.DoesNotExist:
                return Response({'error': f'{model_name[:-1].capitalize()} não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Listar todos os itens
            instances = model_class.objects.all()
            serializer = serializer_class(instances, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Criar um novo item
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if not pk:
            return Response({'error': 'ID é necessário para atualização'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = model_class.objects.get(pk=pk)
        except model_class.DoesNotExist:
            return Response({'error': f'{model_name[:-1].capitalize()} não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not pk:
            return Response({'error': 'ID é necessário para exclusão'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = model_class.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except model_class.DoesNotExist:
            return Response({'error': f'{model_name[:-1].capitalize()} não encontrado'}, status=status.HTTP_404_NOT_FOUND)







#########################################################dicas de acesso#############################################

# def databaseEmDjango():

#     data = User.objects.get(pk='gabriel_nick')          # OBJETO

#     data = User.objects.filter(user_age='25')           # QUERYSET

#     data = User.objects.exclude(user_age='25')          # QUERYSET

#     data.save()

#     data.delete()

""" # Função auxiliar para listar todos os registros de um modelo
def get_data(model, serializer_class):
    data = model.objects.all()
    serializer = serializer_class(data, many=True)
    return Response(serializer.data)

# Função genérica para buscar e atualizar por um campo específico
def get_by_field(request, model_class, serializer_class, field_name, field_value):
    try:
        query = {field_name: field_value}  
        instance = model_class.objects.get(**query)
    except model_class.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializer_class(instance)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Views de listagem (GET todos os registros)
@api_view(['GET'])
def get_clientes(request):
    return get_data(Cliente, ClienteSerializer)

@api_view(['GET'])
def get_convenios(request):
    return get_data(Convenio, ConvenioSerializer)

@api_view(['GET'])
def get_fornecedores(request):
    return get_data(Fornecedor, FornecedorSerializer)

@api_view(['GET'])
def get_funcionarios(request):
    return get_data(Funcionario, FuncionarioSerializer)

@api_view(['GET'])
def get_produtos(request):
    return get_data(Produtos, ProdutosSerializer)

@api_view(['GET'])
def get_receitas(request):
    return get_data(Receita, ReceitaSerializer)

# Views de busca/atualização específicas (GET e PUT)
@api_view(['GET', 'PUT'])
def get_cliente_by_name(request, nome):
    return get_by_field(request, Cliente, ClienteSerializer, 'nome', nome)

@api_view(['GET', 'PUT'])
def get_convenio_by_name(request, nome):
    return get_by_field(request, Convenio, ConvenioSerializer, 'nome', nome)

@api_view(['GET', 'PUT'])
def get_fornecedor_by_name(request, nome):
    return get_by_field(request, Fornecedor, FornecedorSerializer, 'nome', nome)

@api_view(['GET', 'PUT'])
def get_funcionario_by_name(request, nome):
    return get_by_field(request, Funcionario, FuncionarioSerializer, 'nome', nome)

@api_view(['GET', 'PUT'])
def get_produto_by_name(request, nome):
    return get_by_field(request, Produtos, ProdutosSerializer, 'nome', nome)

@api_view(['GET', 'PUT'])
def get_receita_by_name(request, nome_paciente):
    return get_by_field(request, Receita, ReceitaSerializer, 'nome_paciente', nome_paciente)
 """
