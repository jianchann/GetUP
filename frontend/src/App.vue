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
import Footer from "@/global/Footer.vue";
import Navbar from "@/global/Navbar.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {};
    },
    components: {
        Footer,
        Navbar
    },
    methods: {},
    /*
    Method Name: created
    Creation Date: ** for future sprint
    Purpose: Check if user is admin on first load of page then call update_admin from store
    Arguments: None
    Required: Vuex store file (implicit by calling this.$store...), JwtDecode (to decode JWT)
    Return Value: None
    */
    created() {
        var token = this.$store.state.token;
        var decodedToken = this.$store.state.token
            ? this.JwtDecode(this.$store.state.token)
            : "";
        var admin = decodedToken ? decodedToken.admin : false;
        this.$store.dispatch("update_admin", admin);
    },
    computed: {
        ...mapState(["loggedIn"])
    },
    watch: {
        /*
        Method Name: loggedIn
        Creation Date: ** for future sprint
        Purpose: Watch value of loggedIn variable if it changes
        Arguments: Old value and new value of loggedIn (Boolean)
        Required: Vuex store file (implicit by calling this.$store...), JwtDecode (to decode JWT) 
        Return Value: None
        */
        loggedIn(newValue, oldValue) {
            if (newValue) {
                this.$store.dispatch("read_workouts");
            }
            var token = this.$store.state.token;
            var decodedToken = this.$store.state.token
                ? this.JwtDecode(this.$store.state.token)
                : "";
            console.log(decodedToken);
            var admin = decodedToken ? decodedToken.admin : false;
            this.$store.dispatch("update_admin", admin);
        }
    }
};
</script>

<style></style>
