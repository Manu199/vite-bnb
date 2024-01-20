<script>
import { store } from "../../data/store";
import axios from "axios";

import ListaApartment from "../partials/ListaApartment.vue";

export default {
  name: "AdvancedSearch",
  components:{
    ListaApartment
  },
  data() {
    return {
      selectedAddress: '',
      selectedRange: 10,
      selectedRooms: 0,
      selectedBeds: 0,
      selectedServices: [],
      arrayServices: [],
      timeoutId: null,
      arraySuggest: [],
      listItemClicked: false,
      position: {},
    }
  },
  methods: {
    getServices(){
      axios.get(`http://127.0.0.1:8000/api/services`)
        .then(response => {
          this.arrayServices = response.data.data;
          console.log(this.arrayServices);
        })
        .catch(error => {
            console.error(error);
        });
    },

    autocomplete(){
      // Cancella il timer precedente se esiste
      clearTimeout(this.timeoutId);

      // Verifica se l'input è vuoto
      if(!this.selectedAddress.trim()){
        // Se l'input è vuoto, non effettuare la chiamata
        this.selectedAddress = [];
        return
      }

      const apiUrl = 'https://api.tomtom.com/search/2/geocode/';
      const apiQuery = this.selectedAddress + '.json';
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

    // quando viene selezionato un li dalla lista di suggerimenti
    selectedFromSuggest(address){
      this.listItemClicked = true;
      this.selectedAddress = address.address.freeformAddress; 
      this.position = address.position;
      this.arraySuggest = [];
      if(Object.keys(this.position).length !== 0){
        this.toSearch();
      }
    },

    // quando il mouse esce dalla input text
    handleBlur() {
      setTimeout(() => {
        if (!this.listItemClicked) {
          if (this.arraySuggest[0] && this.arraySuggest[0].address){
            this.selectedAddress = this.arraySuggest[0].address.freeformAddress;
            this.position = this.arraySuggest[0].position;
            this.arraySuggest = [];
          }
        }
        this.listItemClicked = false;
      }, 200);
    },

    // quando premo invio seleziona il primo elemento
    selectedFirst(){
      if (this.arraySuggest[0] && this.arraySuggest[0].address){
        this.selectedAddress = this.arraySuggest[0].address.freeformAddress;
        this.position = this.arraySuggest[0].position;
        this.arraySuggest = [];
      }
      if(Object.keys(this.position).length !== 0){
        this.toSearch();
      }
    },

    // richiesta api ricerca avanzata
    // http://127.0.0.1:8000/api/searchapartment-advanced?lat=45.46362&lon=9.18812&radius=5&minRooms=1&minBeds=1&services
    toSearch(){
      console.log(this.position);

      const params = {
        lat: this.position.lat,
        lon: this.position.lon,
        radius: this.selectedRange,
        minRooms: this.selectedRooms,
        minBeds: this.selectedBeds,
        services: this.selectedServices.join(' ')
      };

      console.log(params);

      axios.get('http://127.0.0.1:8000/api/searchapartment-advanced', {
        params: params,
      })
        .then(response => {
          store.apartmentsList = response.data.data;
          console.log(store.apartmentsList);
        })
        .catch(error => {
            console.error(error);
        });
    }
  },
  mounted() {
    this.getServices();
  },
  
};
</script>

<template>
  <div class="detail">
    <div class="container">
      <h1 class="text-danger mb-5 text-center">Ricerca avanzata</h1>
      
      <!-- da fixare -->
      <!-- <div class="mb-3">
        <button class="btn-custom-primary"><span><i class="fa-solid fa-sliders"></i> Filtri</span></button>
      </div> -->
      <!-- xxxxxxxxxxxxx -->

      <!-- Address -->
      <div class="mb-3">
        <div class="position-relative">
          <input v-model="selectedAddress" @input="autocomplete" @blur="handleBlur" @keypress.enter="selectedFirst" class="form-control" type="text" placeholder="Digita qui l'indirizzo"/>
          <ul class="list-group" id="list-search">
            <li @click="selectedFromSuggest(address)" class="cursor-pointer list-group-item list-group-item-action list-group-item-secondary" v-for="address,index in arraySuggest" :key="index">{{ address.address.freeformAddress }}</li>
          </ul>
        </div>
      </div>

      <!-- Radius -->
      <div class="mb-3">
          <span for="radius">Distanza: </span><br>
          <div class="d-flex align-items-center">
            <input v-model="selectedRange" type="range" class="form-control-range" min="1" max="50" >
            <span class="ms-2">{{ selectedRange }} km</span>
          </div>
      </div>

      <!-- Rooms -->
      <div class="mb-3">
          <span>Stanze:</span>
          <div class="d-flex">
            <div>
              <input v-model="selectedRooms" :value="0" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room" autocomplete="off" checked>
              <label class="btn btn-outline-primary me-2" for="btnradio-room">Qualsiasi</label>
            </div>

            <div v-for="index in 5" :key="index">
              <input v-model="selectedRooms" :value="index" type="radio" class="btn-check" name="radio-rooms" :id="'btnradio-room-' + index" autocomplete="off">
              <label class="btn btn-outline-primary me-2" :for="'btnradio-room-' + index">{{ index }}</label>
            </div>

            <div>
              <input v-model="selectedRooms" :value="6" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room-6" autocomplete="off">
              <label class="btn btn-outline-primary me-2" for="btnradio-room-6">6+</label>
            </div>

            <p>Selected Rooms: {{ selectedRooms }}</p>
          </div>
      </div>

      <!-- Beds -->
      <div class="mb-3">
          <span>Letti:</span>
          <div class="d-flex">

            <div>
              <input v-model="selectedBeds" :value="0" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed" autocomplete="off" checked>
              <label class="btn btn-outline-primary me-2" for="btnradio-bed">Qualsiasi</label>
            </div>

            <div v-for="index in 5" :key="index">
              <input v-model="selectedBeds" :value="index" type="radio" class="btn-check" name="radio-beds" :id="'btnradio-bed-' + index" autocomplete="off">
              <label class="btn btn-outline-primary me-2" :for="'btnradio-bed-' + index">{{ index }}</label>
            </div>

            <div>
              <input v-model="selectedBeds" :value="6" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed-6" autocomplete="off">
              <label class="btn btn-outline-primary me-2" for="btnradio-bed-6">6+</label>
            </div>
            <p>Selected Beds: {{ selectedBeds }}</p>
          </div>
      </div>

      <!-- Services -->
      <div class="mb-3">
          <span>Services:</span>
          <div>
            <div v-for="service in arrayServices" :key="service.id" class="form-check form-check-inline">
                <input
                  v-model="selectedServices"
                  class="form-check-input"
                  type="checkbox"
                  :id="'service-' + service.id"
                  :value="service.id">
                <label class="form-check-label" :for="'service-' + service.id" v-html="service.name"></label>
            </div>
          </div>
          <p>Selected Services: {{ selectedServices }}</p>
      </div>

      <ListaApartment />

      <button  @click="toSearch" class="btn btn-primary"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
  </div>
  
</template>

<style lang="scss" scoped>

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
}

</style>
