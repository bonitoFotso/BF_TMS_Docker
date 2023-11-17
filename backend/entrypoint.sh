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

# Fetch username, email, and password from .env.dev
USERNAME=$EMAIL
EMAIL=$EMAIL
PASSWORD=$PASSWORD

# Create superuser
python manage.py createsuperuser --noinput --username=$USERNAME --email=$EMAIL --password=$PASSWORD

python manage.py collectstatic --noinput

exec "$@"
