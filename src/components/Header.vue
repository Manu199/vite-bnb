<script>
import Navbar from './partials/navbar.vue';
import Jumbotron from './partials/Jumbotron.vue';

export default{
  name:'Header',
  components:{
    Navbar,
    Jumbotron
  }
 
}
</script>

<template>

  <Navbar></Navbar>
  <Jumbotron></Jumbotron>

 

</template>

<style lang="scss" scoped>


</style>