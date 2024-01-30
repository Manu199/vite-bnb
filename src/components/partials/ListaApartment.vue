<script>
import CardApartment from "./CardApartment.vue";
import { store } from "../../data/store";

export default {
  name: "ListApartment",
  components: {
    CardApartment,
  },
  props:{
    apartmentsList: Array
  },
  data() {
    return {
      store,
    };
  },  
};
</script>

<template>
  <section class="lista_apartment py-4 d-flex flex-column container">
    
    <!-- <h2 class="fw-bold">
      <span>Lista appartamenti </span>
      <span v-if="apartmentsList.length !== 0">[{{ apartmentsList.length }}]</span>
    </h2> -->
    
    <!-- <div v-if="apartmentsList.length === 0">
      <h4>Nessun risultato...</h4>
    </div> -->

    <div class="v-else">
      <div class="row">
        <CardApartment v-for="apartment,index in apartmentsList" :key="'apartment'+index" :apartment="apartment" />
      </div>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
</style>