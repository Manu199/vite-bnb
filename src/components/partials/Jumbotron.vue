<script>
import { RouterLink } from "vue-router";
import { store } from "../../data/store";
import axios from "axios";

export default {
  name: "Jumbotron",
  data() {
    return {
      store,
      inputSearch: '',
      timeoutId: null,
      listItemClicked: false,
      arraySuggest: [],
      position: {}
    };
  },
  methods: {

    autocomplete(){
      // Cancella il timer precedente se esiste
      clearTimeout(this.timeoutId);

      // Verifica se l'input è vuoto
      if(!this.inputSearch.trim()){
        // Se l'input è vuoto, non effettuare la chiamata
        this.arraySuggest = [];
        return
      }

      const apiUrl = 'https://api.tomtom.com/search/2/geocode/';
      const apiQuery = this.inputSearch + '.json';
      const encodedAddress = encodeURIComponent(apiQuery);
      const apiKey = '?limit=5&key=JFycdOFju9JHTRcWGALUGaqq5FULPTe8';

      // Imposta un timer per ritardare la chiamata di 300ms
      this.timeoutId = setTimeout(() => {
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
    },

    handleBlur() {
      setTimeout(() => {
        if (!this.listItemClicked) {
          if (this.arraySuggest[0] && this.arraySuggest[0].address){
            this.inputSearch = this.arraySuggest[0].address.freeformAddress;
            this.position = this.arraySuggest[0].position;
            this.arraySuggest = [];
          }
        }
        this.listItemClicked = false;
      }, 200);
    },

    selectedFromSuggest(address){
      this.listItemClicked = true;
      this.inputSearch = address.address.freeformAddress; 
      this.position = address.position;
      this.arraySuggest = [];
      if(Object.keys(this.position).length !== 0){
        this.toSearch();
        
      }
    },

    selectedFirst(){
      if (this.arraySuggest[0] && this.arraySuggest[0].address){
        this.inputSearch = this.arraySuggest[0].address.freeformAddress;
        this.position = this.arraySuggest[0].position;
        this.arraySuggest = [];
      }
      if(Object.keys(this.position).length !== 0){
        this.toSearch();
      }
    },

    toSearch(){
      console.log(this.position);
      axios.get(`http://127.0.0.1:8000/api/searchapartment?lat=${this.position.lat}&lon=${this.position.lon}&radius=20`)
        .then(response => {
          store.searchListApartments = response.data.data;
          console.log(store.searchListApartments);
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
  <div class="position-relative mb-5">
    <div class="jumbotron">
      <div class="black-jumbotron"></div>
      <div class="position-absolute">
        <h2 class="text-center mb-3 text-white z-3">
          Trova l'appartamento dei tuoi sogni
        </h2>
        <div class="position-relative">
          <div class="d-flex" role="search">
            <input v-model="inputSearch" @input="autocomplete" @blur="handleBlur" @keypress.enter="selectedFirst" class="form-control me-2" type="text" placeholder="Digita qui l'indirizzo" aria-label="Search" />
            <button class="btn btn-success" @click="toSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <ul class="list-group" id="list-search">
            <li @click="selectedFromSuggest(address)" class="cursor-pointer list-group-item list-group-item-action list-group-item-secondary" v-for="address,index in arraySuggest" :key="index">{{ address.address.freeformAddress }}</li>
          </ul>
        </div>
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
  background-color: rgba(0, 0, 0, 0.4);
}

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
  padding-right: 50px;
}

.cursor-pointer{
  cursor: pointer;
}
</style>
