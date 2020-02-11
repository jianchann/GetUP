<template>
    <div v-if="this.workout">
        <img
            :src="getImageUrl(this.workout.image)"
            style="width: 100%; z-index:0; margin-bottom: -15px; height: 75vh; object-fit: cover"
        />
        <div class="workout-details-container">
            <div class="d-flex justify-content-between">
                <h2>{{ this.workout.title }}</h2>
                <!-- <div class="d-flex flex-column" v-if="this.$store.state.admin"> -->
                <div class="d-flex flex-column">
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
        </div>

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
            if (
                window.location.href.indexOf("localhost") >= 0 ||
                window.location.href.indexOf("0.0.0.0") >= 0
            ) {
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
        Method Name: deleteWorkout
        Creation Date: 01/22/20
        Purpose: Delete Workout
        Arguments: id (Number, implicit from data, id of workout to be deleted)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        deleteWorkout() {
            this.$store.dispatch("delete_workout", this.id);
        }
    }
};

export default Workout;
</script>

<style scoped></style>
