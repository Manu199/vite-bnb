<script>
export default {
  name: "ApartmenDetail",
  
};
</script>

<template>
  
    <div class="container">
      <h3 class="text-black">Titolo dell'apartamento</h3>

      <div class=" d-flex img-container">
        <img  src="/public/luxfeat.jpeg" alt="" class="object-fit-cover border rounded w-100">
      </div>

      <div class="info-apartment row mt-3">
        <div class="info-general col-8">
          <div class="info-price">
            <p class="fw-bold">$200/notte</p>
            <p class="mb-0"><i class="fa-solid fa-circle fa-2xs me-1" style="color: #63E6BE;"></i>Disponibile</p>

            <div class="info-rooms mb-4">
              <span>  2 Letti</span>
              <span>  1 Bagno</span>
              <span>  480 mq</span>
            </div>

          </div>

          <div class="info-services row py-4 pe-4 border-bottom border-top w-75">
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
            <span class="col-6">Servizio</span>
          </div>

          <div class="description-apartment py-3">
            <p class=" ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore autem amet magnam natus perferendis molestias et est saepe illum dolorum quia ad soluta, omnis veritatis vel fuga quasi tempora in?</p>
          </div>

          <div class="map bg-light">

          </div>
        </div>


        <div class="info-seller col-4">
            <div class="card mb-3 px-0 d-flex flex-column">

              <div class="info-user d-flex flex-nowrap p-2">
                <div class="img">
                  <img src="http://placebeard.it/640x480" class="w-100 pe-3 object-fit-cover" alt="...">
                </div>
                <div class="text">
                  <p class=" mb-0 text-user">James</p>
                  <p class="mb-0 numero-user">3322244567</p>
                </div>
              </div>

              <div class="contact p-2">
                <button class="btn btn-primary w-100 d-inline-flex justify-content-center btn-text"><a href="#"></a>Contattami</button>
              </div>
              
            </div>
        </div>
      </div>

      


    </div>
  
  
</template>

<style lang="scss" scoped>

.container{

  .img{
    width: 80px;
  }

  .text-user{
    font-size: 13px;
  }

  .numero-user{
    font-size: 10px;
  }

  .btn-text{
    font-size: 100%;
  }

  .map{
    width: 100%;
    height:250px ;
  }


}


</style>
