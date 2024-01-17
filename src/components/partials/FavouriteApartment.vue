<script>
import CardApartment from "./CardApartment.vue";

export default {
  name: "FavouriteApartment",
  components: {
    CardApartment,
  },
};
</script>

<template>
  <section class="favourite_apartments py-4 d-flex flex-column">
    <div class="d-flex ms-2">
      <h4>Appartamenti preferiti dagli ospiti</h4>
    </div>

    <div class="row justify-content-start">
      <CardApartment />
      <CardApartment />
      <CardApartment />
      <CardApartment />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
