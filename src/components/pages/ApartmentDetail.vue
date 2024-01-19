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
      coord: {
        lng: 0,
        lat: 0
      },
      map: null,
      marker: null,
      apiKey: 'Gd0dA91qzIELGRIdIuFGT9cxnvEZ0yEM',
    }
  },
  methods: {
    getApartmentApi(slug) {
      axios.get(store.apiUrl + 'apartment/' + slug, {
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(res => {
          this.apartment = res.data;
          this.coord.lat = res.data.lat;
          this.coord.lng = res.data.lon;
          console.log(this.coord);
          console.log(this.apartment);

          this.initMap();

        }).catch(e => {
          console.log(e);
        })
    },
    initMap() {

      this.map = tt.map({
        key: this.apiKey,
        container: 'map',
        basePath: 'sdk/',
        center: this.coord,
        zoom: 15,
        theme: {
          style: 'buildings',
          layer: 'basic',
          source: 'vector'
        },
      });
      this.map.addControl(new tt.NavigationControl());
      // MARKER
      this.marker = new tt.Marker().setLngLat([9.20570, 45.46700]).addTo(this.map);
      console.log('Mappa inizializzata');
    },
  },
  mounted() {
    this.slug = this.$route.params.slug;
    this.getApartmentApi(this.slug);
  }

};
</script>

<template>
  <div class="container">
    <h3 class="text-black">{{ this.apartment.title }}</h3>

    <div class=" d-flex img-container">
      <img :src="apartment.image_path" alt="" class="object-fit-cover border rounded w-100">
    </div>

    <div class="info-apartment row mt-3">
      <div class="info-general col-8">
        <div class="info-price">
          <p class="fw-bold">{{ apartment.price }}/Notte</p>
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

        <div class="map" id="map"></div>
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
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="false" aria-controls="collapseOne">
                    Contattami
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">

                    <!-- FORM EMAIL-->
                    <form>
                      <div>

                        <!-- NAME -->
                        <div class="mb-3">
                          <label for="name" class="form-label">Name</label>
                          <input v-model="name" type="text" class="form-control" id="name" name="name">
                          <span  class="badge text-bg-danger"></span>
                        </div>

                        <!-- EMAIL ADDRESS -->
                        <div class="mb-3">
                          <label for="email" class="form-label">Email address</label>
                          <input v-model="email" type="email" class="form-control" id="email" name="email">
                          <span class="badge text-bg-danger"></span>
                        </div>

                        <!-- TEXT MESSAGE -->
                        <div class="mb-3">
                          <label for="message" class="form-label">Message:</label>
                          <textarea class="form-control" id="message" rows="5"
                            name="message"></textarea>
                          <span class="badge text-bg-danger"></span>
                        </div>

                        <!-- BUTTON -->
                        <button type="submit" class="btn btn-primary">Invia</button>
                      </div>
                    </form>

                    <!-- <span class="badge text-bg-success">Email inviata correttamente</span> -->
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

  .accordion-button {
    background-color: $primary_color;
    color: $section_grey;
  }
}</style>
