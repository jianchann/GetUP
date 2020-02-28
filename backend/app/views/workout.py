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
02/04/20 - Gab Datiles - Implement protecting of API routes from non-authenticated users
02/17/20 - Jian Chan - Implement and finalize methods for edit workout
02/18/20 - Hans Santos - Implement fetching of reviews together with workout data


File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Controller for all API calls related to the workout model/class
"""

from app import app, db, utils
from app.models import User, Workout, Review
from app.auth_helpers import token_required

import requests
import datetime
from flask import Flask, jsonify, g, render_template, redirect, request, abort
from werkzeug.utils import secure_filename
import os
import uuid
import boto3

"""
Method Name: get_workouts
Creation Date: 01/21/20
Purpose: Get all workouts
Arguments: User requesting workouts (Object)
Required: Workout class from database
Return Value: List of all workouts in json
"""
@app.route('/workout', methods=['GET'])
@token_required
def get_workouts(current_user):
    workouts = Workout.query.all()
    return_data = []
    for workout in workouts:
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
        })
    return jsonify(return_data)

"""
Method Name: get_workout
Creation Date: 01/21/20
Purpose: Get specific workout
Arguments: User requesting workout (Object), ID of workout (Int)
Required: Workout class from database, token_required from auth_helpers (to protect route)
Return Value: Workout data in json
"""
@app.route('/workout/<int:id>', methods=['GET'])
@token_required
def get_workout(current_user, id):
    try:
        workout = Workout.query.get(id)
        review_data = []
        for review in workout.reviews:
            review_data.append({
                "id": review.id,
                "body": review.body,
                "rating": review.rating,
                "user_first_name": review.user.first_name,
                "user_id": review.user.id
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
    except:
        return 'Workout does not exist.', 404

"""
Method Name: create_workout
Creation Date: 01/21/20
Purpose: Add workout to the database
Arguments: User adding workout (Object), request data for the workout (Object, implicit)
Required: Workout class from database, token_required from auth_helpers (to protect route)
Return Value: Success message in json
"""
@app.route('/workout', methods=['POST'])
@token_required
def create_workout(current_user):
    # if not current_user.admin:
    #     return 'User not allowed to create workout.', 403

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

    try:
        os.environ["POSTGRES_URL"]
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], newFileName))
    except:
        # S3 Bucket
        s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY"],
        aws_secret_access_key=os.environ["AWS_SECRET_KEY"]
        )
        bucket_resource = s3

        file.save(newFileName)
        bucket_resource.upload_file(
            Bucket = "getup-192",
            Filename=newFileName,
            Key=newFileName
        )

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
Creation Date: 02/17/20
Purpose: Update specific workout from the database
Arguments: User updating workout (Object), ID of workout (Int), request data for the workout (Object, implicit)
Required: Workout class from database, token_required from auth_helpers (to protect route)
Return Value: Updated workout data in json
"""
@app.route('/workout/<int:id>', methods=['PUT'])
@token_required
def update_workout(current_user,id):
    # if not current_user.admin:
    #     return 'User not allowed to update workout.', 403

    workout = Workout.query.get(id)
    
    post_data = request.form
    workout.title = post_data.get('title')
    workout.location = post_data.get('location')
    workout.best_times = post_data.get('best_times')
    workout.duration = post_data.get('duration')
    workout.materials = post_data.get('materials')
    workout.difficulty = post_data.get('difficulty')
    workout.people_count = post_data.get('people_count')
    workout.instructions = post_data.get('instructions')
    workout.status = post_data.get('status')

    file = request.files.get('file')
    
    if file:
        filename = secure_filename(file.filename)
        fileExt = filename.split('.')[-1]
        autoGenFileName = uuid.uuid4()
        newFileName = str(autoGenFileName) + '.' + fileExt

        try:
            os.environ["POSTGRES_URL"]
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], newFileName))
        except:
            # S3 Bucket
            s3 = boto3.client(
            "s3",
            aws_access_key_id="AKIAIWHTYSPQ34XT2QFQ",
            aws_secret_access_key="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"
            )
            bucket_resource = s3

            file.save(newFileName)
            bucket_resource.upload_file(
                Bucket = "getup-192",
                Filename=newFileName,
                Key=newFileName
            )

        workout.image = newFileName

    db.session.commit()

    review_data = []
    for review in workout.reviews:
        review_data.append({
            "id": review.id,
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
Purpose: Delete workout from the database if user is permitted to
Arguments: ID of workout (Int), User deleting workout (Object)
Required: Workout class from database, token_required from auth_helpers (to protect route)
Return Value: Success message in json
"""
@app.route('/workout/<int:id>', methods=['DELETE'])
@token_required
def delete_workout(current_user,id):
    # if not current_user.admin:
    #     return 'User not allowed to delete workout.', 403

    try:
        workout = Workout.query.get(id)
        db.session.delete(workout)
        db.session.commit()
    except:
        return 'Workout not found', 404

    return jsonify({'message': "Workout deleted"})