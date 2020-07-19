from __future__ import unicode_literals
from fabric.api import local
from fabric.context_managers import shell_env

def ssh(service):
    """
    ssh into running service container
    :param service: ['backend', 'frontend', 'proxy', 'db', 'redis']
    USAGE: fab ssh:service
    """
    assert service in ['frontend', 'db', 'backend'], "%s is unrecognized service"
    local('docker-compose exec %s sh' % service)

def serve():
    cmd = 'docker-compose exec frontend npm run-script build'
    local(cmd)
    cmd = 'docker-compose exec frontend serve -s build -l 4000'
    local(cmd)

def notebook():
    """
    Start a jupyter notebook
    """
    # schema creation
    local('docker-compose exec backend python manage.py shell_plus --notebook')

def reset_db():
    """
    Reset db, migrate and generate fixtures.
    Useful when changing branch with different migrations.
    """
    # schema creation
    local('docker-compose exec backend python manage.py sqlflush')
    local('docker-compose exec backend python manage.py makemigrations')
    local('docker-compose exec backend python manage.py migrate')
    local('docker-compose exec backend python manage.py fakedata') 
