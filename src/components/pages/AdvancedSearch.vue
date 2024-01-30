<script>
import { store } from "../../data/store";
import axios from "axios";
// AGGIUNTO -----------------------
import { computed } from "vue";
// AGGIUNTO /-----------------------

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

    openService() {
        const servicesContainer = document.getElementById('services-container');
              servicesContainer.classList.toggle('reset-max-height');
        const btnChevron = document.getElementById('btn-chevron');
              btnChevron.classList.toggle('rotate-180');
       
    },
    
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
    setToSearch(){
      // Accedi ai parametri della query string
      const selectedAddress = this.$route.query.selectedAddress ?? '';
      const lat = this.$route.query.lat ?? null;
      const lon = this.$route.query.lon ?? null;
      const radius = this.$route.query.radius ?? 10;
      const minRooms = this.$route.query.minRooms ?? 0;
      const minBeds = this.$route.query.minBeds ?? 0;
      const services = this.$route.query.services ?? '';
      

      // Esegui il metodo nel servizio reactive per impostare i dati
      console.log('sto settando i parametri');
      this.store.setParamsToSearch(selectedAddress, lat, lon, radius, minRooms, minBeds, services);
      console.log('ho settato');
      this.store.apartmentsList = [];
      console.log('pulizia apartList', this.store.apartmentsList);
      this.store.toSearch();

    }
  },
  mounted() {
    // mantenere il dato anche dopo un F5
    // localStorage.setItem("myInputValue", this.store.selectedAddress);
    // this.store.selectedAddress = localStorage.getItem("myInputValue") || "";
    this.getServices();
    this.setToSearch();
  },

  // AGGIUNTO -----------------------
  computed: {
    searchResultsAvailable() {
    return store.searchResultsAvailable;
    },
  },
  // AGGIUNTO /-----------------------
  
};


</script>

<template>
  <div class="advanced-search">
    <div class="container">
      <!-- Address -->
        <div class="mb-3 d-flex align-items-center">
          <div class="d-flex position-relative w-100 h-100">  
            <InputWithAutocomplete/>
            <button @click="store.toSearch" class="btn position-absolute btn-search z-2"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <!-- Button trigger modal -->
          <button class="btn btn-custom-primary filter-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><span><i class="fa-solid fa-sliders"></i> Filtri</span></button> 
        </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Filtri</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="overflow-hidden">

                      <!-- Radius -->
                  <div class="mb-3 w-100">
                      <span id="text-custom" for="radius">Distanza: </span>
                      <span id="text-custom">{{ store.paramsToSearch.radius }} km</span>
                      <br>
                      <input id="range" v-model="store.paramsToSearch.radius" @click="store.toSearch" type="range" class="form-control-range slider" min="1" max="50" >
                  </div>

                  <!-- Rooms -->
                  <div class="mb-3">
                      <span id="text-custom">Stanze:</span>
                      <div class="d-flex w-100 align-items-center">
                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="0" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room" autocomplete="off" checked>
                          <label id="myButton" class="btn btn-small-custom me-2" for="btnradio-room">Qualsiasi</label>
                        </div>

                        <div v-for="index in 5" :key="index">
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="index" type="radio" class="btn-check" name="radio-rooms" :id="'btnradio-room-' + index" autocomplete="off">
                          <label class="btn btn-small-custom me-2" :for="'btnradio-room-' + index">{{ index }}</label>
                        </div>

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="6" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room-6" autocomplete="off">
                          <label class="btn btn-small-custom me-2" for="btnradio-room-6">6+</label>
                        </div>

                      </div>
                  </div>

                  <!-- Beds -->
                  <div class="mb-3">
                      <span id="text-custom">Letti:</span>
                      <div class="d-flex w-100 align-items-center">

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="0" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed" autocomplete="off" checked>
                          <label class="btn btn-small-custom me-2" for="btnradio-bed">Qualsiasi</label>
                        </div>

                        <div v-for="index in 5" :key="index">
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="index" type="radio" class="btn-check" name="radio-beds" :id="'btnradio-bed-' + index" autocomplete="off">
                          <label class="btn btn-small-custom me-2" :for="'btnradio-bed-' + index">{{ index }}</label>
                        </div>

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="6" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed-6" autocomplete="off">
                          <label class="btn btn-small-custom me-2" for="btnradio-bed-6">6+</label>
                        </div>
                      </div>
                  </div>

                  <!-- Services -->
                  <div class="mb-3">
                      <span id="text-custom">Services:</span>
                      <div class="position-relative" id="services-container">

                        <div class="row row-cols-1 row-cols-md-2" >
                          <div id="div-services" v-for="service in arrayServices" :key="service.id" class="col align-items-center d-flex">
                              <div class="container-services d-flex mb-2"  >
                                <div class="checkbox-wrapper-12">
                                  <div class="cbx">
                                    <input @click="store.toSearch"
                                    v-model="store.selectedServices"
                                    class="form-check-input "
                                    type="checkbox"
                                    :id="'service-' + service.id"
                                    :value="service.id"/>
                                    <label :for="'service-' + service.id"></label>
                                    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                                    </svg>
                                  </div>
                                  <!-- Gooey-->
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <defs>
                                      <filter id="goo-12">
                                        <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                                        <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                                        <feblend in="SourceGraphic" in2="goo-12"></feblend>
                                      </filter>
                                    </defs>
                                  </svg>
                                </div>
                                <label class="form-check-label single-line-ellipsis ms-2" :for="'service-' + service.id" v-html="service.name"></label>
                                
                              </div>
                          </div>
                        </div> 
                        <div class="position-absolute bottom-0 end-0 cursor-pointer" @click="openService" id="btn-chevron">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div> 
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- AGGIUNTO ---------------------- -->

        <div v-if="searchResultsAvailable">
          <template v-if="store.apartmentsList.length > 0">
            <!-- Mostra i risultati della ricerca -->
            <div v-for="apartment in store.apartmentsList" :key="apartment.id">
              <!-- Visualizza le informazioni dell'appartamento -->
            </div>
          </template>
          <template v-else>
            <!-- Nessun risultato per la tua ricerca -->
            <p>Fai la tua ricerca per trovare un appartamento.</p>
          </template>
        </div>

        <div v-else>
          <!-- Mostra il messaggio "nessun risultato per la tua ricerca" -->
          <p>Nessun risultato per la tua ricerca...</p>
        </div>


    <!-- AGGIUNTO /---------------------- -->



      <ListaApartment :apartmentsList="store.apartmentsList" />

    </div>
  </div>
  
