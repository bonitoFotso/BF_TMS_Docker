# urls.py (dans votre application Django)

from django.urls import path
from .views import (TechnicienListCreateView, TechnicienRetrieveUpdateDestroyView,
                     TechnicienTachesList, TechnicienList)

urlpatterns = [
    path('techniciens/', TechnicienListCreateView.as_view(), name='technicien-list-create'),
    path('techniciens/<int:pk>/', TechnicienRetrieveUpdateDestroyView.as_view(), name='technicien-retrieve-update-destroy'),
    # Ajoutez d'autres patterns d'URL pour les vues supplémentaires
    path('technicien/<int:id>/taches/', TechnicienTachesList.as_view(), name='technicien-taches-list'),
    path('techniciens-list/', TechnicienList.as_view(), name='technicien-list'),

]
