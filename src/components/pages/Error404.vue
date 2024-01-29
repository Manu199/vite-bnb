<script>
export default {
  name: 'Error404',
  components: {
  }
}
</script>


<template>
  <Header />

 <div class="pageNotFound d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
          <h1>Errore - 404!</h1>
          <p>La pagina che cerchi non è stata trovata.</p>
          <router-link :to="{ name: 'Home' }"  class="btn btn-outline-primary mt-3">
            <i class="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i> Torna indietro
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
@use "../../scss/partials/variables" as *;
.pageNotFound {
  height: calc(100vh - 200px);
    a {
        color: $primaryColor;
        border-color: $primaryColor;
        &:hover {
            background-color: $primaryColor;
            color: white;
            border-color: white;
        }
    }
}

</style>