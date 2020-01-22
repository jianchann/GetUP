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
    add_review(state, data) {
      var review = data.review;
      var workoutId = data.workoutId;
      for (var i = 0; i < state.workouts.length; i++) {
        if (state.workouts[i].id != workoutId) {
          continue;
        }
        state.workouts[i].reviews.push(review);
        break;
      }
    },
    remove_review(state, data) {
      var reviewId = data.reviewId;
      var workoutId = data.workoutId;
      var newReviews = [];
      for (var i = 0; i < state.workouts.length; i++) {
        if (state.workouts[i].id != workoutId) {
          continue;
        }
        for (var j = 0; j < state.workouts[i].reviews.length; j++) {
          if (state.workouts[i].reviews[j].id != reviewId) {
            newReviews.push(state.workouts[i].reviews[j]);
          }
        }
        state.workouts[i].reviews = newReviews;
        break;
      }
    },
    //
    // User mutations
    //
    set_admin(state, admin) {
      state.admin = admin;
    },
    set_token(state, token) {
      state.token = token;
      state.loggedIn = token ? true : false;
    },
    set_firstName(state, firstName) {
      state.firstName = firstName;
    },
    //
    // Workout mutations
    //
    set_workouts(state, workouts) {
      state.workouts = workouts;
    },
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
    //
    // Workout Functions
    //
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
