<script>

import Card_apartment from './Card_apartment.vue';
import axios from 'axios';
import { store } from '../../data/store';

export default{
  name:'Lista_apartment',
  components:{
    Card_apartment,
    data() {
      return {

      }
    },
    methods: {
      getApi(endpoint) {
        axios.get(endpoint)
        .then(res => {
          store.apartmentsList = res.data;
          console.log(store.apartmentsList);
        })
        .catch(e=> {
          console.log(e);
        });
      }
    },
    mounted() {
      this.getApi(store.apiUrl + 'apartments');
    },
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