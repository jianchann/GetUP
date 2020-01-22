<template>
  <div class="home">
    <!-- hero -->
    <HomeHero></HomeHero>

    <div v-if="loggedIn">
      <div class="mt-5 ml-3 mr-3">
        <div class="d-flex justify-content-between">
          <h1>Workouts</h1>
          <!-- <b-button variant="secondary" size="md" @click="openModal()">{{
            this.$store.state.admin ? "Add Workout" : "Suggest Workout"
          }}</b-button> -->
          <b-button
            v-if="this.$store.state.admin"
            variant="secondary"
            size="md"
            @click="openModal()"
          >
            Add Workout
          </b-button>
        </div>

        <div class="container-fluid">
          <div class="row flex-row flex-nowrap overflow-auto">
            <div v-for="workout in this.workouts" :key="workout.id">
              <Card
                v-if="workout.status == 'Approved'"
                :big="true"
                :img="workout.image"
                :title="workout.title"
                :location="workout.location"
                @click.native="gotoPage('workouts', workout.id)"
              >
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="this.$store.state.admin" class="mt-5 ml-3 mr-3">
                <div class="d-flex justify-content-between">
                    <h1> Suggested Workouts </h1>
                </div>    
                <div class="container-fluid">
                    <div class="row flex-row flex-nowrap overflow-auto">
                        <div v-for="workout in this.workouts" :key="workout.id">
                            <Card v-if="!workout.approved" :big="false" :img="workout.image" :title="workout.title" @click.native="gotoPage('workouts',workout.id)" >
                            </Card>
                        </div>
                    </div>
                </div>
            </div> -->
      <!-- 
            <div class="d-none d-md-block">
                <h1 class="pl-5"> Test </h1>
                <div class="pl-3 d-flex flex-column align-items-center">
                    <div class="pr-4">
                        website
                    </div>
                    <div class="mr-4">
                        webiste
                    </div>
                </div>
            </div>

            <div class="d-block d-md-none">
                <h1 class="pl-5"> Test </h1>
                <div class="pl-3 d-flex flex-column align-items-center">
                    <div class="pr-4">
                        mobile
                    </div>
                    <div class="mr-4">
                        mobile
                    </div>
                </div>
            </div> -->

      <b-modal ref="addWorkout" hide-footer title="New Workout">
        <b-form-group label="Title" :invalid-feedback="errors.first('title')">
          <b-form-input
            v-validate="'required'"
            v-model="workoutTitle"
            name="title"
            :state="errors.has('title') ? false : null"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Location"
          :invalid-feedback="errors.first('location')"
        >
          <b-form-input
            v-validate="'required'"
            v-model="workoutLocation"
            name="location"
            :state="errors.has('location') ? false : null"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Duration (in Mins)"
          :invalid-feedback="errors.first('duration')"
        >
          <b-form-input
            v-validate="'required|between:1,120'"
            v-model="workoutDuration"
            type="number"
            name="duration"
            :state="errors.has('duration') ? false : null"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Best Times"
          :invalid-feedback="errors.first('best times')"
        >
          <b-form-input
            v-validate="'required'"
            v-model="workoutTimes"
            name="best times"
            :state="errors.has('best times') ? false : null"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Materials"
          :invalid-feedback="errors.first('materials')"
        >
          <b-form-textarea
            v-validate="'required'"
            v-model="workoutMaterials"
            name="materials"
            rows="2"
            max-rows="4"
            :state="errors.has('materials') ? false : null"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          label="Difficulty"
          :invalid-feedback="errors.first('difficulty')"
        >
          <b-form-select
            v-model="workoutDifficulty"
            :options="difficultyOptions"
            v-validate="'required'"
            name="difficulty"
            :state="errors.has('difficulty') ? false : null"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          label="Minimum Number of Participants"
          :invalid-feedback="errors.first('participant count')"
        >
          <b-form-input
            v-model="workoutPeople"
            v-validate="'required|between:1,30'"
            name="participant count"
            type="number"
            :state="errors.has('participant count') ? false : null"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Instructions"
          :invalid-feedback="errors.first('instructions')"
        >
          <b-form-textarea
            v-model="workoutInstructions"
            v-validate="'required'"
            name="instructions"
            :state="errors.has('instructions') ? false : null"
            rows="2"
            max-rows="4"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Status">
          <b-form-select
            v-model="workoutStatus"
            :options="statusOptions"
            name="status"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          label="Image"
          :invalid-feedback="errors.first('image')"
          :state="!errors.has('image')"
        >
          <div class="dropZone">
            <b-form-file
              accept="image/*"
              v-model="workoutImage"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              v-validate="'required|mimes:image/*'"
              name="image"
              :state="errors.has('image') ? false : null"
              id="image_upload"
              ref="image_upload"
            ></b-form-file>
          </div>
        </b-form-group>

        <div v-if="this.$store.state.admin" style="float: right">
          <b-button
            variant="primary"
            size="large"
            type="submit"
            @click="addWorkoutSuggestion()"
            >Submit as suggestion</b-button
          >
          <b-button
            variant="secondary"
            size="large"
            type="submit"
            @click="addWorkout()"
            >Submit</b-button
          >
        </div>
        <div v-else style="float: right">
          <b-button
            variant="secondary"
            size="large"
            type="submit"
            @click="addWorkout()"
            >Submit</b-button
          >
        </div>
      </b-modal>
    </div>
    <div v-else class="d-flex justify-content-center mt-4">
      <Auth></Auth>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHero from "@/pages/Home/Components/HomeHero.vue";
