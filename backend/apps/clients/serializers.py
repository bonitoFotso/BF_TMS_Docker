# serializers.py

from rest_framework import serializers
from .models import Client, Agence, Appelant

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class AgenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agence
        fields = '__all__'

class AppelantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appelant
        fields = '__all__'

class AgenceTacheSerializer(serializers.ModelSerializer):
    siege = ClientSerializer()
    class Meta:
        model = Agence
        fields = '__all__'

class AppelantTacheSerializer(serializers.ModelSerializer):
    agence = AgenceTacheSerializer()
    class Meta:
        model = Appelant
        fields = '__all__'