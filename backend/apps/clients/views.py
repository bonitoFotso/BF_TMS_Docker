# views.py

from rest_framework import generics
from .models import Client, Agence, Appelant
from .serializers import ClientSerializer, AgenceSerializer, AppelantSerializer

class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class AgenceListCreateView(generics.ListCreateAPIView):
    queryset = Agence.objects.all()
    serializer_class = AgenceSerializer

class AgenceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agence.objects.all()
    serializer_class = AgenceSerializer

class AppelantListCreateView(generics.ListCreateAPIView):
    queryset = Appelant.objects.all()
    serializer_class = AppelantSerializer

class AppelantRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appelant.objects.all()
    serializer_class = AppelantSerializer
