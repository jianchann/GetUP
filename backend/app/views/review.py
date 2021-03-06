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
02/17/20 - Jian Chan - Create File, Add all imports, Initialize all methods
02/18/20 - Gab Datiles - Implement and finalize methods for add reviews
03/02/20 - Gab Datiles - Implement and finalize methods for delete reviews
03/02/20 - Jian Chan - Implement user roles customization (for admin)

File Creation Date: 02/17/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the review model/class
"""

from app import app, db, utils
from app.models import User, Workout, Review
from app.auth_helpers import token_required

import requests
import datetime
from flask import Flask, jsonify, g, render_template, redirect, request

"""
Method Name: create_review
Creation Date: 02/18/22
Purpose: Add review to the database
Arguments: User adding workout (Object), request data for the review (Object, implicit)
Required: Review class from database, token_required from auth_helpers (to protect route)
Return Value: Success message in json
"""
@app.route('/review', methods=['POST'])
@token_required
def create_review(current_user):
    post_data = request.get_json()
    body = post_data.get('body')
    rating = post_data.get('rating')
    workout_id = post_data.get('workout_id')
    workout = Workout.query.get(workout_id)

    review = Review(
        body = body,
        rating = rating
    )

    db.session.add(review)
    current_user.reviews.append(review)
    workout.reviews.append(review)

    db.session.commit()

    return jsonify({'message': "New review created."})

"""
Method Name: delete_review
Creation Date: 03/02/20
Purpose: Delete review from the database if user is permitted to
Arguments: ID of review (Int), User deleting review (Object)
Required: Review class from database, token_required from auth_helpers (to protect route)
Return Value: Success message in json
"""
@app.route('/review/<int:id>', methods=['DELETE'])
@token_required
def delete_review(current_user,id):
    review = Review.query.get(id)
    
    if review.user_id != current_user.id and not current_user.admin:
        return 'User not authorized to delete this review.', 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': "Review deleted"})