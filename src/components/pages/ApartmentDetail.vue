<script>

import { store } from '../../data/store';
import axios from 'axios';

export default {
  name: "ApartmenDetail",
  data() {
    return {
      store,
      slug: '',
      apartment: {},
      apiKey: 'Gd0dA91qzIELGRIdIuFGT9cxnvEZ0yEM',
      name: '',
      email_sender: '',
      text: '',
      apartment_id: '',
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
      errors: {
        name: '',
        email: '',
        text: '',
      },
      success: false,
      nameValidationClass: '',
      emailValidationClass: '',
      textValidationClass: '',
    }
  },
  methods: {
    //API DETTAGLIO APPARTAMENTO
    getApartmentApi(slug) {
      axios.get(store.apiUrl + 'apartment/' + slug)
        .then(res => {
          this.apartment = res.data;
          this.apartment_id = res.data.id;
          console.log(this.apartment_id);
          this.initMap();
        }).catch(e => {
          console.log(e);
        })
    },

    //API INVIO EMAIL
    sendMailApi() {
      const mail = {
        name: this.name,
        email_sender: this.email_sender,
        text: this.text,
        apartment_id: this.apartment_id,
        date: this.date
      };
      axios.post(store.apiUrl + 'send-message', mail)
        .then(res => {
          this.success = res.data.success;
          if (!this.success) {
            this.errors = res.data.errors;
            console.log(this.errors);
          }
        }).catch(e => { console.log(e); });
    },

    //SDK MAP TOMTOM
    initMap() {

      let map;

      map = tt.map({
        key: this.apiKey,
        container: 'map',
        basePath: 'sdk/',
        center: [this.apartment.lon, this.apartment.lat],
        zoom: 16,
        theme: {
          style: 'buildings',
          layer: 'basic',
          source: 'vector'
        },
      });
      map.addControl(new tt.NavigationControl());

      const element = document.getElementById('marker');
      const marker = new tt.Marker({
        element: element,
        anchor: 'center',
      }).setLngLat([this.apartment.lon, this.apartment.lat]);

      marker.addTo(map);
    },

    //VALIDAZIONE INPUT EMAIL
    validateName() {
      if (this.name.length < 1) {
        this.errors.name = 'Il campo Nome è obbligatorio';
        this.nameValidationClass = 'is-invalid';
      } else {
        this.errors.name = '';
        this.nameValidationClass = 'is-valid';
      }
    },
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(this.email_sender)) {
        this.errors.email_sender = 'Indirizzo email non valido';
        this.emailValidationClass = 'is-invalid';
      } else {
        this.errors.email_sender = '';
        this.emailValidationClass = 'is-valid';
      }
    },
    validateText() {
      if (this.text.length < 10) {
        this.errors.text = 'Il messaggio deve contenere almeno 10 caratteri';
        this.textValidationClass = 'is-invalid';
      } else {
        this.errors.text = '';
        this.textValidationClass = 'is-valid';
      }
    },
  },
  mounted() {
    this.slug = this.$route.params.slug;
    this.getApartmentApi(this.slug);
  }

};
</script>

<template>
  <div class="container mt-5">
    <h3 class="text-black mb-4">{{ this.apartment.title }}</h3>

    <div class=" d-flex img-container">
      <img :src="apartment.image_path" alt="" class="object-fit-cover border rounded w-100">
    </div>

    <div class="info-apartment row mt-3">
      <div class="info-general col-8">
        <div class="info-price">
          <p class="fw-bold">&euro;{{ apartment.price }}/Notte</p>
          <p class="mb-0"><i class="fa-solid fa-circle fa-2xs me-1" style="color: #63E6BE;"></i>Disponibile</p>

          <div class="info-rooms mb-4">
            {{ apartment.num_of_bed }} letto/i &middot; {{ apartment.num_of_bathroom }} bagno/i &middot; {{
              apartment.square_meters }} mq
          </div>

        </div>

        <div class="info-services row py-4 pe-4 border-bottom border-top w-75">
          <span v-html="service.name" v-for="(service, index) in this.apartment.services" :key="index"
            class="col-6"></span>
        </div>


        <div class="description-apartment py-3">
          <p class=" ">{{ apartment.description }}</p>
        </div>

        <div class="map" id="map">
          <div id="marker"></div>
        </div>
      </div>


      <div class="info-seller col-4">
        <div class="card mb-3 px-0 d-flex flex-column">

          <div class="info-user d-flex flex-nowrap p-2">
            <div class="img">
              <img src="http://placebeard.it/640x480" class="w-100 pe-3 object-fit-cover" alt="...">
            </div>
            <div class="text">
              <p class=" mb-0 text-user">{{ apartment.user ? apartment.user.name : 'Utente' }} {{ apartment.user ?
                apartment.user.lastname : 'Anonimo' }}</p>
              <p class="mb-0 numero-user">{{ apartment.user ? apartment.user.email : 'Utente' }}</p>
            </div>
          </div>

          <div class="contact p-2">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Contattami
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">

                    <!-- FORM EMAIL-->
                    <form v-if="!this.success" @submit.prevent="sendMailApi()">
                      <div class="formContent">

                        <!-- NAME -->
                        <div class="mb-3">
                          <label for="name" class="form-label me-3">Name</label>
                          <span class="badge text-bg-danger">{{ errors.name }}</span>
                          <input v-model="name" @input="validateName" :class="nameValidationClass" type="text"
                            class="form-control" id="name" name="name">

                        </div>

                        <!-- EMAIL ADDRESS -->
                        <div class="mb-3">
                          <label for="email_sender" class="form-label me-3">Email address</label>
                          <span class="badge text-bg-danger">{{ errors.email_sender }}</span>
                          <input v-model="email_sender" @input="validateEmail" :class="emailValidationClass"
                            type="email_sender" class="form-control" id="email_sender" name="email_sender">

                        </div>

                        <!-- TEXT MESSAGE -->
                        <div class="mb-3 d-flex flex-column justify-content-between">
                          <label for="text" class="form-label m-0">Message:</label>
                          <div class=" badge-message overflow-hidden">
                            <span class="badge text-bg-danger">{{ errors.text }}</span>
                          </div>
                          <textarea v-model="text" @input="validateText" :class="textValidationClass" class="form-control mt-2"
                            id="text" rows="5" name="text">
                          </textarea>
                        </div>

                        <!-- BUTTON -->
                        <button type="submit" class="btn btn-primary">Invia</button>
                      </div>
                    </form>

                    <span v-else class="badge text-bg-success">Email inviata correttamente</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>




    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;

.container {

  .img {
    width: 80px;
  }

  .text-user {
    font-size: 13px;
  }

  .numero-user {
    font-size: 10px;
  }

  .btn-text {
    font-size: 100%;
  }

  .map {
    width: 100%;
    height: 250px;
  }

  #marker {
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0.2);
    width: 150px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .accordion-button {
    background-color: $primary_color;
    color: $section_grey;
  }
  .badge-message {
    height: 25px;
  }

  button {
    background-color: $primary_color;
    border-color: $primary_color;
    &:hover {
      background-color: $primary_color_hover;
    }
  }
}
</style>
