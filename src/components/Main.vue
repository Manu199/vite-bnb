<script>
import Favourite_apartaments from "./partials/Favourite_apartments.vue";
import Lista_apartment from "./partials/Lista_apartment.vue";
export default {
  name: "Main",
  components: {
    Lista_apartment,
    Favourite_apartaments,
  },
};
</script>

<template>
  <div class="container">
    <Lista_apartment></Lista_apartment>
    <Favourite_apartaments></Favourite_apartaments>
  </div>
</template>

<style lang="scss" scoped>
</style>