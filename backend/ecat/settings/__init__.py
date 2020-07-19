from split_settings.tools import include
import os

ENV = os.getenv('ENV', 'local')

base_settings = [
    'components/common.py',  
    'components/database.py',
    # Select the right env:
    'environments/%s.py' % ENV,
]

# Include settings:
include(*base_settings)