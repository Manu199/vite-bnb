<script>
import { store } from "../../data/store";
import axios from "axios";

import ListaApartment from "../partials/ListaApartment.vue";
import InputWithAutocomplete from "../partials/InputWithAutocomplete.vue";

export default {
  name: "AdvancedSearch",
  components:{
    ListaApartment,
    InputWithAutocomplete
  },
  data() {
    return {
      store,
      arrayServices: []
    }
  },
  methods: {
    getServices(){
      axios.get(`http://127.0.0.1:8000/api/services`)
        .then(response => {
          this.arrayServices = response.data.data;
          // console.log(this.arrayServices);
        })
        .catch(error => {
            console.error(error);
        });
    },

    viewSomeApartments(){
      if(store.apartmentsList.length === 0){
        this.getAllApartments();
      }
    },

    getAllApartments() {
      axios
        .get(store.apiUrl + "apartments")
        .then((res) => {
          store.apartmentsList = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
  },
  mounted() {
    // mantenere il dato anche dopo un F5
    // localStorage.setItem("myInputValue", this.store.selectedAddress);
    // this.store.selectedAddress = localStorage.getItem("myInputValue") || "";
    this.getServices();
    this.viewSomeApartments();
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
        <InputWithAutocomplete />
      </div>

      <!-- Radius -->
      <div class="mb-3">
          <span for="radius">Distanza: </span><br>
          <div class="d-flex align-items-center">
            <input v-model="store.paramsToSearch.radius" @click="store.toSearch" type="range" class="form-control-range" min="1" max="50" >
            <span class="ms-2">{{ store.paramsToSearch.radius }} km</span>
          </div>
      </div>

      <!-- Rooms -->
      <div class="mb-3">
          <span>Stanze:</span>
          <div class="d-flex">
            <div>
              <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="0" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room" autocomplete="off" checked>
              <label class="btn btn-outline-primary me-2" for="btnradio-room">Qualsiasi</label>
            </div>

            <div v-for="index in 5" :key="index">
              <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="index" type="radio" class="btn-check" name="radio-rooms" :id="'btnradio-room-' + index" autocomplete="off">
              <label class="btn btn-outline-primary me-2" :for="'btnradio-room-' + index">{{ index }}</label>
            </div>

            <div>
              <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="6" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room-6" autocomplete="off">
              <label class="btn btn-outline-primary me-2" for="btnradio-room-6">6+</label>
            </div>

            <p>Selected Rooms: {{ store.paramsToSearch.minRooms }}</p>
          </div>
      </div>

      <!-- Beds -->
      <div class="mb-3">
          <span>Letti:</span>
          <div class="d-flex">

            <div>
              <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="0" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed" autocomplete="off" checked>
              <label class="btn btn-outline-primary me-2" for="btnradio-bed">Qualsiasi</label>
            </div>

            <div v-for="index in 5" :key="index">
              <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="index" type="radio" class="btn-check" name="radio-beds" :id="'btnradio-bed-' + index" autocomplete="off">
              <label class="btn btn-outline-primary me-2" :for="'btnradio-bed-' + index">{{ index }}</label>
            </div>

            <div>
              <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="6" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed-6" autocomplete="off">
              <label class="btn btn-outline-primary me-2" for="btnradio-bed-6">6+</label>
            </div>
            <p>Selected Beds: {{ store.paramsToSearch.minBeds }}</p>
          </div>
      </div>

      <!-- Services -->
      <div class="mb-3">
          <span>Services:</span>
          <div>
            <div v-for="service in arrayServices" :key="service.id" class="form-check form-check-inline">
                <input
                  @click="store.toSearch"
                  v-model="store.selectedServices"
                  class="form-check-input"
                  type="checkbox"
                  :id="'service-' + service.id"
                  :value="service.id">
                <label class="form-check-label" :for="'service-' + service.id" v-html="service.name"></label>
            </div>
          </div>
          <p>Selected Services: {{ store.selectedServices }}</p>
      </div>

      <ListaApartment />

      <button  @click="store.toSearch" class="btn btn-primary"><i class="fa-solid fa-magnifying-glass"></i></button>
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
