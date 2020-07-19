import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV = os.getenv('ENV', 'local')

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('DB_NAME', 'postgres'),
        'USER': os.getenv('DB_USERNAME', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOSTNAME', 'db'),
        'PORT': 5432,
    },
}