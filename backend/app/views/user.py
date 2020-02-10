"""
Author: Jian Chan, Gab Datiles, Hans Santos
This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020.

Code History:
02/04/20 - Jian Chan - Create File, Add all imports, Initialize all methods
02/04/20 - Hans Santos - Implement and finalize methods for user login
02/04/20 - Jian Chan - Implement and finalize methods for user register

File Creation Date:
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the user model/class
"""

from app import app, db, utils
from app.models import User, Workout, Review

import requests
import datetime
import jwt
from random import shuffle
from flask import Flask, jsonify, g, render_template, redirect, request

from werkzeug.security import generate_password_hash, check_password_hash

"""
Method Name: login
Creation Date: 02/04/20
Purpose: Login user if credentials are valid
Arguments: Request data for the credentials (Object, implicit)
Required: User class from database, app.config (Application configurations)
Return Value: JSON Object contianing JWT (String, token for authentication) and first_name (String, first name of user)
"""
@app.route('/user/login', methods=['POST'])
def login():
    post_data = request.get_json()
    email = post_data.get('email')
    password = post_data.get('password')
    user = User.query.filter(User.email == email).first()
    if user is None:
        # User does not exist
        return 'Account does not exist.', 422
    
    if user.check_password(password):
        token = jwt.encode({'id': user.id, 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30), 
            'admin': user.admin}, app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8'), 'first_name': user.first_name})
    else:
        return 'Incorrect credentials.', 422

"""
Method Name: register
Creation Date: 02/04/20
Purpose: Create user if data are valid
Arguments: Request data for the user data (Object, implicit)
Required: User class from database, app.config (Application configurations)
Return Value: JSON Object contianing JWT (String, token for authentication) and first_name (String, first name of user)
"""
@app.route('/user/register', methods=['POST'])
def register():
    post_data = request.get_json()
    first_name = post_data.get('first_name')
    last_name = post_data.get('last_name')
    password = post_data.get('password')
    email = post_data.get('email')
    admin = False

    users = User.query.filter((User.email == email)).all()
    if len(users) > 0:
        return 'Email already registered with existing account.', 409

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