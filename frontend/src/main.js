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
01/20/20 - Jian Chan - Create File and add all imports

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Main JavaScript file that handles and mounts all imports for the frontend
*/

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tabs, Tab } from "vue-tabs-component";
Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

import AOS from "aos";
import "aos/dist/aos.css";

import VeeValidate from "vee-validate";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import JwtDecode from "jwt-decode";
Vue.prototype.JwtDecode = JwtDecode;

// import VueAgile from 'vue-agile';

// Vue.use(VueAgile);

Vue.use(BootstrapVue);
Vue.use(VeeValidate, { fieldsBagName: "veeFields" });

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import "./assets/sass/custom.scss";

AOS.init();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
