from app import app, db, utils
from app.models import User, Workout, Review
from app.auth_helpers import token_required

import requests
import datetime
from flask import Flask, jsonify, g, render_template, redirect, request, abort


@app.route('/review', methods=['GET'])
# @token_required
def get_reviews():
    reviews = Review.query.all()
    return_data = []
    for review in reviews:
        return_data.append(review)
    return jsonify(return_data)


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

@app.route('/review/<int:id>', methods=['DELETE'])
@token_required
def delete_review(current_user,id):
    review = Review.query.get(id)
    
    if review.user_id != current_user.id and not current_user.admin:
        abort(404,'User not authorized to delete this review.')

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': "Review deleted"})