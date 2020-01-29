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
01/20/20 - Jian Chan - Create File, Add all imports
01/22/20 - Jian Chan - Implement and finalize methods for view workout/s and add workout
01/22/20 - Hans Santos - Implement and finalize method for delete workout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Store for entire frontend (storage of data that persists, handle API calls to backend)
*/

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        workouts: null,
        workout: null
    },
    mutations: {
        // Workout mutations
        /*
        Method Name: set_workouts
        Creation Date: 01/22/20
        Purpose: Set workouts variable in state to new value
        Arguments: state (Object), workouts (Array)
        Required: None
        Return Value: None
        */
        set_workouts(state, workouts) {
            state.workouts = workouts;
        },
        /*
        Method Name: set_workout
        Creation Date: 01/22/20
        Purpose: Set workout variable in state to new value
        Arguments: state (Object), workout (Object)
        Required: None
        Return Value: None
        */
        set_workout(state, workout) {
            state.workout = workout;
        }
    },
    actions: {
        // Workout Actions
        /*
        Method Name: read_workout
        Creation Date: 01/22/22
        Purpose: Read specific workout from backend, and call set_workout mutation
        Arguments: {commit (Function)} (from store), workoutId (Number, ID of workout)
        Required: axios
        Return Value: None
        */
        read_workout: async ({ commit }, workoutId) => {
            await axios.get("/workout/" + workoutId, {}).then(response => {
                commit("set_workout", response.data);
            });
        },
        /*
        Method Name: read_workouts
        Creation Date: 01/22/22
        Purpose: Read workouts from backend, and call set_workouts mutation
        Arguments: {commit} (Function, from store)
        Required: axios
        Return Value: None
        */
        read_workouts: ({ commit }) => {
            axios.get("/workout").then(response => {
                commit("set_workouts", response.data);
            });
        },
        /*
        Method Name: create_workout
        Creation Date: 01/22/22
        Purpose: Submit new workout to backend, and call read_workouts mutation
        Arguments: {dispatch (Function)} (from store), workoutData (Object, data of new workout)
        Required: axios
        Return Value: None
        */
        create_workout: ({ state, dispatch }, workoutData) => {
            axios
                .post("/workout", workoutData, {})
                .then(response => {
                    dispatch("read_workouts");
                })
                .catch(error => {});
        },
        /*
        Method Name: delete_workout
        Creation Date: 01/22/22
        Purpose: Submit ID of workout to be deleted to the backend then route page to home page
        Arguments: workoutId (Number, ID of workout)
        Required: axios
        Return Value: None
        */
        delete_workout: ({}, workoutId) => {
            console.log(workoutId);
            axios
                .delete("/workout/" + workoutId, {})
                .then(response => {
                    router.push("/");
                })
                .catch(error => {});
        }
    }
});
