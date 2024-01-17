<script>
import Navbar from "./partials/Navbar.vue";
import Jumbotron from "./partials/Jumbotron.vue";

export default {
  name: "Header",
  components: {
    Navbar,
    Jumbotron,
  },
};
</script>

<template>
  <Navbar />
  <Jumbotron />
</template>

<style lang="scss" scoped>
</style>