# urls.py (dans votre application Django)

from django.urls import path
from .views import (
    ClientListCreateView, ClientRetrieveUpdateDestroyView,
    AgenceListCreateView, AgenceRetrieveUpdateDestroyView,
    AppelantListCreateView, AppelantRetrieveUpdateDestroyView
)

urlpatterns = [
    path('clients/', ClientListCreateView.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientRetrieveUpdateDestroyView.as_view(), name='client-retrieve-update-destroy'),
    path('agences/', AgenceListCreateView.as_view(), name='agence-list-create'),
    path('agences/<int:pk>/', AgenceRetrieveUpdateDestroyView.as_view(), name='agence-retrieve-update-destroy'),
    path('appelants/', AppelantListCreateView.as_view(), name='appelant-list-create'),
    path('appelants/<int:pk>/', AppelantRetrieveUpdateDestroyView.as_view(), name='appelant-retrieve-update-destroy'),
    # Ajoutez d'autres patterns d'URL pour les vues supplémentaires
]
