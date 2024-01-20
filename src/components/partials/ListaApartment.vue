<script>
import CardApartment from "./CardApartment.vue";
import axios from "axios";
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
  methods: {
    getApi(endpoint) {
      axios
        .get(endpoint)
        .then((res) => {
          store.apartmentsList = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getApi(store.apiUrl + "apartments");
  },
  
};
</script>

<template>
  <section class="lista_apartment py-4 d-flex flex-column container">
    
    <h2 class="fw-bold">Lista appartamenti</h2>
    <div v-if="store.apartmentsList.length > 0">
      <div class="row">
        <CardApartment v-for="apartment,index in store.apartmentsList" :key="index" :apartment="apartment" />
      </div>
    </div>
    <div class="v-else">
      <h4>Nessun risultato...</h4>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
</style>