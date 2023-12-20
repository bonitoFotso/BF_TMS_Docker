# urls.py (dans votre application Django)

from django.urls import path
from .views import (
    TacheListCreateView, TacheRetrieveUpdateDestroyView,
    TechnicienTacheListCreateView, TechnicienTacheRetrieveUpdateDestroyView,
    RapportListCreateView, RapportRetrieveUpdateDestroyView,
    CategorieListCreateView, CategorieDetailView, 
    ActiviteListCreateView, ActiviteDetailView,
    TacheListByCategorieView, TacheListByActiviteView,
    TacheListByStatusView, TacheListByPrioriteView
)

urlpatterns = [
    path('taches/', TacheListCreateView.as_view(), name='tache-list-create'),
    path('taches/<int:pk>/', TacheRetrieveUpdateDestroyView.as_view(), name='tache-retrieve-update-destroy'),
    path('technicien-taches/', TechnicienTacheListCreateView.as_view(), name='technicien-tache-list-create'),
    path('technicien-taches/<int:pk>/', TechnicienTacheRetrieveUpdateDestroyView.as_view(), name='technicien-tache-retrieve-update-destroy'),
    path('rapports/', RapportListCreateView.as_view(), name='rapport-list-create'),
    path('rapports/<int:pk>/', RapportRetrieveUpdateDestroyView.as_view(), name='rapport-retrieve-update-destroy'),
    # Ajoutez d'autres patterns d'URL pour les vues supplémentaires
    path('categories/', CategorieListCreateView.as_view(), name='categorie-list-create'),
    path('categories/<int:pk>/', CategorieDetailView.as_view(), name='categorie-detail'),
    path('activites/', ActiviteListCreateView.as_view(), name='activite-list-create'),
    path('activites/<int:pk>/', ActiviteDetailView.as_view(), name='activite-detail'),
    path('taches/by_categorie/<int:categorie_id>/', TacheListByCategorieView.as_view(), name='tache-list-by-categorie'),
    path('taches/by_activite/<int:activite_id>/', TacheListByActiviteView.as_view(), name='tache-list-by-activite'),
    path('taches/by_status/<str:status>/', TacheListByStatusView.as_view(), name='tache-list-by-status'),
    path('taches/by_priorite/<str:priorite>/', TacheListByPrioriteView.as_view(), name='tache-list-by-priorite'),
    
]
