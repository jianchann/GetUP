<template>
    <div v-if="this.workout">
        <img
            :src="getImageUrl(this.workoutImage)"
            style="width: 100%; z-index:0; margin-bottom: -15px; height: 75vh; object-fit: cover"
        />
        <div class="workout-details-container">
            <div class="d-flex justify-content-between">
                <h2>{{ this.workout.title }}</h2>
                <div class="d-flex flex-column" v-if="this.$store.state.admin">
                    <b-button
                        variant="secondary"
                        size="md"
                        v-b-modal.editWorkout
                    >
                        <i class="fas fa-edit"></i>
                    </b-button>
                    <b-button
                        variant="secondary"
                        size="md"
                        v-b-modal.deleteWorkout
                    >
                        <i class="fas fa-trash"></i>
                    </b-button>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <h5>At {{ this.workout.location }}</h5>
                <h5>Level: {{ this.workout.difficulty }}</h5>
            </div>
            <div class="rectangle" />
            <div class="d-flex justify-content-between">
                <div>
                    <h5>Best Times</h5>
                    {{ this.workout.best_times }}
                </div>
                <div>
                    <h5>Duration</h5>
                    <div class="text-right">
                        {{ this.workout.duration }} minutes
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <div>
                    <h5>Materials</h5>
                    {{ this.workout.materials }}
                </div>
                <div>
                    <h5>Minimum Number of Participants</h5>
                    <div class="text-right">
                        {{ this.workout.people_count }} people
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <h5>Instructions</h5>
                {{ this.workout.instructions }}
            </div>
            <div class="rectangle" />
            <div class="d-flex justify-content-between mb-3">
                <h5>Reviews</h5>
                <!-- <b-button variant="light" size="sm" @click="openModal()">
                Add
                </b-button> -->
            </div>
            <div
                v-for="review in this.workout.reviews"
                :key="review.id"
                style="margin-bottom: 10px"
            >
                <b
                    ><div
                        style="margin-left: 15px"
                        class="d-flex justify-content-between"
                    >
                        <div>{{ review.user_first_name }}</div>
                        <div>{{ review.rating }}/5</div>
                    </div></b
                >
                <div
                    style="margin-left: 25px"
                    class="d-flex justify-content-between"
                >
                    {{ review.body }}
                    <b-button
                        v-if="$store.state.admin"
                        variant="secondary"
                        size="sm"
                        @click="deleteReview(review.id)"
                    >
                        <i class="fas fa-trash"></i>
                    </b-button>
                </div>
            </div>
        </div>

        <!-- <b-modal ref="addReview" hide-footer title="Add Review">
      <b-form-group label="Review Body">
        <b-form-input
          required
          v-validate="'required'"
          v-model="reviewBody"
          name="reviewBody"
          :state="errors.has('reviewBody') ? false : null"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Review Rating (out of 5)">
        <b-form-input
          required
          v-validate="'required'"
          v-model="reviewRating"
          name="reviewRating"
          :state="errors.has('reviewRating') ? false : null"
        ></b-form-input>
      </b-form-group>

      <div style="float: right">
        <b-button
          variant="secondary"
          size="large"
          type="submit"
          @click="addReview()"
          >Submit</b-button
        >
      </div>
    </b-modal> -->

        <b-modal
            id="deleteWorkout"
            ref="deleteWorkout"
            hide-footer
            title="Delete this Workout?"
        >
            <div class="d-flex justify-content-around">
                <b-button
                    variant="primary"
                    size="large"
                    @click="$refs.deleteWorkout.hide()"
                    >No</b-button
                >
                <b-button
                    variant="secondary"
                    size="large"
                    type="submit"
                    @click="deleteWorkout()"
                    >Yes</b-button
                >
            </div>
        </b-modal>

        <b-modal
            id="deleteReview"
            ref="deleteReview"
            hide-footer
            title="Delete this Review?"
        >
            <div class="d-flex justify-content-around">
                <b-button
                    variant="primary"
                    size="large"
                    @click="$refs.deleteReview.hide()"
                    >No</b-button
                >
                <b-button
                    variant="secondary"
                    size="large"
                    type="submit"
                    @click="deleteReview()"
                    >Yes</b-button
                >
            </div>
        </b-modal>

        <b-modal
            ref="editWorkout"
            id="editWorkout"
            hide-footer
            title="Update Workout"
        >
            <b-form-group
                label="Title"
                :invalid-feedback="errors.first('title')"
            >
                <b-form-input
                    v-validate="'required'"
                    v-model="workoutTitle"
                    name="title"
                    :state="errors.has('title') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Location"
                :invalid-feedback="errors.first('location')"
            >
                <b-form-input
                    v-validate="'required'"
                    v-model="workoutLocation"
                    name="location"
                    :state="errors.has('location') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Duration (in Mins)"
                :invalid-feedback="errors.first('duration')"
            >
                <b-form-input
                    v-validate="'required|between:1,120'"
                    v-model="workoutDuration"
                    type="number"
                    name="duration"
                    :state="errors.has('duration') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Best Times"
                :invalid-feedback="errors.first('best times')"
            >
                <b-form-input
                    v-validate="'required'"
                    v-model="workoutTimes"
                    name="best times"
                    :state="errors.has('best times') ? false : null"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="Materials"
                :invalid-feedback="errors.first('materials')"
            >
                <b-form-textarea
                    v-validate="'required'"
                    v-model="workoutMaterials"
                    name="materials"
                    rows="2"
                    max-rows="4"
                    :state="errors.has('materials') ? false : null"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group
                label="Difficulty"
                :invalid-feedback="errors.first('difficulty')"
            >
                <b-form-select
                    v-model="workoutDifficulty"
                    :options="difficultyOptions"
                    v-validate="'required'"
                    name="difficulty"
                    :state="errors.has('difficulty') ? false : null"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                label="Minimum Number of Participants"
                :invalid-feedback="errors.first('participant count')"
            >
                <b-form-input
                    v-model="workoutPeople"
                    v-validate="'required|between:1,30'"
                    name="participant count"
                    type="number"
                    :state="errors.has('participant count') ? false : null"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Instructions"
                :invalid-feedback="errors.first('instructions')"
            >
                <b-form-textarea
                    v-model="workoutInstructions"
                    v-validate="'required'"
                    name="instructions"
                    :state="errors.has('instructions') ? false : null"
                    rows="2"
                    max-rows="4"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Status">
                <b-form-select
                    v-model="workoutStatus"
                    :options="statusOptions"
                    name="status"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                label="Image (Skip if will not be updated)"
                :invalid-feedback="errors.first('image')"
                :state="!errors.has('image')"
            >
                <div class="dropZone">
                    <b-form-file
                        accept="image/*"
                        v-model="workoutImage"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        v-validate="'mimes:image/*'"
                        name="image"
                        :state="errors.has('image') ? false : null"
                        id="image_upload"
                        ref="image_upload"
                    ></b-form-file>
                </div>
            </b-form-group>

            <div style="float: right">
                <b-button
                    variant="secondary"
                    size="large"
                    type="submit"
                    @click="editWorkout()"
                    >Submit</b-button
                >
            </div>
        </b-modal>
    </div>
