<template>
    <div class="home">
        <Header />

        <div v-if="loggedIn">
            <div class="mt-5 ml-3 mr-3">
                <div class="d-flex justify-content-between">
                    <h1>Workouts</h1>
                    <!-- <b-button variant="secondary" size="md" @click="openModal()">{{
            this.$store.state.admin ? "Add Workout" : "Suggest Workout"
          }}</b-button> -->
                    <!-- <b-button
                        v-if="this.$store.state.admin"
                        variant="secondary"
                        size="md"
                        @click="openModal()"
                    >
                        Add Workout
                    </b-button> -->
                    <b-button
                        v-if="$store.state.admin"
                        variant="secondary"
                        size="md"
                        @click="openModal()"
                    >
                        Add Workout
                    </b-button>
                </div>

                <div class="container-fluid">
                    <div class="row flex-row flex-nowrap overflow-auto">
                        <div v-for="workout in this.workouts" :key="workout.id">
                            <Card
                                v-if="workout.status == 'Approved'"
                                :big="true"
                                :img="workout.image"
                                :title="workout.title"
                                :location="workout.location"
                                @click.native="gotoPage('workouts', workout.id)"
                            >
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="this.$store.state.admin" class="mt-5 ml-3 mr-3">
                <div class="d-flex justify-content-between">
                    <h1>Suggested Workouts</h1>
                </div>
                <div class="container-fluid">
                    <div class="row flex-row flex-nowrap overflow-auto">
                        <div v-for="workout in this.workouts" :key="workout.id">
                            <Card
                                v-if="workout.status == 'Pending'"
                                :big="false"
                                :img="workout.image"
                                :title="workout.title"
                                @click.native="gotoPage('workouts', workout.id)"
                            >
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <b-modal ref="addWorkout" hide-footer title="New Workout">
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
                        v-validate="'required|integer|between:1,180'"
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
                        v-validate="'required|integer|between:1,60'"
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
                    label="Image"
                    :invalid-feedback="errors.first('image')"
                    :state="!errors.has('image')"
                >
                    <div class="dropZone">
                        <b-form-file
                            accept="image/*"
                            v-model="workoutImage"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            v-validate="'required|mimes:image/*'"
                            name="image"
                            :state="errors.has('image') ? false : null"
                            id="image_upload"
                            ref="image_upload"
                        ></b-form-file>
                    </div>
                </b-form-group>

                <div v-if="$store.state.admin" style="float: right">
                    <!-- <b-button
                        variant="primary"
                        size="large"
                        type="submit"
                        @click="addWorkoutSuggestion()"
                        >Submit as suggestion</b-button
                    > -->
                    <b-button
                        variant="secondary"
                        size="large"
                        type="submit"
                        @click="addWorkout()"
                        >Submit</b-button
                    >
                </div>
                <div v-else style="float: right">
                    <b-button
                        variant="secondary"
                        size="large"
                        type="submit"
                        @click="addWorkout()"
                        >Submit</b-button
                    >
                </div>
            </b-modal>
        </div>
        <div v-else class="d-flex justify-content-center mt-4">
            <Auth></Auth>
        </div>
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
01/22/20 - Jian Chan - Implement and finalize methods for view workouts, add workout, and HTML display
01/22/20 - Gab Datiles - Implement only add workout available if no workout exists
02/04/20 - Gab Datiles - Implement reactive behavior of component when user logs in or logs out
03/02/20 - Jian Chan - Implement and finalize handling of user roles (only admins can add workouts and view pending workouts)

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Home page for all workouts
*/
import Header from "@/pages/Home/Components/Header.vue";
import Card from "@/global/Card.vue";
import Auth from "@/pages/Home/Components/Auth.vue";
import { mapState } from "vuex";

export default {
    name: "home",
    components: { Header, Card, Auth },
    data() {
        return {
            workoutTitle: null,
            workoutLocation: null,
            workoutTimes: null,
            workoutMaterials: null,
            workoutDuration: null,
            workoutPeople: null,
            workoutDifficulty: null,
            workoutInstructions: null,
            workoutImage: null,
            workoutStatus: "Pending",
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
    methods: {
        /*
        Method Name: gotoPage
        Creation Date: 01/20/20
        Purpose: Route url to specific page
        Arguments: Path of page (String), ID for specific page (Number)
        Required: None
        Return Value: None
        */
        gotoPage(path, id) {
            this.$router.push("/" + path + "/" + id);
        },
        /*
        Method Name: openModal
        Creation Date: 01/22/20
        Purpose: Open modal for adding workout
        Arguments: None
        Required: None
        Return Value: None
        */
        openModal() {
            this.$refs.addWorkout.show();
        },
        /*
        Method Name: addWorkout
        Creation Date: 01/22/20
        Purpose: Validate workout data then call method from store with data
        Arguments: Workout data (Object, implicit)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        addWorkout() {
            this.$validator.validateAll().then(async result => {
                if (result) {
                    let loader = this.$loading.show();
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
                    data.append(
                        "file",
                        document.getElementById("image_upload").files[0]
                    );
                    await this.$store
                        .dispatch("create_workout", data)
                        .then(() => {});
                    loader.hide();
                    this.$refs.addWorkout.hide();
                } else {
                }
            });
        }
    },
    computed: {
        ...mapState(["workouts", "loggedIn"])
    },
    /*
    Method Name: created
    Creation Date: 01/22/20
    Purpose: Call store method to load workouts
    Arguments: None
    Required: Vuex store file (implicit by calling this.$store...)
    Return Value: None
    */
    async created() {
        if (this.$store.state.loggedIn) {
            let loader = this.$loading.show();
            await this.$store.dispatch("read_workouts");
            loader.hide();
        }
    }
};
</script>
<style></style>
