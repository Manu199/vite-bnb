<script>
export default {
  name: "Navbar",
};
</script>

<template>

  <nav class="navbar">
    <div class="container">
      <div class="row w-100">

        <div class="col-4 left">
          <router-link class="nav-link btn fw-bold" :to = "{ name: 'Home' }" href="#">
            <img class="logo-header" src="/logo (1).png" alt="logo (1).png" />
          </router-link>
        </div>

        <div class="col-4 middle">
            <a href="http://localhost:5000/ricerca-avanzata"><div class="_btn">Ricerca Avanzata</div></a>
        </div>

        <div class="col-4 right">
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
@use '../../scss/main.scss' as *;

nav {
  .left {
    display: flex;
    align-items: center;
    justify-content: start;
    .logo-header {
      width: 150px;
    }
  }
  .middle {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      text-decoration: none;
      ._btn {
        background-color: $primary_color;
        padding: 3px 10px 3px 10px;
        border-radius: 5px;
        color: white;
      }
      ._btn:hover {
        transform: scale(1.1);
      }
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
