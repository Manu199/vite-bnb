<script>
export default {
  name: "Navbar",

  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
  },
};
</script>

<template>

<header class="header-fix">
  <nav class="navbar">
    <div class="container">

      <nav class="navbar navbar-expand w-100 justify-content-between">
        <!-- Logo -->
              <router-link class="nav-link btn fw-bold" :to = "{ name: 'Home' }">
                  <img class="logo-header" src="/logo.png" alt="logo" />
              </router-link>
  
        <div class="d-none d-lg-block">
    
          <ul class="navbar-nav ">

            <li class="nav-item" :class="{ 'active': isActive('Home') }">
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>

            <li class="nav-item" :class="{ 'active': isActive('AdvancedSearch') }">
              <router-link :to="{ name: 'AdvancedSearch' }">Ricerca Avanzata</router-link>
            </li>

            <li class=" collapse dropdown navbar-collapse d-flex justify-content-end hover-fix me-0" >
      
              <a id="navbarDropdown"
              class="nav-link dropdown-toggle user-guest"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              v-pre
              >
              <i class="fa-regular fa-user"></i></a>
              
              <div class="dropdown-menu dropdown-menu-end">

                <a class="dropdown-item" href="http://127.0.0.1:8000">Area personale</a>
    
                <a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrazione</a>

                <a class="dropdown-item" href="http://127.0.0.1:8000/login">Login</a>
              </div>
      
            </li>
          </ul>
    
        </div>


        <!-- MOBILE VIEW -->



        <div class="d-lg-none">

          <ul class="navbar-nav">

            <li class="collapse dropdown navbar-collapse d-flex justify-content-end hover-fix">

                <a id="navbarDropdown"
                class="nav-link dropdown-toggle user-guest"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-pre><i class="fa-regular fa-user"></i></a>
              
              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                <router-link class="dropdown-item" :to = "{ name: 'Home' }" >Home</router-link>
                
                <router-link class="dropdown-item" :to = "{ name: 'AdvancedSearch' }">Ricerca Avanzata</router-link>

                <a class="dropdown-item" href="http://127.0.0.1:8000">Area personale</a>

                <a class="dropdown-item" href="http://127.0.0.1:8000/login">Login</a>
                
                <a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrazione</a>


              </div>

            </li>

          </ul>

        </div>

      </nav>

    </div>
  </nav>
</header>
</template>

<style lang="scss" scoped>
@use '../../scss/main.scss' as *;


.header-fix {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav{
  .logo-header {
    width: 120px;
  }

}
  
  .navbar-nav {
    display: flex;
    flex-direction: row;

    li.hover-fix{
      margin: 0;
    }

    li.hover-fix:hover {
      box-shadow: none;
    }

    li {
        color: black;
        text-decoration: none;
        display: flex;
        padding-left: 0 !important;
        padding-right: 0 !important;
        align-items: center;
        justify-content: center;
        font-family: 'Figtree', sans-serif;
        font-size: medium;
        margin: 0 10px;

        &.active {
          background-color: transparent;
          color: black;
          border-radius: 0;
          box-shadow: 0 2px 0 0 $primaryColor;
        }

        &:hover{
          color: black;
          box-shadow: 0 2px 0 0 $primaryColor;
          border-radius: 0px;
        }
        
        a{
          text-decoration: none;
          text-decoration-color: black;
          color: black;
        }
    }
    .dropdown-menu {

        a {
            box-shadow: none;
            width: 100%;
            margin: 0;
            padding-left: 10px !important;


        }
        a:hover {
            box-shadow: none;
            border-radius: 3px;
            border: 0;
        }
        .dropdown-item:active {
            color: var(--bs-dropdown-link-active-color);
            text-decoration: none;
            background-color:  $primaryColor;
          }
      }

    li.dropdown {
      a {
          box-shadow: none;
          padding-left: 10px !important;
          padding-right: 10px !important ;

      }
      a:hover {
          box-shadow: none;
          border-radius: 5px;
      }
    }

    .user-guest {
        padding: 5px 10px !important;
        background-color: $primaryColor;
        border-radius: 5px;
        color: white !important;
        margin-right: 0;

        &:hover{
          color: white !important;
        }

        &::after{
          margin-left: 0.48em;
        }
    }
  } 
</style>
