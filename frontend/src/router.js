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

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Defines routes/url for all pages in website
*/

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
