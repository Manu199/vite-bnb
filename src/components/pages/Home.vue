<script>
import Jumbotron from '../partials/Jumbotron.vue';
import ListaApartment from '../partials/ListaApartment.vue';
import axios from 'axios';
import { store } from '../../data/store';

export default {
  name: "Home",
  components: { 
    Jumbotron, 
    ListaApartment 
  },
  data() {
    return {
      store
    }
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
  <Jumbotron />
  <ListaApartment />
</template>

<style lang="scss" scoped></style>
