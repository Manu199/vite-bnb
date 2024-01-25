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
  <div class="detail">
    <div class="container">
      <h1 class="mb-5 text-center">Ricerca avanzata</h1>
      
      <!-- Address -->
      <div class="mb-3">
        <div class="container d-flex">
          <InputWithAutocomplete />

        </div>
      </div>

        <!-- CHECKBOX ----------------------------------------------------------- -->
        <div class="checkbox-wrapper-12">
          <div class="cbx">
            <input id="cbx-12" type="checkbox"/>
            <label for="cbx-12"></label>
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
        <!-- CHECKBOX ----------------------------------------------------------- -->

      <!-- Button trigger modal -->
      <div class="mb-3">
        <button class="btn btn-custom-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><span><i class="fa-solid fa-sliders"></i> Filtri</span></button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Filtri</h1>
            </div>
            <div class="modal-body">
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
                    
                    <div class="row">
                      <div id="div-services" v-for="service in arrayServices" :key="service.id" class="col-6 align-items-center d-flex">
                          <label class="container-services">
                            <span class="form-check-label single-line-ellipsis" :for="'service-' + service.id" v-html="service.name"></span>
                            <input
                              @click="store.toSearch"
                              v-model="store.selectedServices"
                              class="form-check-input"
                              type="checkbox"
                              :id="'service-' + service.id"
                              :value="service.id">
                              <span class="checkmark"></span>
                          </label>
                      </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-custom-primary" data-bs-dismiss="modal"> Conferma </button>
            </div>
          </div>
        </div>
      </div>




      <ListaApartment :apartmentsList="store.apartmentsList" />

    </div>
  </div>
  
</template>

<style lang="scss" scoped>
@use '../../scss/main.scss' as *;

h1{
  color: #016A70;
  font-size: 5%;
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
    color: #016A70;
    font-weight: 900;
    
  }

  #range{
    width: 94%;
    color: #016A70;
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
    background: #016A70;
    cursor: pointer;
    border-radius: 50%;
  }
  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #016A70;
    border-radius: 50%;
    // cursor: pointer; 
  }
  
}


  .btn-small-custom {
    border: 1px solid #016A70;

    &:hover{
      background-color: #016A70;
      color: white;
    }
  }
}

input[type="radio"][name="radio-rooms"]:checked + label {
    background-color: #016A70;
    color: white;
}

input[type="radio"][name="radio-beds"]:checked + label {
    background-color: #016A70;
    color: white;
}

.active {
      background-color: #016A70;
      color: white;
      }

// SERVICES

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
}

// CHECKBOX 
.checkbox-wrapper-12 {
    position: relative;
  }
  .checkbox-wrapper-12 > svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
  }
  .checkbox-wrapper-12 * {
    box-sizing: border-box;
  }
  .checkbox-wrapper-12 input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
  }
  .checkbox-wrapper-12 input[type="checkbox"]:focus {
    outline: 0;
  }
  .checkbox-wrapper-12 .cbx {
    width: 24px;
    height: 24px;
    top: calc(50vh - 12px);
    left: calc(50vw - 12px);
  }
  .checkbox-wrapper-12 .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #bfbfc0;
    border-radius: 50%;
  }
  .checkbox-wrapper-12 .cbx label {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-filter: url("#goo-12");
    filter: url("#goo-12");
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
  }
  .checkbox-wrapper-12 .cbx svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }
  .checkbox-wrapper-12 .cbx input:checked + label {
    animation: splash-12 0.6s ease forwards;
  }
  .checkbox-wrapper-12 .cbx input:checked + label + svg path {
    stroke-dashoffset: 0;
  }
  @-moz-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @-webkit-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @-o-keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
  @keyframes splash-12 {
    40% {
      background: #866efb;
      box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }
    100% {
      background: #866efb;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
</style>
