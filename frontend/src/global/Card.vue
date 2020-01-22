<template>
  <div
    v-if="this.big"
    class="card m-2 hover-pointer hover-shadow"
    style="min-width:250px; max-width: 300px;"
  >
    <img
      :src="GetImageUrl(this.img)"
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
    <img :src="GetImageUrl(this.img)" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ this.title }}</h5>
      <h6 class="card-title">At the {{ this.location }}</h6>
    </div>
  </div>
</template>

<script>
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
    GetImageUrl(url, folder = null) {
      return "/uploads/" + url;
    }
  }
};

export default Card;
</script>

<style scoped></style>
