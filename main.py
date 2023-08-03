import os
from dotenv import load_dotenv
from flask_migrate import Migrate

from backend.app import create_app, db
from backend.models import Task
from config import ROOT_URI

load_dotenv(os.path.join(ROOT_URI, '.env'))
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
	return dict(
		app=app,
		db=db,
		Task=Task
	)
