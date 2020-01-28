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
01/22/20 - Hans Santos - Implement and finalize methods for delete workout

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
    admin: localStorage.getItem("admin") ? localStorage.getItem("admin") : false
  },
  mutations: {
    // Auth mutations
    /*
    Method Name: set_admin
    Creation Date: ** for future sprint
    Purpose: Set admin variable in state to new value
    Arguments: state, admin
    Required: None
    Return Value: None
    */
    set_admin(state, admin) {
      state.admin = admin;
    },
    /*
    Method Name: set_token
    Creation Date: ** for future sprint
    Purpose: Set token variable in state to new value
    Arguments: state, token
    Required: None
    Return Value: None
    */
    set_token(state, token) {
      state.token = token;
      state.loggedIn = token ? true : false;
    },
    /*
    Method Name: set_firstName
    Creation Date: ** for future sprint
    Purpose: Set firstName variable in state to new value
    Arguments: state, firstName
    Required: None
    Return Value: None
    */
    set_firstName(state, firstName) {
      state.firstName = firstName;
    },
    // Workout mutations
    /*
    Method Name: set_workouts
    Creation Date: ** for future sprint
    Purpose: Set workouts variable in state to new value
    Arguments: state, workouts
    Required: None
    Return Value: None
    */
    set_workouts(state, workouts) {
      state.workouts = workouts;
    },
    /*
    Method Name: set_workout
    Creation Date: ** for future sprint
    Purpose: Set workout variable in state to new value
    Arguments: state, workout
    Required: None
    Return Value: None
    */
    set_workout(state, workout) {
      state.workout = workout;
    }
  },
  actions: {
    createReview: ({ commit }, payload) => {
      commit("add_review", payload);
    },
    deleteReview: ({ commit }, payload) => {
      commit("remove_review", payload);
    },
    // Workout Actions
    read_workout: async ({ state, commit }, workoutId) => {
      await axios
        .get("/workout/" + workoutId, {
          headers: { "X-Access-Token": state.token }
        })
        .then(response => {
          commit("set_workout", response.data);
        });
    },
    read_workouts: ({ commit }) => {
      axios.get("/workout").then(response => {
        commit("set_workouts", response.data);
      });
    },
    create_workout: ({ state, dispatch }, workoutData) => {
      axios
        .post("/workout", workoutData, {
          headers: { "X-Access-Token": state.token }
        })
        .then(response => {
          dispatch("read_workouts");
        })
        .catch(error => {});
    },
    update_workout: ({ state, commit }, payload) => {
      axios
        .put("/workout/" + payload.id, payload.data, {
          headers: { "X-Access-Token": state.token }
        })
        .then(response => {
          commit("set_workout", response.data);
        })
        .catch(error => {});
    },
    delete_workout: ({ state }, id) => {
      axios
        .delete("/workout/" + id, {
          headers: { "X-Access-Token": state.token }
        })
        .then(response => {
          router.push("/");
        })
        .catch(error => {});
    },
    //
    // User Functions
    //
    register_user: ({ commit, dispatch }, userData) => {
      axios
        .post("/user/register", userData)
        .then(response => {
          commit("set_token", response.data.token);
          commit("set_firstName", response.data.first_name);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstName", response.data.first_name);
        })
        .catch(error => {});
    },
    login_user: ({ commit }, userData) => {
      axios
        .post("/user/login", userData)
        .then(response => {
          commit("set_token", response.data.token);
          commit("set_firstName", response.data.first_name);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstName", response.data.first_name);
        })
        .catch(error => {});
    },
    update_admin: ({ commit }, admin) => {
      commit("set_admin", admin);
    },
    logout_user: ({ commit }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      commit("set_token", null);
      commit("set_firstName", "");
      commit("set_admin", false);
    }
  }
});
