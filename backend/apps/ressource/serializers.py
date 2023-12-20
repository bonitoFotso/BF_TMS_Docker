# serializers.py

from rest_framework import serializers
from .models import Technicien
from apps.project.serializers import TacheSerializer


class TechnicienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technicien
        fields = '__all__'

class TechnicienTacheListSerializer(serializers.ModelSerializer):
    taches = TacheSerializer(many=True, read_only=True)

    class Meta:
        model = Technicien
        fields = '__all__'