<script>
import CardApartment from "./CardApartment.vue";
import { store } from "../../data/store";

export default {
  name: "ListApartment",
  components: {
    CardApartment,
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
    
    <h2 class="fw-bold">
      <span>Lista appartamenti </span>
      <span v-if="store.apartmentsList.length !== 0">[{{ store.apartmentsList.length }}]</span>
    </h2>
    
    <div v-if="store.apartmentsList.length === 0">
      <h4>Nessun risultato...</h4>
    </div>

    <div class="v-else">
      <div class="row">
        <CardApartment v-for="apartment,index in store.apartmentsList" :key="index" :apartment="apartment" />
      </div>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
</style>