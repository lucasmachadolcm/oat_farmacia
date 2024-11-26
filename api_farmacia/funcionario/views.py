from rest_framework import viewsets
from .models import Funcionario
from .serializers import FuncionarioSerializer

class FuncionarioView(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer
