
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('account.urls')),
    path('', include('apps.clients.urls')),
    path('', include('apps.project.urls')),
    path('', include('apps.dashboard.urls')),
    path('', include('apps.ressource.urls')),
    path('api/', include('apps.api.urls')),
]

