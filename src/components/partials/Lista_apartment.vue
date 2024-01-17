<script>

import Card_apartment from './Card_apartment.vue';

export default{
  name:'Lista_apartment',
  components:{
    Card_apartment,
  }
 
}
</script>

<template>
  <section class="lista_apartment py-4 d-flex flex-column">

    <div class=" d-flex ms-2">
      <h4>Lista appartamenti</h4>

    </div>
    
   
    <div class="row justify-content-start">
      <Card_apartment></Card_apartment>
      <Card_apartment></Card_apartment>
      <Card_apartment></Card_apartment>
      <Card_apartment></Card_apartment>
     
    </div>
   


  </section>

 
 

</template>

<style lang="scss" scoped>



</style>