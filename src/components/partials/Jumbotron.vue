<script>
import { store } from "../../data/store";
import InputWithAutocomplete from "./InputWithAutocomplete.vue";

export default {
  name: "Jumbotron",
  components:{
    InputWithAutocomplete
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="position-relative mb-5">
    <div class="jumbotron">
      <div class="black-jumbotron"></div>
      <div class="container position-absolute">
        <div class="row">
          <div class="col">
            <h2 class="text-center mb-3 text-white z-3">
              Trova l'appartamento dei tuoi sogni
            </h2>
            <div class="position-relative input-search">
              <InputWithAutocomplete/>
              <button @click="store.toSearch" class="btn btn-search position-absolute"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
        </div>
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
  background-image: url(/image-verde.jpeg);
  background-size: cover;
  background-position: center;
}

.black-jumbotron {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

#list-search {
  position: absolute;
  z-index: 3;
  top: 100%;
  width: 100%;
  padding-right: 50px;
}

.cursor-pointer{
  cursor: pointer;
}

@media screen and (max-width: 576px) {
    .input-search {
        width: 100%;
    }
}


@media screen and (min-width: 576px) {
    .input-search { 
        max-width: 1000px;
        margin: 0  auto;
    }
}
</style>