</template>

<script>
/*
Author: Jian Chan, Gab Datiles, Hans Santos

This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020.

Code History:
01/20/20 - Jian Chan - Create File, Add all imports, Fix layout of home page
01/22/20 - Jian Chan - Implement and finalize methods for view workout
01/22/20 - Hans Santos - Implement and finalize methods for delete workout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Workout page to view specific workout
*/

import { mapState } from "vuex";

const Workout = {
    name: "Workout",
    props: {},
    data() {
        return {
            id: null,
            reviewBody: null,
            reviewRating: null,
            currentReview: null,
            workoutTitle: null,
            workoutLocation: null,
            workoutTimes: null,
            workoutMaterials: null,
            workoutDuration: null,
            workoutPeople: null,
            workoutDifficulty: null,
            workoutInstructions: null,
            workoutImage: null,
            workoutStatus: null,
            difficultyOptions: [
                { value: null, text: "Select one", disabled: true },
                { value: "Beginner", text: "Beginner" },
                { value: "Intermediate", text: "Intermediate" },
                { value: "Advanced", text: "Advanced" }
            ],
            statusOptions: [
                { value: "Pending", text: "Pending" },
                { value: "Approved", text: "Approved" }
            ]
        };
    },
    computed: {
        ...mapState(["workout"])
    },
    /*
    Method Name: created
    Creation Date: 01/22/20
    Purpose: Call store method to load workout
    Arguments: None
    Required: Vuex store file (implicit by calling this.$store...), Router (implicit by calling this.$route)
    Return Value: None
    */
    async created() {
        this.id = this.$route.params.id;
        await this.$store.dispatch("read_workout", this.$route.params.id);
        if (this.workout != null) {
            this.workoutTitle = this.workout.title;
            this.workoutLocation = this.workout.location;
            this.workoutTimes = this.workout.best_times;
            this.workoutMaterials = this.workout.materials;
            this.workoutDuration = this.workout.duration;
            this.workoutPeople = this.workout.people_count;
            this.workoutDifficulty = this.workout.difficulty;
            this.workoutInstructions = this.workout.instructions;
            this.workoutStatus = this.workout.status;
            this.workoutImage = this.workout.image;
        } else {
            this.$router.push("/404");
        }
    },
    methods: {
        /*
        Method Name: getImageUrl
        Creation Date: 01/20/22
        Purpose: Parse url (src) of image to be displayed
        Arguments: filename (String, filename of image)
        Required: None
        Return Value: Path to Image
        */
        getImageUrl(filename) {
            if (window.location.href.indexOf("localhost") >= 0) {
                // Development mode
                return "/uploads/" + filename;
            } else {
                return (
                    "https://getup-192.s3-ap-southeast-1.amazonaws.com/" +
                    filename
                );
            }
        },
        /*
        Method Name: addReview
        Creation Date:
        Purpose: Validate review data then call method from store with data
        Arguments: Review data (Object, implicit)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        addReview() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    var lastId;
                    if (this.workout.reviews.length == 0) {
                        lastId = 0;
                    } else {
                        lastId = this.workout.reviews[
                            this.workout.reviews.length - 1
                        ].id;
                    }
                    var review = {
                        id: lastId + 1,
                        username: this.$store.state.admin
                            ? "testAdmin"
                            : "testUser",
                        body: this.reviewBody,
                        rating: this.reviewRating
                    };
                    var payload = {
                        review: review,
                        workoutId: this.id
                    };
                    this.$store.dispatch("createReview", payload);
                    (this.reviewBody = null),
                        (this.reviewRating = null),
                        this.$refs.addReview.hide();
                    this.workouts = this.$store.state.workouts;
                    for (
                        var i = 0;
                        i < this.$store.state.workouts.length;
                        i++
                    ) {
                        if (this.$store.state.workouts[i].id == this.id) {
                            this.workout = this.$store.state.workouts[i];
                            break;
                        }
                    }
                } else {
                }
            });
        },
        /*
        Method Name: openModal
        Creation Date: 
        Purpose: Open modal for adding review
        Arguments: None
        Required: None
        Return Value: None
        */
        openModal() {
            this.$refs.addReview.show();
        },
        /*
        Method Name: deleteReview
        Creation Date:
        Purpose: Delete review
        Arguments: id (Number, id of review to be deleted)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        deleteReview(id) {
            if (id) {
                this.currentReview = id;
                this.$refs.deleteReview.show();
            } else {
                var payload = {
                    reviewId: this.currentReview,
                    workoutId: this.id
                };
                this.$store.dispatch("deleteReview", payload);
                this.workouts = this.$store.state.workouts;
                for (var i = 0; i < this.$store.state.workouts.length; i++) {
                    if (this.$store.state.workouts[i].id == this.id) {
                        this.workout = this.$store.state.workouts[i];
                        break;
                    }
                }
                this.$refs.deleteReview.hide();
            }
        },
        /*
        Method Name: deleteWorkout
        Creation Date:
        Purpose: Delete Workout
        Arguments: id (Number, implicit from data, id of workout to be deleted)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        deleteWorkout() {
            this.$store.dispatch("delete_workout", this.id);
        },
        /*
        Method Name: editWorkout
        Creation Date: 
        Purpose: Validate workout data then call method from store with data
        Arguments: Workout data (Object, implicit)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        editWorkout() {
            this.$validator.validateAll().then(async result => {
                if (result) {
                    var data = new FormData();
                    data.append("title", this.workoutTitle);
                    data.append("location", this.workoutLocation);
                    data.append("duration", this.workoutDuration);
                    data.append("best_times", this.workoutTimes);
                    data.append("materials", this.workoutMaterials);
                    data.append("people_count", this.workoutPeople);
                    data.append("difficulty", this.workoutDifficulty);
                    data.append("instructions", this.workoutInstructions);
                    data.append("status", this.workoutStatus);
                    if (this.workoutImage) {
                        data.append(
                            "file",
                            document.getElementById("image_upload").files[0]
                        );
                    }
                    await this.$store.dispatch("update_workout", {
                        id: this.id,
                        data: data
                    });
                    this.$refs.editWorkout.hide();
                } else {
                }
            });
        },
        /*
        Method Name: approveWorkout
        Creation Date: 
        Purpose: Updates workout to be approved
        Arguments: None
        Required: Existing Workout
        Return Value: None
        */
        approveWorkout() {
            this.workout.approved = true;
            this.$store.dispatch("update", workout);
        }
    }
};

export default Workout;
</script>

<style scoped></style>
