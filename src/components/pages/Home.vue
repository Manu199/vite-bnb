<script>

import Jumbotron from '../partials/Jumbotron.vue';
import ListaApartment from '../partials/ListaApartment.vue';

export default {
  components: { Jumbotron, ListaApartment },
  name: "Home",

};
</script>

<template>
  <Jumbotron></Jumbotron>

    <ListaApartment></ListaApartment>
 
</template>

<style lang="scss" scoped></style>
