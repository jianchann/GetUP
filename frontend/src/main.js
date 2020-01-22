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

// Vue.use(Buefy, {
//   defaultIconPack: 'fa'
// });

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// require('./assets/sass/main.scss');
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./assets/sass/custom.scss";

AOS.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
