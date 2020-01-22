from app.utils import get_env_variable
from flask import Flask
from flask_redis import FlaskRedis
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

POSTGRES_URL = get_env_variable("POSTGRES_URL")
POSTGRES_USER = get_env_variable("POSTGRES_USER")
POSTGRES_PASSWORD = get_env_variable("POSTGRES_PASSWORD")
POSTGRES_DB = get_env_variable("POSTGRES_DB")
POSTGRES_URL_BASE = get_env_variable("POSTGRES_URL_BASE")

DB_URL = '{base}://{user}:{pw}@{url}/{db}'.format(base=POSTGRES_URL_BASE,
    user=POSTGRES_USER, pw=POSTGRES_PASSWORD, url=POSTGRES_URL, db=POSTGRES_DB)

APP_SECRET = get_env_variable("APP_SECRET")

app = Flask(__name__)
app.config['SECRET_KEY'] = APP_SECRET
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)
migrate = Migrate(app, db)

REDIS_URL = get_env_variable("REDIS_URL")
app.config['REDIS_URL'] = "redis://{redis_url}/0".format(redis_url=REDIS_URL)

redis_store = FlaskRedis(app)

from app import models, utils, auth_helpers
from app.views import *

@app.cli.command('resetdb')
def resetdb_command():
    """Destroys and creates the database + tables."""

    from sqlalchemy_utils import database_exists, create_database, drop_database
    if app.debug:
        if database_exists(DB_URL):
            print('Deleting database.')
            drop_database(DB_URL)
        if not database_exists(DB_URL):
            print('Creating database.')
            create_database(DB_URL)

    print('Creating tables.')
    db.create_all()
    print('Shiny!')
