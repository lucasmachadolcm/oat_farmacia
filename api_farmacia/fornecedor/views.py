from rest_framework import viewsets
from .models import Fornecedor
from .serializers import FornecedorSerializer

class FornecedorView(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer
