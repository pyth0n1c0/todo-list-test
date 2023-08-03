from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from config import config

db = SQLAlchemy()
ma = Marshmallow()

def create_app(config_name):
	app = Flask(__name__)
	app.config.from_object(config[config_name])

	from .api import api
	api.configure(app)

	CORS(app)
	db.init_app(app)
	ma.init_app(app)

	return app
