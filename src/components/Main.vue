<script>
import ListaApartment from "./partials/ListaApartment.vue";
import ApartmentDetail from "./pages/ApartmentDetail.vue";

export default {
  name: "Main",
  components: {
    ListaApartment,
    ApartmentDetail
  },
};
</script>

<template>
  <div class="container">
    <router-view></router-view>
    <ListaApartment />
  </div>
</template>

<style lang="scss" scoped>
</style>