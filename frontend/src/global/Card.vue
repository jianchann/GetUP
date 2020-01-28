<template>
  <div
    v-if="this.big"
    class="card m-2 hover-pointer hover-shadow"
    style="min-width:250px; max-width: 300px;"
  >
    <img
      :src="getImageUrl(this.img)"
      class="card-img-top card-image"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">{{ this.title }}</h5>
      <h6 class="card-title">At the {{ this.location }}</h6>
    </div>
  </div>
  <div
    v-else
    class="card m-2 hover-pointer hover-shadow"
    style="min-width: 150px; max-width: 200px;"
  >
    <img :src="getImageUrl(this.img)" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ this.title }}</h5>
      <h6 class="card-title">At the {{ this.location }}</h6>
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
01/22/20 - Jian Chan - Finalize file and fix layout

File Creation Date: 01/20/20
Development Group: GetUP
Client Group: UP Diliman Students
Purpose: Reusable card component to display previews of workouts
*/
const Card = {
  name: "Card",
  props: {
    img: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    /*
    Method Name: getImageUrl
    Creation Date: 01/22/20
    Purpose: Parse url (src) of image to be displayed
    Arguments: filename (String, filename of image)
    Required: None
    Return Value: Path to image
    */
    getImageUrl(filename) {
      return "/uploads/" + filename;
    }
  }
};

export default Card;
</script>

<style scoped></style>
