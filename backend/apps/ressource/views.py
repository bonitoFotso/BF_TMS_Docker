# views.py

from rest_framework import generics
from .models import Technicien
from .serializers import TechnicienSerializer, TechnicienTacheListSerializer
from apps.project.serializers import TacheSerializer, Tache

class TechnicienListCreateView(generics.ListCreateAPIView):
    queryset = Technicien.objects.all()
    serializer_class = TechnicienSerializer

class TechnicienRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Technicien.objects.all()
    serializer_class = TechnicienSerializer

class TechnicienTachesList(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        technicien_id = self.kwargs['id']
        return Tache.objects.filter(assignations__id=technicien_id)
    
class TechnicienList(generics.ListAPIView):
    queryset = Technicien.objects.all()
    serializer_class = TechnicienTacheListSerializer

    def list(self, request, *args, **kwargs):
        print("TechnicienList view is called!")
        return super().list(request, *args, **kwargs)
