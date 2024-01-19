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
      console.log(endpoint);
      axios
        .get(endpoint)
        .then((res) => {
          store.apartmentsList = res.data.data;
          console.log(store.apartmentsList);
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
    
    <div v-if="store.searchListApartments.length == 0">
      <h4>Lista appartamenti</h4>
      <div class="row">
        <CardApartment v-for="apartment,index in store.apartmentsList" :key="index" :apartment="apartment" />
      </div>
    </div>
    <div v-else>
      <h4>Ricerca</h4>
      <div class="row">
        <CardApartment v-for="apartment,index in store.searchListApartments" :key="index" :apartment="apartment" />
      </div>
    </div>

    
  </section>
</template>

<style lang="scss" scoped>
</style>