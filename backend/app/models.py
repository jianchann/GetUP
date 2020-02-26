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
01/20/20 - Jian Chan - Create File, Add all imports, Initialize all methods
01/20/20 - Jian Chan - Set up schema for User, Workout, Review

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Models for User, Workout and Review
"""

from app import db
from datetime import datetime,date
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    workouts = db.relationship("Workout", backref="user")
    reviews = db.relationship("Review", backref="user")

    """
    Method Name: set_password
    Creation Date: 02/04/20
    Purpose: Set password of user
    Arguments: self (Object, class method is being called from), password (String, password of user)
    Required: None
    Return Value: None
    """
    def set_password(self, password):
        self.password = generate_password_hash(password)

    """
    Method Name: check_password
    Creation Date: 02/04/20
    Purpose: Check password of user
    Arguments: self (Object, class method is being called from), password (String, password of user)
    Required: None
    Return Value: True/False (Boolean, if password checking is a success)
    """
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User %r>' % self.id


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    location = db.Column(db.String(255))
    best_times = db.Column(db.String(255))
    duration = db.Column(db.Integer)
    materials = db.Column(db.String(255))
    difficulty = db.Column(db.String(50))
    people_count = db.Column(db.Integer)
    instructions = db.Column(db.String)
    status = db.Column(db.String(50), default="Pending", nullable=False)
    image = db.Column(db.String(255))
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    reviews = db.relationship("Review", backref="workout")

    def __repr__(self):
        return '<Workout %r>' % self.title

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    body = db.Column(db.String(255))
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Review %r>' % self.id