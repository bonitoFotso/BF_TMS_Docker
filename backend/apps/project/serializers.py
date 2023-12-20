# serializers.py

from rest_framework import serializers
from .models import Tache, Technicien, TechnicienTache, Rapport, Categorie, Activite
from apps.clients.serializers import AppelantTacheSerializer

class TechnicienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technicien
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activite
        fields = '__all__'

class TacheSerializer(serializers.ModelSerializer):
    assignations = TechnicienSerializer(many=True, read_only=True)
    time = serializers.ReadOnlyField(source='get_time_remaining_or_exceeded')
    progression = serializers.ReadOnlyField(source='get_progression')
    categorie = CategorieSerializer(many=True)
    activite = ActiviteSerializer(many=True)
    appelant = AppelantTacheSerializer()

    class Meta:
        model = Tache
        fields = '__all__'
class TacheCreateSerializer(serializers.ModelSerializer):
    assignations = TechnicienSerializer(many=True, read_only=True)
    time = serializers.ReadOnlyField(source='get_time_remaining_or_exceeded')
    progression = serializers.ReadOnlyField(source='get_progression')


    class Meta:
        model = Tache
        fields = '__all__'

class TechnicienTacheSerializer(serializers.ModelSerializer):
    technicien = TechnicienSerializer(read_only=True)
    tache = TacheSerializer(read_only=True)

    class Meta:
        model = TechnicienTache
        fields = '__all__'

class RapportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rapport
        fields = '__all__'

