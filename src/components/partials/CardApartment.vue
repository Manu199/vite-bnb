<script>
export default {
  name: "CardApartment",
  props:{
    apartment: Object,
  }
};
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4  mb-4">

    <router-link :to="{ name: 'ApartmenDetail', params:{ slug: apartment.slug }}" class="text-decoration-none">
      <div class="card">
        <div class="position-relative">
          <img :src="apartment.image_path" class="card-img-top rounded rounded-4" alt="Appartamento" />
          <div v-if="apartment.is_sponsored" class="sponsor-badge text-bg-warning">
            <span>Sponsorizzato</span>
          </div>
        </div>
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

.sponsor-badge{
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    transform: translate(-30%, 166%) rotate(-45deg);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 12px;
    font-weight: bold;
}

    
</style>
