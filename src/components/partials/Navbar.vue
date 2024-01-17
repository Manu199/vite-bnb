<script>

export default{
  name:'Navbar',
 
}
</script>

<template>
  <div class=" d-flex d-inline-block justify-content-between navbar container">

    <div class="logo-navbar">

      LOGO

    </div>

    <div class="menu-navbar">
      <ul class="nav justify-content-center">
        <li class="nav-item ">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>

    </div>

    <div class="login-navbar">
      LOGIN

    </div>
 
 
    
  </div>

 

</template>

<style lang="scss" scoped>

.navbar{
  height: 56px;
  
}


</style>