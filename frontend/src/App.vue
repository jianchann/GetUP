<template>
  <div id="app">
    <Navbar></Navbar>
    <!-- <transition> -->
    <router-view style="padding-top: 67px" />
    <!-- </transition> -->
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Footer from "@/global/Footer.vue";
import Navbar from "@/global/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Footer,
    Navbar
  },
  methods: {}
};
</script>

<style></style>
