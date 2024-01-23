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
      store,
      apartmentsList: []
    }
  },
  methods: {
    getAllApartment() {
      axios
        .get(store.apiUrl + "apartments")
        .then((res) => {
          this.apartmentsList = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getAllApartment();
  },
};
</script>

<template>
  <Jumbotron />
  <ListaApartment :apartmentsList="apartmentsList" />
</template>

<style lang="scss" scoped></style>
