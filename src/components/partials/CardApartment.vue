<script>
export default {
  name: "CardApartment",
  props:{
    apartment: Object,
  }
};
</script>

<template>
  <div class="card col-lg-3 col-md-6 col-sm-6 border-0 my-3">
    <div class="card p-3 bg-light">
      <img :src="apartment.image_path" class="card-img-top rounded rounded-4" alt="Appartamento" />
      <div class="card-body">
        <h6 class="card-title single-line-ellipsis fw-bold">{{ apartment.title }}</h6>
        <p class="card-text">{{ apartment.num_of_bed }} letto/i &middot; {{ apartment.num_of_bathroom }} bagno/i &middot; {{ apartment.square_meters }} mq</p>
        <p class="card-text fw-bold">&euro;{{ apartment.price }}/notte</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
