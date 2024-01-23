<script>
export default {
  name: "CardApartment",
  props:{
    apartment: Object,
  }
};
</script>

<template>
  <div class="col-lg-4 col-md-6 col-sm-6 mb-4">

    <router-link :to="{ name: 'ApartmenDetail', params:{ slug: apartment.slug }}" class="text-decoration-none">
      <div class="card">
        <img :src="apartment.image_path" class="card-img-top rounded rounded-4" alt="Appartamento" />
        <div class="card-body">
          <h6 class="card-title single-line-ellipsis fw-bold">{{ apartment.title }}</h6>
          <p class="card-text">{{ apartment.num_of_bed }} letto/i &middot; {{ apartment.num_of_bathroom }} bagno/i &middot; {{ apartment.square_meters }} mq</p>
          <p class="card-text fw-bold d-flex justify-content-between">
            <span>&euro;{{ apartment.price }}/notte</span>
            <span v-if="apartment.distance">{{ apartment.distance.toFixed(1) }} km</span>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.card{
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.2s;

  .card-img-top{
    height: 200px;
    object-fit: cover;
  }

  .card-body{
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}

.card:hover{
    transform: scale(1.03);
}

    
</style>
