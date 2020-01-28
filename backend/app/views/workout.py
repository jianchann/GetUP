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
01/21/20 - Jian Chan - Implement and finalize methods for view workout (multiple and single) and add workout
01/22/20 - Hans Santos - Implement and finalize methods for delete workout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the workout model/class
"""

from app import app, db, redis_store, utils
from app.models import User, Workout, Review
from app.auth_helpers import token_required

import requests
import datetime
from flask import Flask, jsonify, g, render_template, redirect, request, abort
from werkzeug.utils import secure_filename
import os
import uuid

"""
Method Name: get_workouts
Creation Date: 01/21/20
Purpose: Get all workouts
Arguments: None
Required: Workout class from database
Return Value: List of all workouts in json
"""
@app.route('/workout', methods=['GET'])
# @token_required
def get_workouts():
    workouts = Workout.query.all()
    return_data = []
    for workout in workouts:
        review_data = []
        for review in workout.reviews:
            review_data.append({
                "body": review.body,
                "rating": review.rating,
                "user_first_name": review.user.first_name
            })
        return_data.append({
            "id": workout.id,
            "title": workout.title,
            "location": workout.location,
            "best_times": workout.best_times,
            "duration": workout.duration,
            "materials": workout.materials,
            "difficulty": workout.difficulty,
            "people_count": workout.people_count,
            "instructions": workout.instructions,
            "status": workout.status,
            "image": workout.image,
            "reviews": review_data
        })
    return jsonify(return_data)

"""
Method Name: get_workout
Creation Date: 01/21/20
Purpose: Get specific workouts
Arguments: ID of workout, User requesting workout
Required: Workout class from database, token_required from auth_helpers.py
Return Value: Workout data in json
"""
@app.route('/workout/<int:id>', methods=['GET'])
@token_required
def get_workout(current_user, id):
    workout = Workout.query.get(id)
    review_data = []
    for review in workout.reviews:
        review_data.append({
            "body": review.body,
            "rating": review.rating,
            "user_first_name": review.user.first_name
        })
    return_data = {
        "id": workout.id,
        "title": workout.title,
        "location": workout.location,
        "best_times": workout.best_times,
        "duration": workout.duration,
        "materials": workout.materials,
        "difficulty": workout.difficulty,
        "people_count": workout.people_count,
        "instructions": workout.instructions,
        "status": workout.status,
        "image": workout.image,
        "reviews": review_data
    }
    return jsonify(return_data)

"""
Method Name: create_workout
Creation Date: 01/21/20
Purpose: Add workout to the database
Arguments: User adding workout, request data for the workout (implicit)
Required: Workout class from database, token_required from auth_helpers.py
Return Value: Success message in json
"""
@app.route('/workout', methods=['POST'])
@token_required
def create_workout(current_user):
    if not current_user.admin:
        abort(403,'User not allowed to create workout.')

    post_data = request.form
    title = post_data.get('title')
    location = post_data.get('location')
    best_times = post_data.get('best_times')
    duration = post_data.get('duration')
    materials = post_data.get('materials')
    difficulty = post_data.get('difficulty')
    people_count = post_data.get('people_count')
    instructions = post_data.get('instructions')
    status = post_data.get('status')

    file = request.files['file']
    filename = secure_filename(file.filename)

    # Gen GUUID File Name
    fileExt = filename.split('.')[-1]
    autoGenFileName = uuid.uuid4()

    newFileName = str(autoGenFileName) + '.' + fileExt

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], newFileName))

    workout = Workout(
        title = title,
        location = location,
        best_times = best_times,
        duration = duration,
        materials = materials,
        difficulty = difficulty,
        people_count = people_count,
        instructions = instructions,
        status = status,
        image = newFileName
    )

    db.session.add(workout)
    current_user.workouts.append(workout)

    db.session.commit()

    return jsonify({'message': "New workout created."})

"""
Method Name: update_workout
Creation Date: ** for future sprint
Purpose: Update specific workout from the database
Arguments: ID of workout, User updating workout, request data for the workout (implicit)
Required: Workout class from database, token_required from auth_helpers.py
Return Value: Success message in json
"""
@app.route('/workout/<int:id>', methods=['PUT'])
@token_required
def update_workout(current_user,id):
    if not current_user.admin:
        # user is not admin
        abort(403,'User not allowed to update workout.')

    workout = Workout.query.get(id)
    
    print(request)
    post_data = request.form
    workout.title = post_data.get('title')
    workout.location = post_data.get('location')
    workout.best_times = post_data.get('best_times')
    workout.duration = post_data.get('duration')
    workout.materials = post_data.get('materials')
    workout.difficulty = post_data.get('difficulty')
    workout.people_count = post_data.get('people_count')
    instructions = post_data.get('instructions')
    workout.status = post_data.get('status')

    file = request.files.get('file')
    
    if file:
        filename = secure_filename(file.filename)
        fileExt = filename.split('.')[-1]
        autoGenFileName = uuid.uuid4()
        newFileName = str(autoGenFileName) + '.' + fileExt
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], newFileName))

        workout.image = newFileName

    db.session.commit()

    review_data = []
    for review in workout.reviews:
        review_data.append({
            "body": review.body,
            "rating": review.rating,
            "user_first_name": review.user.first_name
        })
    return_data = {
        "id": workout.id,
        "title": workout.title,
        "location": workout.location,
        "best_times": workout.best_times,
        "duration": workout.duration,
        "materials": workout.materials,
        "difficulty": workout.difficulty,
        "people_count": workout.people_count,
        "instructions": workout.instructions,
        "status": workout.status,
        "image": workout.image,
        "reviews": review_data
    }
    return jsonify(return_data)

"""
Method Name: delete_workout
Creation Date: 01/22/20
Purpose: Delete workout from the database
Arguments: ID of workout, User deleting workout
Required: Workout class from database, token_required from auth_helpers.py
Return Value: Success message in json
"""
@app.route('/workout/<int:id>', methods=['DELETE'])
@token_required
def delete_workout(current_user,id):
    if not current_user.admin:
        abort(403,'User not allowed to delet workout.')

    workout = Workout.query.get(id)
    db.session.delete(workout)
    db.session.commit()

    return jsonify({'message': "Workout deleted"})