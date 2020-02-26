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
02/04/20 - Jian Chan - Implement and finalize method for register user
02/04/20 - Hans Santos - Implement and finalize method for login and logout
02/17/20 - Jian Chan - Implement and finalize method for update workout
02/18/20 - Gab Datiles - Implement and finalize method for create review

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
        workout: null,
        token: localStorage.getItem("token"),
        firstName: localStorage.getItem("firstName"),
        loggedIn: localStorage.getItem("token") ? true : false,
        admin: localStorage.getItem("admin")
            ? localStorage.getItem("admin")
            : false
    },
    mutations: {
        // Auth mutations
        /*
        Method Name: set_admin
        Creation Date: ** for future sprint
        Purpose: Set admin variable in state to new value
        Arguments: state (Object), admin (Boolean)
        Required: None
        Return Value: None
        */
        set_admin(state, admin) {
            state.admin = admin;
        },
        /*
        Method Name: set_token
        Creation Date: 02/04/20
        Purpose: Set token variable in state to new value
        Arguments: state (Object), token (String)
        Required: None
        Return Value: None
        */
        set_token(state, token) {
            state.token = token;
            state.loggedIn = token ? true : false;
        },
        /*
        Method Name: set_firstName
        Creation Date: 02/04/20
        Purpose: Set firstName variable in state to new value
        Arguments: state (Object), firstName (String)
        Required: None
        Return Value: None
        */
        set_firstName(state, firstName) {
            state.firstName = firstName;
        },
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
        // Review Actions
        /*
        Method Name: create_review
        Creation Date: 02/18/22
        Purpose: Submit new review to backend. Then, read workout again from backend and call set_workout mutation.
        Arguments: {state (Object), commit (Function)} (from store), reviewData (Object, data of new review)
        Required: axios
        Return Value: axios Promise
        */
        create_review: async ({ state, commit }, reviewData) => {
            return await axios
                .post("/review", reviewData, {
                    headers: { "X-Access-Token": state.token }
                })
                .then(async response => {
                    return await axios
                        .get("/workout/" + reviewData.workout_id, {
                            headers: { "X-Access-Token": state.token }
                        })
                        .then(response => {
                            commit("set_workout", response.data);
                        })
                        .catch(error => {});
                })
                .catch(error => {});
        },
        // Workout Actions
        /*
        Method Name: read_workout
        Creation Date: 01/22/22
        Purpose: Read specific workout from backend, and call set_workout mutation
        Arguments: {state (Object), commit (Function)} (from store), workoutId (Number, ID of workout)
        Required: axios
        Return Value: axios Promise
        */
        read_workout: async ({ state, commit }, workoutId) => {
            commit("set_workout", null);
            return await axios
                .get("/workout/" + workoutId, {
                    headers: { "X-Access-Token": state.token }
                })
                .then(response => {
                    commit("set_workout", response.data);
                })
                .catch(error => {});
        },
        /*
        Method Name: read_workouts
        Creation Date: 01/22/22
        Purpose: Read workouts from backend, and call set_workouts mutation
        Arguments: {state (Object), commit (Function)} (from store)
        Required: axios
        Return Value: axios Promise
        */
        read_workouts: async ({ state, commit }) => {
            return await axios
                .get("/workout", {
                    headers: { "X-Access-Token": state.token }
                })
                .then(response => {
                    commit("set_workouts", response.data);
                });
        },
        /*
        Method Name: create_workout
        Creation Date: 01/22/22
        Purpose: Submit new workout to backend, and call read_workouts mutation
        Arguments: {state (Object), dispatch (Function)} (from store), workoutData (Object, data of new workout)
        Required: axios
        Return Value: Promise
        */
        create_workout: async ({ state, dispatch }, workoutData) => {
            return await axios
                .post("/workout", workoutData, {
                    headers: { "X-Access-Token": state.token }
                })
                .then(response => {
                    dispatch("read_workouts");
                })
                .catch(error => {});
        },
        /*
        Method Name: update_workout
        Creation Date: 02/17/20
        Purpose: Submit updated workout data to backend, and call set_workout mutation
        Arguments: {state (Object), commit (Function)} (from store), workoutData (Object, Updated workout data)
        Required: axios
        Return Value: axios Promise
        */
        update_workout: async ({ state, commit }, workoutData) => {
            return await axios
                .put("/workout/" + workoutData.id, workoutData.data, {
                    headers: { "X-Access-Token": state.token }
                })
                .then(response => {
                    commit("set_workout", response.data);
                })
                .catch(error => {});
        },
        /*
        Method Name: delete_workout
        Creation Date: 01/22/22
        Purpose: Submit ID of workout to be deleted to the backend then route page to home page
        Arguments: {state} (Object, from store), workoutId (Number, ID of workout)
        Required: axios
        Return Value: axios Promise
        */
        delete_workout: async ({ state }, workoutId) => {
            return await axios
                .delete("/workout/" + workoutId, {
                    headers: { "X-Access-Token": state.token }
                })
                .then(response => {
                    router.push("/");
                })
                .catch(error => {});
        },
        // Auth Actions
        /*
        Method Name: register_user
        Creation Date: 02/04/20
        Purpose: Submit user data to the backend then call set_token and set_firstName mutations
        Arguments: {commit} (Function, from store), userData (Object, data of new user)
        Required: axios, router
        Return Value: axios Promise
        */
        register_user: async ({ commit }, userData) => {
            return await axios
                .post("/user/register", userData)
                .then(response => {
                    commit("set_token", response.data.token);
                    commit("set_firstName", response.data.first_name);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("firstName", response.data.first_name);
                })
                .catch(error => {
                    throw error.response;
                });
        },
        /*
        Method Name: login_user
        Creation Date: 02/04/20
        Purpose: Submit user credentials to the backend and if login succeeds, then call set_token and set_firstName mutations
        Arguments: {commit} (Function, from store), userData (Object, data of user credentials)
        Required: axios
        Return Value: Promise
        */
        login_user: async ({ commit }, userData) => {
            return await axios
                .post("/user/login", userData)
                .then(response => {
                    commit("set_token", response.data.token);
                    commit("set_firstName", response.data.first_name);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("firstName", response.data.first_name);
                })
                .catch(error => {
                    throw error.response;
                });
        },
        /*
        Method Name: logout_user
        Creation Date: 02/04/20
        Purpose: Log user out by removing JWT and call set_token, set_firstName, and set_admin mutations
        Arguments: {commit} (Function from store)
        Required: router
        Return Value: None
        */
        logout_user: ({ commit }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("firstName");
            commit("set_token", null);
            commit("set_firstName", "");
            commit("set_admin", false);
            router.push("/");
            return;
        },
        /*
        Method Name: update_admin
        Creation Date: ** for future sprint
        Purpose: Call set_admin mutation with new admin value
        Arguments: {commit} (Function from store), admin (Boolean, if logged in user is an admin)
        Required: None
        Return Value: None
        */
        update_admin: ({ commit }, admin) => {
            commit("set_admin", admin);
        }
    }
});
