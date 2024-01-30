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
      this.store.searchResultsAvailable = true;
    }
  },
  mounted() {
    // mantenere il dato anche dopo un F5
    // localStorage.setItem("myInputValue", this.store.selectedAddress);
    // this.store.selectedAddress = localStorage.getItem("myInputValue") || "";
    this.getServices();
    this.setToSearch();
  },

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
          <button class="btn btn-custom-primary filter-button " data-bs-toggle="modal" data-bs-target="#exampleModal"><span><i class="fa-solid fa-sliders"></i> Filtri</span></button> 
        </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">Personalizza la tua ricerca</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div>

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
                          <label class="btn-big-custom me-2" for="btnradio-room">Qualsiasi</label>
                        </div>

                        <div v-for="index in 5" :key="index">
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="index" type="radio" class="btn-check" name="radio-rooms" :id="'btnradio-room-' + index" autocomplete="off">
                          <label class="btn-small-custom me-2" :for="'btnradio-room-' + index">{{ index }}</label>
                        </div>

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minRooms" :value="6" type="radio" class="btn-check" name="radio-rooms" id="btnradio-room-6" autocomplete="off">
                          <label class="btn-small-custom me-2" for="btnradio-room-6">6+</label>
                        </div>

                      </div>
                  </div>

                  <!-- Beds -->
                  <div class="mb-3">
                      <span id="text-custom">Letti:</span>
                      <div class="d-flex w-100 align-items-center">

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="0" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed" autocomplete="off" checked>
                          <label class="btn-big-custom me-2" for="btnradio-bed">Qualsiasi</label>
                        </div>

                        <div v-for="index in 5" :key="index">
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="index" type="radio" class="btn-check" name="radio-beds" :id="'btnradio-bed-' + index" autocomplete="off">
                          <label class="btn-small-custom me-2" :for="'btnradio-bed-' + index">{{ index }}</label>
                        </div>

                        <div>
                          <input @click="store.toSearch" v-model="store.paramsToSearch.minBeds" :value="6" type="radio" class="btn-check" name="radio-beds" id="btnradio-bed-6" autocomplete="off">
                          <label class="btn-small-custom me-2" for="btnradio-bed-6">6+</label>
                        </div>
                      </div>
                  </div>

                  <!-- Services -->
                  <div class="mb-3">
                      <span id="text-custom">Services:</span>

                        <div class="row row-cols-1 row-cols-md-2" >
                          <div id="div-services" v-for="service in arrayServices" :key="service.id" class="col align-items-center d-flex">
                              <div class="container-services d-flex mb-2"  >
                                <div class="checkbox-wrapper-12">
                                  <div class="cbx">
                                    <input @click="store.toSearch"
                                    v-model="store.selectedServices"
                                    class="form-check-input"
                                    type="checkbox"
                                    :id="'service-' + service.id"
                                    :value="service.id"
                                    name="remember"/>
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
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AGGIUNTO ---------------------- -->
      <div v-if="store.searchResultsAvailable">
          <div v-if="store.apartmentsList.length > 0">
            <!-- Mostra i risultati della ricerca -->
            <div v-for="apartment in store.apartmentsList" :key="apartment.id">
              <!-- Visualizza le informazioni dell'appartamento -->
            </div>
          </div>
          <div v-else class="text-center mb-4 mt-5">
            <!-- Nessun risultato per la tua ricerca -->
            <h4>Fai la tua ricerca per trovare un appartamento.</h4>
          </div>
        </div>

        <div v-else class="text-center mb-4 mt-5">
          <!-- Mostra il messaggio "nessun risultato per la tua ricerca" -->
          <h4>Nessun risultato per la tua ricerca...</h4>
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
    max-width: 50%;
  }
}
@media only screen and (min-width: 768px) and (max-width: 990px) {

    .modal-dialog {
    max-width: 70%;
  }
}
@media screen and (min-width:576px) and (max-width: 768px) {
    .modal-dialog {
    max-width: 90%;
  }

}



.modal-body{
  max-height: 500px;
  overflow-y: auto;

  #text-custom   {
    font-size: 17px;
    color: $primaryColor;
    font-weight: 900;
    
  }

  #range{
    width: 100%;
    border-radius: 3px;
    color: $primaryColor;
    justify-self: flex-start;
    margin-right: 1rem;
    &:hover {
      color: $secondaryColor;
      transition: 0s;
    }
  }
  

.btn-big-custom{
    padding: 0;
    width: 80px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 32px;
    border: 1px solid #047458;
    cursor: pointer;
    &:hover{
      background-color: $primaryColor;
      color: white;
    }
}

  .btn-small-custom {
    border: 1px solid $primaryColor;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
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



</style>
