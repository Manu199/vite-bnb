<script>
export default {
  name: "Navbar",
};
</script>

<template>

  <nav class="navbar">
    <div class="container">
      <div class="row w-100">

        <div class="col-3 left">
          <router-link class="nav-link btn fw-bold" :to = "{ name: 'Home' }" href="#">
            <img class="logo-header" src="/logo (1).png" alt="logo (1).png" />
          </router-link>
        </div>

        <div class="col-9 right">
          <ul class="navbar-nav">

            <li class="nav-item">
              <a class="nav-link" href="http://127.0.0.1:8000/login">Accedi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://127.0.0.1:8000/register">Registrati</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </nav>

</template>

<style lang="scss" scoped>

nav {
  .left {
    display: flex;
    align-items: center;
    justify-content: start;
    .logo-header {
      width: 150px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: end;
    .navbar-nav {
      display: flex;
      flex-direction: row;
      .nav-item {
        padding-left: 15px;
        .nav-link:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