import Card from "@/global/Card.vue";
import Auth from "@/pages/Home/Components/Auth.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: { HomeHero, Card, Auth },
  data() {
    return {
      workoutTitle: null,
      workoutLocation: null,
      workoutTimes: null,
      workoutMaterials: null,
      workoutDuration: null,
      workoutPeople: null,
      workoutDifficulty: null,
      workoutInstructions: null,
      workoutImage: null,
      workoutStatus: "Pending",
      difficultyOptions: [
        { value: null, text: "Select one", disabled: true },
        { value: "Beginner", text: "Beginner" },
        { value: "Intermediate", text: "Intermediate" },
        { value: "Advanced", text: "Advanced" }
      ],
      statusOptions: [
        { value: "Pending", text: "Pending" },
        { value: "Approved", text: "Approved" }
      ]
    };
  },
  methods: {
    gotoPage(path, id) {
      this.$router.push("/" + path + "/" + id);
    },
    openModal() {
      this.$refs.addWorkout.show();
    },
    addWorkout() {
      this.$validator.validateAll().then(result => {
        if (result) {
          var data = new FormData();
          data.append("title", this.workoutTitle);
          data.append("location", this.workoutLocation);
          data.append("duration", this.workoutDuration);
          data.append("best_times", this.workoutTimes);
          data.append("materials", this.workoutMaterials);
          data.append("people_count", this.workoutPeople);
          data.append("difficulty", this.workoutDifficulty);
          data.append("instructions", this.workoutInstructions);
          data.append("status", this.workoutStatus);
          data.append("file", document.getElementById("image_upload").files[0]);
          this.$store.dispatch("create_workout", data).then(() => {});
          this.$refs.addWorkout.hide();
        } else {
        }
      });
    },
    addWorkoutSuggestion() {
      this.$validator.validateAll().then(result => {
        if (result) {
          var lastId = this.workouts[this.workouts.length - 1].id;
          var workout = {
            id: lastId + 1,
            title: this.workoutTitle,
            location: this.workoutLocation,
            duration: this.workoutDuration,
            times: this.workoutTimes,
            materials: this.workoutMaterials,
            image: "workout2.jpg",
            reviews: [],
            approved: false
          };
          this.$store.dispatch("create", workout);
          this.workoutTitle = null;
          this.workoutLocation = null;
          this.workoutTimes = null;
          this.workoutMaterials = null;
          this.workoutDuration = null;
          this.$refs.addWorkout.hide();
        } else {
        }
      });
    }
  },
  computed: {
    ...mapState(["workouts", "loggedIn"])
  },
  watch: {
    loggedIn(newValue, oldValue) {
      if (newValue) {
        this.$store.dispatch("read_workouts");
      }
      var token = this.$store.state.token;
      var decodedToken = this.$store.state.token
        ? this.JwtDecode(this.$store.state.token)
        : "";
      var admin = decodedToken ? decodedToken.admin : false;
      this.$store.dispatch("update_admin", admin);
    }
  },
  async created() {
    if (this.$store.state.loggedIn) {
      await this.$store.dispatch("read_workouts");
    }
  }
};
</script>
<style></style>
