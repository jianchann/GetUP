from app.utils import get_env_variable
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

try:
    POSTGRES_URL = get_env_variable("POSTGRES_URL")
    POSTGRES_USER = get_env_variable("POSTGRES_USER")
    POSTGRES_PASSWORD = get_env_variable("POSTGRES_PASSWORD")
    POSTGRES_DB = get_env_variable("POSTGRES_DB")
    POSTGRES_URL_BASE = get_env_variable("POSTGRES_URL_BASE")

    DB_URL = '{base}://{user}:{pw}@{url}/{db}'.format(base=POSTGRES_URL_BASE,
        user=POSTGRES_USER, pw=POSTGRES_PASSWORD, url=POSTGRES_URL, db=POSTGRES_DB)

    APP_SECRET = get_env_variable("APP_SECRET")
except:
    DB_URL = 'postgres://ljhrjnhsvpbqfs:53a16329d15b7ecab64c5af909e85f4619a101c0d9cc538d501b8a12e5585181@ec2-174-129-32-215.compute-1.amazonaws.com:5432/ders8cfv6cu5hs'
    APP_SECRET = 'secret_key'


app = Flask(__name__)
app.config['SECRET_KEY'] = APP_SECRET
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models, utils
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
