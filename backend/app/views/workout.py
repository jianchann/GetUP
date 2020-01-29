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
01/21/20 - Jian Chan - Implement and finalize methods for get workout (multiple and single) and add workout
01/22/20 - Hans Santos - Implement and finalize methods for delete workout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the workout model/class
"""

from app import app, db, utils
from app.models import User, Workout, Review

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
Arguments: ID of workout (Int), User requesting workout (Object)
Required: Workout class from database
Return Value: Workout data in json
"""
@app.route('/workout/<int:id>', methods=['GET'])
def get_workout(id):
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
Arguments: User adding workout (Object), request data for the workout (Object, implicit)
Required: Workout class from database
Return Value: Success message in json
"""
@app.route('/workout', methods=['POST'])
def create_workout():
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

    db.session.commit()

    return jsonify({'message': "New workout created."})


"""
Method Name: delete_workout
Creation Date: 01/22/20
Purpose: Delete workout from the database if user is permitted to
Arguments: ID of workout (Int), User deleting workout (Object)
Required: Workout class from database
Return Value: Success message in json
"""
@app.route('/workout/<int:id>', methods=['DELETE'])
def delete_workout(id):
    workout = Workout.query.get(id)
    db.session.delete(workout)
    db.session.commit()

    return jsonify({'message': "Workout deleted"})