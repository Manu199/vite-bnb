<script>
export default {
  name: "ApartmenDetail",
  
};
</script>

<template>
  <div class="dettaglio">
    <div class="container">
      <h1 class="text-danger">Titolo dell'apartamento</h1>
      <h2>Disponibile</h2>

      <div class="container-fluid d-flex img-container">
        <img  src="/public/luxfeat.jpeg" alt="" class="object-fit-cover border rounded w-100">
      </div>

      <div class="container-fluid info-apartment row">
        <div class="info-general col-8">
          <div class="info-price">
            <h3>$200/notte</h3>
            <span>Disponibile</span>

            <div class="info-rooms">
              <span>  2 Letti</span>
              <span>  1 Bagno</span>
              <span>  480 mq</span>
            </div>

          </div>

          <div class="info-services row">
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
          </div>
        </div>


        <div class="info-seller col-4">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="http://placebeard.it/640x480" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Nome</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
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

.dettaglio{
  width: 100%;
  height: 100vh;
  background-color: white;
}
</style>
