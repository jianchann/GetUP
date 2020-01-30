<template>
    <div id="app">
        <Navbar></Navbar>
        <!-- <transition> -->
        <router-view style="padding-top: 67px" />
        <!-- </transition> -->
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
01/20/20 - Jian Chan - Create File, Add all imports
01/22/20 - Gab Datiles - Fix and finalize layout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Parent/master component for all pages in website
*/
import Navbar from "@/global/Navbar.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {};
    },
    components: {
        Navbar
    },
    methods: {}
};
</script>

<style></style>
