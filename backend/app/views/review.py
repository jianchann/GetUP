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
- Create File, Add all imports, Initialize all methods
- Implement and finalize methods for get reviews
- Implement and finalize methods for add reviews
- Implement and finalize methods for delete review

File Creation Date:
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the review model/class
"""

from app import app, db, utils
from app.models import User, Workout, Review
from app.auth_helpers import token_required

import requests
import datetime
from flask import Flask, jsonify, g, render_template, redirect, request, abort

"""
Method Name: get_reviews
Creation Date: 
Purpose: Get all reviews
Arguments: None
Required: Review class from database, token_required from auth_helpers (to protect route)
Return Value: List of all reviews in json
"""
@app.route('/review', methods=['GET'])
# @token_required
def get_reviews():
    reviews = Review.query.all()
    return_data = []
    for review in reviews:
        return_data.append(review)
    return jsonify(return_data)

"""
Method Name: create_review
Creation Date: 
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
Creation Date: 
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
        abort(404,'User not authorized to delete this review.')

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': "Review deleted"})