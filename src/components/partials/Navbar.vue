<script>
export default {
  name: "Navbar",
};
</script>

<template>

<header class="w-100">
    <div class="container my-3">
      <nav class="navbar navbar-expand-lg w-100 justify-content-between">
        <!-- Logo -->
            <a>
              <router-link class="nav-link btn fw-bold" :to = "{ name: 'Home' }" href="#">
                  <img class="logo-header" src="/logo (1).png" alt="logo (1).png" />
                </router-link>
            </a>

      <div class="d-flex">

        <ul class="list-unstyled navbar-nav">
          <li><a href="http://localhost:5000/ricerca-avanzata" >Ricerca Avanzata</a></li>  
        </ul>

        <div class="collapse navbar-collapse d-flex justify-content-end"
              aria-labelledby="navbarDropdown" id="navbarNavDarkDropdown">

            <a id="navbarDropdown"
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-pre><i class="fa-regular fa-user"></i></a>
          
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login"><i class="fa-solid fa-right-to-bracket me-2"></i>Login</a></li>

            <li><a class="dropdown-item" href="http://127.0.0.1:8000/register"><i class="fa-solid fa-pen-to-square me-2"></i>Registrazione</a></li>

            <form id="logout-form" action="#" method="POST" class="d-none">
                @csrf
            </form>
          </ul>

          </div>

          
        




        </div>

      </nav>
    </div>
</header>
</template>

<style lang="scss" scoped>
@use '../../scss/main.scss' as *;

  .logo-navbar {
    img {
      width: 100px;
    }
  }
 

  
  .logo-header {
    width: 120px;
  }
  .navbar-nav {
            display: flex;
            flex-direction: row;
            margin-right: 20px;

        li {
          a{
            color: black;
            text-decoration: none;
            padding-bottom: 10px;
            font-family: 'Figtree', sans-serif;
            font-size: 16px;

            &:hover{
              color: black;
              box-shadow: 0 2px 0 0 #17c499;
            }
          }
        }
  } 
</style>
