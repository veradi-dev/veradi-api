#!/bin/sh

python manage.py migrate --no-input
python manage.py collectstatic --no-input
python manage.py initialize_models
python manage.py createadmin

gunicorn config.wsgi:application -b 0.0.0.0:8000

