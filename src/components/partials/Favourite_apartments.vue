
<script>

import Card_apartment from './Card_apartment.vue';

export default{
  name:'Favourite_apartments',
  components:{
    Card_apartment,
  }
 
}
</script>

<template>
  <section class="favourite_apartments py-4 d-flex flex-column">

    <div class=" d-flex ms-2">
      <h4>Appartamenti preferiti dagli ospiti</h4>

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