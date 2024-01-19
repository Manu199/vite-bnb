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
    }
  },
  methods: {
    getApartmentApi(slug) {
      axios.get(store.apiUrl + 'apartment/' + slug)
        .then(res => {
          this.apartment = res.data;
          console.log(this.apartment);

          this.initMap();

        }).catch(e => {
          console.log(e);
        })
    },
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

      console.log(marker);

      marker.addTo(map);
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
            <button class="btn btn-primary w-100 d-inline-flex justify-content-center btn-text"><a
                href="#"></a>Contattami</button>
          </div>

        </div>
      </div>
    </div>




  </div>
</template>

<style lang="scss" scoped>
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
    width: 10%;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
}
</style>
