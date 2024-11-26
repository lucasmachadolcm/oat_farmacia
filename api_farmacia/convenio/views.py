from rest_framework import viewsets
from .models import Convenio
from .serializers import ConvenioSerializer

class ConvenioView(viewsets.ModelViewSet):
    queryset = Convenio.objects.all()
    serializer_class = ConvenioSerializer
