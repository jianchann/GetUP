from app import app, db, utils
from app.models import User, Workout, Review

import requests
import datetime
import jwt
from random import shuffle
from flask import Flask, jsonify, g, render_template, redirect, request, abort

from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/user/login', methods=['POST'])
def login():
    post_data = request.get_json()
    email = post_data.get('email')
    password = post_data.get('password')
    user = User.query.filter(User.email == email).first()
    if user is None:
        # User does not exist
        abort(422,'Account does not exist.')
    
    if user.check_password(password):
        token = jwt.encode({'id': user.id, 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30), 
            'admin': user.admin}, app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8'), 'first_name': user.first_name})
    else:
        abort(422,'Incorrect credentials.')

@app.route('/user/register', methods=['POST'])
def create_user():
    post_data = request.get_json()
    first_name = post_data.get('first_name')
    last_name = post_data.get('last_name')
    password = post_data.get('password')
    email = post_data.get('email')
    admin = False

    users = User.query.filter((User.email == email)).all()
    if len(users) > 0:
        abort(409,'Email already registered with existing account.')

    if not len(User.query.all()):
        admin = True

    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        admin=admin
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    token = jwt.encode({'id': user.id, 
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30), 
        'admin': user.admin}, app.config['SECRET_KEY'])

    return jsonify({'token': token.decode('UTF-8'), 'first_name': user.first_name})