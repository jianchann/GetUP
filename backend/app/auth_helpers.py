from flask import jsonify, request
import jwt
from functools import wraps
from app import app, models

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
        except:
            return jsonify({'message' : 'Access Token is invalid.'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
