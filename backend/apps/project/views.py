# views.py

from rest_framework import generics
from rest_framework import filters

from .models import Tache, Technicien, TechnicienTache, Rapport, Categorie, Activite
from .serializers import (
    TacheSerializer, TechnicienTacheSerializer, 
    RapportSerializer, CategorieSerializer, 
    ActiviteSerializer,TacheCreateSerializer, 
)

class TacheListCreateView(generics.ListCreateAPIView):
    queryset = Tache.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            # Utiliser un sérialiseur différent pour la création
            return TacheCreateSerializer
        # Utiliser le sérialiseur standard pour la liste
        return TacheSerializer

class TacheRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tache.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            # Utiliser un sérialiseur différent pour la mise à jour partielle ou complète
            return TacheCreateSerializer
        # Utiliser le sérialiseur standard pour la récupération et la suppression
        return TacheSerializer

class TechnicienTacheListCreateView(generics.ListCreateAPIView):
    queryset = TechnicienTache.objects.all()
    serializer_class = TechnicienTacheSerializer

class TechnicienTacheRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TechnicienTache.objects.all()
    serializer_class = TechnicienTacheSerializer

class RapportListCreateView(generics.ListCreateAPIView):
    queryset = Rapport.objects.all()
    serializer_class = RapportSerializer

class RapportRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rapport.objects.all()
    serializer_class = RapportSerializer

class CategorieListCreateView(generics.ListCreateAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class CategorieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class ActiviteListCreateView(generics.ListCreateAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer

class ActiviteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activite.objects.all()
    serializer_class = ActiviteSerializer

class TacheListByCategorieView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        categorie_id = self.kwargs.get('categorie_id')  # Supposons que l'ID de la catégorie soit passé en tant que paramètre d'URL
        return Tache.objects.filter(categorie__id=categorie_id)

class TacheListByActiviteView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        activite_id = self.kwargs.get('activite_id')  # Supposons que l'ID de l'activité soit passé en tant que paramètre d'URL
        return Tache.objects.filter(activite__id=activite_id)

class TacheListByStatusView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        status = self.kwargs.get('status')  # Supposons que le statut soit passé en tant que paramètre d'URL
        return Tache.objects.filter(status=status)

class TacheListByPrioriteView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        priorite = self.kwargs.get('priorite')  # Supposons que la priorité soit passée en tant que paramètre d'URL
        return Tache.objects.filter(priorite=priorite)
    

class TacheAssociationListView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        association_id = self.kwargs.get('association_id')
        return Tache.objects.filter(assignations__id=association_id)

class TacheAppelantListView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        appelant_id = self.kwargs.get('appelant_id')
        return Tache.objects.filter(appelant__id=appelant_id)

class TacheOkListView(generics.ListAPIView):
    serializer_class = TacheSerializer

    def get_queryset(self):
        return Tache.objects.filter(ok=True)

class TacheDateCreationListView(generics.ListAPIView):
    serializer_class = TacheSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['createdAt']

    def get_queryset(self):
        created_at = self.kwargs.get('created_at')
        return Tache.objects.filter(createdAt=created_at)

class TacheDateFinListView(generics.ListAPIView):
    serializer_class = TacheSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date_fin']

    def get_queryset(self):
        date_fin = self.kwargs.get('date_fin')
        return Tache.objects.filter(date_fin=date_fin)

class TacheDateModificationListView(generics.ListAPIView):
    serializer_class = TacheSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updatedAt']

    def get_queryset(self):
        updated_at = self.kwargs.get('updated_at')
        return Tache.objects.filter(updatedAt=updated_at)