</template>

<style lang="scss" scoped>
@use '../../scss/main.scss' as *;


.advanced-search{
  padding-top: 40px;
}

h1{
  color: $primaryColor;
  font-size: 100%;
}




@media screen and (min-width: 990px) {
    .modal-dialog {
    max-width: 60%;
  }
}
@media only screen and (min-width: 768px) and (max-width: 990px) {

    .modal-dialog {
    max-width: 80%;
  }
}
@media screen and (min-width:576px) and (max-width: 768px) {
    .modal-dialog {
    max-width: 90%;
  }

}


.modal-body{

  span{
    margin-bottom: 20px;
  }

  #text-custom   {
    font-size: 17px;
    color: $primaryColor;
    font-weight: 900;
    
  }

  #range{
    width: 100%;
    color: $primaryColor;
    justify-self: flex-start;
    margin-right: 1rem;
  }
  
  .slider {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 5px; 
    height: 15px;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7; 
    -webkit-transition: .2s;
    transition: opacity .2s;
    &:hover {
    opacity: 1;
    }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: $primaryColor;
    cursor: pointer;
    border-radius: 50%;
  }
  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: $primaryColor;
    border-radius: 50%;
    // cursor: pointer; 
  }
  
}


  .btn-small-custom {
    border: 1px solid $primaryColor;

    &:hover{
      background-color: $primaryColor;
      color: white;
    }
  }
}

input[type="radio"][name="radio-rooms"]:checked + label {
    background-color: $primaryColor;
    color: white;
}

input[type="radio"][name="radio-beds"]:checked + label {
    background-color: $primaryColor;
    color: white;
}

.active {
      background-color: $primaryColor;
      color: white;
      }

// SERVICES

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
}

#services-container{
    max-height: 160px;
    overflow: hidden;
    transition: max-height 1s ease-in-out;

    &.reset-max-height {
        max-height: 1000px;
    }
}



</style>
