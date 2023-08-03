import os

ROOT_URI = os.path.dirname(os.path.abspath(__name__))

class DevelopmentConfig:
	SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI', 'sqlite://' + os.path.join(ROOT_URI, 'dev-databse.db'))

class TestingConfig:
	SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URI', 'sqlite://' + os.path.join(ROOT_URI, 'test-databse.db'))
	TESTING = True

class ProductionConfig:
	DEBUG = False
	TESTING = False
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')

config = {
	'development': DevelopmentConfig,
	'testing': TestingConfig,
	'production': ProductionConfig
}
