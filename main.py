import os
from dotenv import load_dotenv
from flask_migrate import Migrate

from backend.app import create_app
from config import ROOT_URI

load_dotenv(os.path.join(ROOT_URI, '.env'))
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)
migrate = Migrate(app)
