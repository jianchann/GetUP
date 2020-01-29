<template>
    <div class="signup-login-container p-4">
        <b-tabs align="center">
            <b-tab active>
                <template v-slot:title>
                    <h1>Login</h1>
                </template>
                <form @submit.prevent="logIn()" data-vv-scope="login">
                    <b-form-group
                        label="Email"
                        class="mt-3"
                        :invalid-feedback="errors.first('email', 'login')"
                    >
                        <b-form-input
                            v-validate="'required|email'"
                            v-model="email"
                            name="email"
                            :state="errors.has('email', 'login') ? false : null"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Password"
                        :invalid-feedback="errors.first('password', 'login')"
                    >
                        <b-form-input
                            v-validate="'required'"
                            v-model="password"
                            name="password"
                            :state="
                                errors.has('password', 'login') ? false : null
                            "
                        ></b-form-input>
                    </b-form-group>

                    <b-button
                        variant="secondary"
                        size="large"
                        type="submit"
                        style="float: right"
                        >Login</b-button
                    >
                </form>
            </b-tab>
            <b-tab>
                <template v-slot:title>
                    <h1>Sign Up</h1>
                </template>
                <form @submit.prevent="signUp()" data-vv-scope="signup">
                    <b-form-group
                        label="First Name"
                        class="mt-3"
                        :invalid-feedback="errors.first('first name', 'signup')"
                    >
                        <b-form-input
                            v-validate="'required'"
                            v-model="firstName"
                            name="first name"
                            :state="
                                errors.has('first name', 'signup')
                                    ? false
                                    : null
                            "
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Last Name"
                        :invalid-feedback="errors.first('last name', 'signup')"
                    >
                        <b-form-input
                            v-validate="'required'"
                            v-model="lastName"
                            name="last name"
                            :state="
                                errors.has('last name', 'signup') ? false : null
                            "
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Email"
                        :invalid-feedback="errors.first('email', 'signup')"
                    >
                        <b-form-input
                            v-validate="'required|email'"
                            v-model="email"
                            name="email"
                            :state="
                                errors.has('email', 'signup') ? false : null
                            "
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Password"
                        :invalid-feedback="errors.first('password', 'signup')"
                    >
                        <b-form-input
                            v-validate="'required'"
                            v-model="password"
                            name="password"
                            :state="
                                errors.has('password', 'signup') ? false : null
                            "
                        ></b-form-input>
                    </b-form-group>

                    <b-button
                        variant="secondary"
                        size="large"
                        type="submit"
                        style="float: right"
                        >Sign up</b-button
                    >
                </form>
            </b-tab>
        </b-tabs>
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
<New date> - Jian Chan - Create File, Add all imports

File Creation Date: <New date>
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Authorization (Auth) component for the website
*/
export default {
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null
        };
    },
    methods: {
        /*
        Method Name: signUp
        Creation Date: 
        Purpose: Validate user data then call register_user method from store with data
        Arguments: User data (Object, implicit)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        async signUp() {
            await this.$validator.validateAll("signup").then(result => {
                if (result) {
                    var payload = {
                        password: this.password,
                        email: this.email,
                        first_name: this.firstName,
                        last_name: this.lastName
                    };
                    this.$store
                        .dispatch("register_user", payload)
                        .then(() => {});
                } else {
                }
            });
        },
        /*
        Method Name: logIn
        Creation Date: 
        Purpose: Validate user credentials data then call login_user method from store with data
        Arguments: User data (Object, implicit)
        Required: Vuex store file (implicit by calling this.$store...)
        Return Value: None
        */
        logIn() {
            this.$validator.validateAll("login").then(result => {
                if (result) {
                    var payload = {
                        password: this.password,
                        email: this.email
                    };
                    this.$store.dispatch("login_user", payload).then(() => {});
                } else {
                }
            });
        }
    }
};
</script>

<style></style>
