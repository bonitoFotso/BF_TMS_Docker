from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Create a superuser automatically'

    def handle(self, *args, **options):
        User = get_user_model()

        # Fetch username, email, and password from environment variables
        #username = os.environ.get('EMAIL', 'admin')
        email = os.environ.get('DJANGO_ADMIN_EMAIL', 'admin@example.com')
        password = os.environ.get('DJANGO_ADMIN_PASSWORD', 'your_password')

        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser( email, password)

        self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
