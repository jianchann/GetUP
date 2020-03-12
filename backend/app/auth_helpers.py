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
02/04/20 - Gab Datiles - Implement and finalize methods for token_required decorator

File Creation Date:
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Helper method to protect routes from unauthenticated requests
"""

from flask import jsonify, request
import jwt
from functools import wraps
from app import app, models

"""
Method Name: token_required
Creation Date: 02/04/20
Purpose: Check if user is logged in before continuing with original function call
Arguments: Function to wrap -- original function being called (Object), Request data for HTTP request (Object, implicit)
Required: User class from database, app.config (Application Configurations)
Return Value: Function call of original function with current user logged in (Object)
"""
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'X-Access-Token' in request.headers:
            token = request.headers['X-Access-Token']

        if not token:
            return jsonify({'message' : 'Access Token is missing.'}), 401
        try:
            print(token)
            print(app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'])
            print(data)
            current_user = models.User.query.filter_by(id=data['id']).first()
            print(current_user)
            if not current_user:
                raise
        except:
            return jsonify({'message' : 'Access Token is invalid.'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
