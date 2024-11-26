from rest_framework import serializers
from .models import Convenio

class ConvenioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convenio
        fields = '__all__'  
