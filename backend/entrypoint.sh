#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Uncomment below to flush db e.g. after running tests
# Just make sure you really mean it 
# python manage.py flush --no-input

# We have a base custom user model so need to makemigrations out of the box
python manage.py makemigrations

python manage.py migrate

# Create superuser
#python manage.py createsuperuser --noinput --email=$DJANGO_ADMIN_EMAIL --password=$DJANGO_ADMIN_PASSWORD

python manage.py collectstatic --noinput

exec "$@"
