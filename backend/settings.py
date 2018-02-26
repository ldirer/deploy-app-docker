import os
PRODUCTION = not os.environ['QUIZ_ENV'] == 'production'
DEBUG = not PRODUCTION

SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'postgresql://postgres:postgres@db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
