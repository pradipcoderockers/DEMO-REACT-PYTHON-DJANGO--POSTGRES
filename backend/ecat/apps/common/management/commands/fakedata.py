from __future__ import absolute_import

from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.management import call_command
from common.fakedata_utilities import generate_fake_data


class Command(BaseCommand):
    help = 'Creates a set of ORM objects for development and staging environment.'

    def handle(self, *args, **options):
        generate_fake_data()
        self.stdout.write("Fake data script done.")
