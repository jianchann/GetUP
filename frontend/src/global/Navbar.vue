<template>
    <div style="position: fixed; width: 100%; z-index: 10">
        <b-navbar
            toggleable="md"
            variant="info"
            type="light"
            style="height: 85px; border-radius: 0 0 15px 15px;"
        >
            <b-navbar-brand
                style="width: 100%"
                class="d-flex justify-content-center"
            >
                <b-link to="/" class="navbar-item">
                    <b-img
                        :src="require(`@/assets/images/getuplogo.png`)"
                        fluid
                        alt="GetUP Logo"
                        style="max-height:50px; margin-left: 10px"
                        class="filter-white"
                    ></b-img>
                </b-link>
            </b-navbar-brand>

            <!-- <b-navbar-toggle style="margin-top: -50px;"
        target="nav-collapse"
      ></b-navbar-toggle> -->
            <div v-if="this.$route.name != 'Workout'"></div>
            <!-- for align right -->
            <b-button
                v-if="this.$route.name == 'Workout'"
                style="margin-top: -50px; float: left"
                class="d-md-none"
                variant="secondary"
                size="md"
                @click="$router.push('/')"
                ><i class="fas fa-arrow-left fa-3x"></i
            ></b-button>
            <div
                style="margin-top: -50px; float: right"
                class="d-flex flex-column align-items-center d-md-none"
                v-if="loggedIn"
            >
                <h6 class="text-white p-0 mb-2">
                    <i class="fas fa-user"></i>
                    {{ this.$store.state.firstName }}
                </h6>
                <b-button variant="primary" size="md" @click="logOut()"
                    >Logout</b-button
                >
            </div>
        </b-navbar>
        <b-button
            v-if="this.$route.name == 'Workout'"
            style="margin-top: -65px; float: left; z-index: 2; position: relative; margin-left: 10px;"
            class="d-none d-md-flex"
            variant="secondary"
            size="md"
            @click="$router.push('/')"
            ><i class="fas fa-arrow-left fa-3x"></i
        ></b-button>
        <div
            style="margin-top: -65px; margin-right: 10px; float: right; z-index: 2; position: relative;"
            class="flex-column align-items-center d-none d-md-flex"
            v-if="this.$store.state.loggedIn"
        >
            <h6 class="text-white p-0 mb-2">
                <i class="fas fa-user"></i>
                {{ this.$store.state.firstName }}
            </h6>
            <b-button variant="primary" size="md" @click="logOut()"
                >Logout</b-button
            >
        </div>
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
02/04/20 - Hans Santos - Implement logout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Home page for all workouts
*/

import { mapState } from "vuex";

const Navbar = {
    name: "Navbar",
    methods: {
        /*
        Method Name: logOut
        Creation Date: 02/04/20
        Purpose: Call logout_user method from store
        Arguments: None
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        logOut() {
            this.$store.dispatch("logout_user");
        }
    },
    computed: {
        ...mapState(["loggedIn"])
    }
};

export default Navbar;
</script>

<style scoped></style>
