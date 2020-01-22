import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home/Home.vue";
import NotFound from "@/global/NotFound.vue";
import Workout from "@/pages/Workout/Workout.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: '/dist/',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/workouts/:id",
      name: "Workout",
      component: Workout
    },
    {
      path: "/404",
      alias: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
