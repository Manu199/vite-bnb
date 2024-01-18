<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  name: "Jumbotron",
  data() {
    return {
      store,
      inputSearch: '',
      timeoutId: null,
      arraySuggest: [],
      position: {}
    };
  },
  methods: {

    autocomplete(){
      console.log('autocomplete ON');
      if(this.inputSearch.length > 1){
        // Imposta un timer per ritardare la chiamata di 300ms
        this.timeoutId = setTimeout(() => {
          const apiUrl = 'https://api.tomtom.com/search/2/geocode/';
          const apiQuery = this.inputSearch + '.json';
          const encodedAddress = encodeURIComponent(apiQuery);
          const apiKey = '?limit=5&key=JFycdOFju9JHTRcWGALUGaqq5FULPTe8';
    
          const endpoint = apiUrl + encodedAddress + apiKey;
            // Fai la chiamata solo dopo che il timer è scaduto
            axios.get(endpoint)
                .then(response => {
                  this.arraySuggest = response.data.results;
                  console.log(this.arraySuggest);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 300);
      }
    },

    toSearch(){
      console.log('start search');
      console.log(this.position);
      axios.get(`http://127.0.0.1:8000/api/searchapartment?lat=${this.position.lat}&lon=${this.position.lon}&radius=1000`)
        .then(response => {
          store.searchListApartments = response.data.data;
        })
        .catch(error => {
            console.error(error);
        });
    }

  },
  mounted() {
  },
};
</script>

<template>
  <div class="position-relative">
    <div class="jumbotron">
      <div class="black-jumbotron"></div>
      <div class="content-jumbotron d-flex flex-column justify-content-center position-absolute top-0 bottom-0 start-50 translate-middle-x">
        <h2 class="text-center mb-3 text-white z-3">
          Trova l'appartamento dei tuoi sogni
        </h2>
        <div class="d-flex" role="search">
          <input v-model="inputSearch" @keydown="autocomplete" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-success" @click="toSearch">Search</button>
        </div>
        <ul class="list-group">
          <li @click="inputSearch = address.address.freeformAddress, position = address.position" class="cursor-pointer list-group-item list-group-item-action list-group-item-secondary" v-for="address,index in arraySuggest" :key="index">{{ address.address.freeformAddress }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../../public/image-verde.jpeg);
  background-size: cover;
  background-position: center;
}

.black-jumbotron {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.349);
}

.cursor-pointer{
  cursor: pointer;
}
</style>
