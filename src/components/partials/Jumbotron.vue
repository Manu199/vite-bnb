<script>

import { store } from '../../data/store';
import axios from 'axios';

export default {
  name: 'Jumbotron',
  data() {
    return {

    }
  },

  methods: {
    searchApartmentApi(endpoint) {
      axios.get(endpoint, {
        params: {
          lat:41.89056,
          lon:12.49427,
          radius:20
        }
      })
        .then(res => {
          store.searchListApartments = res.data;
          console.log(store.searchListApartments);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.searchApartmentApi(store.apiUrl + 'searchapartment');
  },

}
</script>

<template>
  <div class="jumbotron">

    <div class="content-jumbotron d-flex flex-column justify-content-center ">

      <h2 class=" text-center mb-3 ">Title</h2>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

    </div>





  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  background-color: greenyellow;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>