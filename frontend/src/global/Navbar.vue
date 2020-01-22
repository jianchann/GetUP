<template>
  <div style="position: fixed; width: 100%; z-index: 10">
    <b-navbar
      toggleable="md"
      variant="info"
      type="light"
      style="height: 85px; border-radius: 0 0 15px 15px;"
    >
      <b-navbar-brand style="width: 100%" class="d-flex justify-content-center">
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
      <b-button variant="primary" size="md" @click="logOut()">Logout</b-button>
    </div>
  </div>
</template>

<script>
const Navbar = {
  name: "Navbar",
  created() {
    var token = this.$store.state.token;
    var decodedToken = this.$store.state.token
      ? this.JwtDecode(this.$store.state.token)
      : "";
    var admin = decodedToken ? decodedToken.admin : false;
    this.$store.dispatch("update_admin", admin);
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout_user");
    }
  }
};

export default Navbar;
</script>

<style scoped></style>
