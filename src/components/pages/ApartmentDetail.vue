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

      // MODAL message
      modalResultMessage: null,
      message: '',

      //SPINNER message
      loading: false,

      //SERVICES
      showAllServices: false,

    }
  },
  methods: {
    //API DETTAGLIO APPARTAMENTO
    getApartmentApi(slug) {
      axios.get(store.apiUrl + 'apartment/' + slug)
        .then(res => {
          this.apartment = res.data;
          console.log(this.apartment);
          this.apartment_id = res.data.id;
          console.log(this.apartment_id);
          this.initMap();
        }).catch(e => {
          console.log(e);
        })
    },

    //API INVIO EMAIL
    sendMailApi() {

  this.validateName();
  this.validateEmail();
  this.validateText();

  if (this.errors.name || this.errors.email_sender || this.errors.text) {
    return;
  }
      this.loading = true;
      const mail = {
        name: this.name,
        email_sender: this.email_sender,
        text: this.text,
        apartment_id: this.apartment_id,
        date: this.date
      };
      axios.post(store.apiUrl + 'send-message', mail)
        .then(res => {
          console.log(res.data);
          this.success = res.data.success;
          if (!this.success) {
            this.errors = res.data.errors;
            console.log(this.errors);
            this.message = this.errors;
          } else {
            this.message = 'Messaggio inviato con successo!';
            // resetto tutti i campi
            this.name = '';
            this.email_sender = '';
            this.text = '';
            this.nameValidationClass = '';
            this.emailValidationClass = '';
            this.textValidationClass = '';
          }
        })
        .catch(e => { console.log(e); })
        .finally(() => {
          this.loading = false;
          this.openModal();
        });
    },

    openModal() {
      this.modalResultMessage.show();
    },
    closeModal() {
      this.modalResultMessage.hide();
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
        this.errors.name = 'Il Nome è obbligatorio';
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

    // Inizializzo una nuova istanza di una modal di Bootstrap
    // L'istanza è associata all'elemento con l'ID 'modal-result-message' nel template HTML
    this.modalResultMessage = new bootstrap.Modal('#modal-result-message', {})
  },
  computed: {
    servicesToShow() {
      return this.showAllServices ? (this.apartment.services || []) : (this.apartment.services || []).slice(0, 5);
    },
    hasMoreServices() {
      return this.showAllServices && (this.apartment.services || []).length > 5;
    },
  },

};
</script>

<template>
  <div class="container mt-5">
    <h3 class="text-black mb-4">{{ this.apartment.title }}</h3>

    <div class=" d-flex img-container">
      <img :src="apartment.image_path" alt="" class="object-fit-cover border rounded w-100">
    </div>

    <div class="info-apartment row mt-3">
      <div class="info-general col-md-8">
        <div class="info-price">
          <p class="fw-bold">&euro;{{ apartment.price }}/Notte</p>
          <p class="mb-0"><i class="fa-solid fa-circle fa-2xs me-1" style="color: #63E6BE;"></i>Disponibile</p>

          <div class="info-rooms mb-4">
            {{ apartment.num_of_bed }} letto/i &middot; {{ apartment.num_of_bathroom }} bagno/i &middot; {{
              apartment.square_meters }} mq
          </div>

        </div>

        <div class="info-services row py-4 pe-4 border-bottom border-top w-75">
          <span v-html="service.name" v-for="(service, index) in servicesToShow" :key="index" class="col-lg-6"></span>
        </div>

        <button v-if="!showAllServices && (apartment.services || []).length > 5" @click="showAllServices = true"
          class="btn btn-primary mt-2">Mostra Altro...</button>
        <button v-if="showAllServices" @click="showAllServices = false" class="btn btn-primary mt-2">Mostra Meno</button>


        <div class="description-apartment py-3">
          <p>{{ apartment.description }}</p>
        </div>

        <div class="map" id="map">
          <div id="marker"></div>
        </div>
      </div>


      <div class="info-seller col-md-4 mt-md-0 mt-3">
        <div class="card mb-3 d-flex flex-column">

          <!-- IMMAGINE/NOME COGNOME -->
          <div class="info-user d-flex flex-nowrap p-3">
            <div class="img">
              <img src="http://placebeard.it/640x480" class="w-100 pe-3 object-fit-cover" alt="...">
            </div>
            <div class="text">
              <p class=" mb-0 text-user">{{ apartment.user ? apartment.user.name : 'Utente' }} {{ apartment.user ?
                apartment.user.lastname : 'Anonimo' }}</p>
              <p class="mb-0 numero-user">{{ apartment.user ? apartment.user.email : 'Utente' }}</p>
            </div>
          </div>

          <div class="body-card p-3">
            <!-- FORM EMAIL-->
            <form @submit.prevent="sendMailApi()">
              <div class="formContent">

                <!-- NAME -->
                <div class="mb-3">
                  <label for="name" class="form-label me-3">Nome</label>
                  <span class="badge text-bg-danger">{{ errors.name }}</span>
                  <input v-model="name" @input="validateName" :class="nameValidationClass" type="text"
                    class="form-control" id="name" name="name">

                </div>

                <!-- EMAIL ADDRESS -->
                <div class="mb-3">
                  <label for="email_sender" class="form-label me-3">Indirizzo Email</label>
                  <span class="badge text-bg-danger">{{ errors.email_sender }}</span>
                  <input v-model="email_sender" @input="validateEmail" :class="emailValidationClass" type="email_sender"
                    class="form-control" id="email_sender" name="email_sender">

                </div>

                <!-- TEXT MESSAGE -->
                <div class="mb-3 d-flex flex-column justify-content-between">
                  <label for="text" class="form-label m-0">Messaggio:</label>
                  <div class="badge-message overflow-hidden">
                    <span class="badge text-bg-danger">{{ errors.text }}</span>
                  </div>
                  <textarea v-model="text" @input="validateText" :class="textValidationClass" class="form-control mt-2"
                    id="text" rows="5" name="text">
                          </textarea>
                </div>


                <!-- Button send message -->
                <button class="btn" :class="{ 'btn-primary': !loading, 'btn-secondary': loading }" :disabled="loading"
                  @click="sendMailApi">
                  <span v-if="loading">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Caricamento...
                  </span>
                  <span v-else>Invia</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="modal-result-message" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              {{ this.message }}
            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="btn btn-secondary">Close</button>
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


  // .modal.show {
  //   display: block !important;
  // }

  // .modal {
  //   &.show {
  //     display: block !important;
  //     background: rgba(0, 0, 0, 0.5); // Sfondo semi-trasparente
  //     position: fixed;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 1000; // Assicurati che lo z-index sia superiore a quello degli altri elementi
  //   }
  // }

}
</style>
