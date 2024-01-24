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
      
      <!-- da fixare -->
     
      <!-- xxxxxxxxxxxxx -->

      <!-- Address -->
      <div class="mb-3">
        <div class="container d-flex">
          <InputWithAutocomplete />

        </div>
      </div>

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
.container-services {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 3px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #016A70;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}



// SERVICES

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
}

</style>
