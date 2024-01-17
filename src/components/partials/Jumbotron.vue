<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  name: "Jumbotron",
  data() {
    return {};
  },

  methods: {
    searchApartmentApi(endpoint) {
      axios
        .get(endpoint, {
          params: {
            lat: 41.89056,
            lon: 12.49427,
            radius: 20,
          },
        })
        .then((res) => {
          store.searchListApartments = res.data;
          console.log(store.searchListApartments);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.searchApartmentApi(store.apiUrl + "searchapartment");
  },
};
</script>

<template>
  <div class="position-relative">
    <div class="jumbotron">
      <div class="black-jumbotron"></div>
      <div class="content-jumbotron d-flex flex-column justify-content-center position-absolute top-0 bottom-0 start-50 translate-middle-x">
        <h2 class="text-center mb-3 text-white z-3">
          Trova l'appartamento dei tuoi sogni
        </h2>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../../public/image-verde.jpeg);
  background-size: cover;
  background-position: center;
}

.black-jumbotron {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.349);
}
</style>
