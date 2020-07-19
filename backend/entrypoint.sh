#!/usr/bin/env bash
/usr/local/bin/wait-for-it.sh db:5432 -t 30 && python /code/manage.py collectstatic --noinput && python /code/manage.py makemigrations --noinput && python /code/manage.py migrate --noinput && python /code/manage.py runserver 0.0.0.0:8000
