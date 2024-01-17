<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <header class="navBar">
    <div class="container my-3">
      <div class="row">
        <!-- Logo -->
        <div class="col-2">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link btn fw-bold" href="#">
                <img class="logo-header" src="/logo (1).png" alt="logo (1).png" />
              </a>
            </li>
          </ul>
        </div>

        <div class="col-10 d-flex align-items-center justify-content-end">
          <!-- {{-- HAMBURGUER MENU --}} -->
          <button
            class="navbar-toggler d-md-none d-lg-none"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <div
            class="dropdown-menu dropdown-menu-end d-md-flex d-lg-flex border-0"
            aria-labelledby="navbarDropdown"
          >
            <div class="nav-item dropdown d-flex align-items-center ms-2">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-pre
              >
                <i class="fa-regular fa-user"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a class="dropdown-item" href="http://127.0.0.1:8000/login">Login</a>
                <a class="dropdown-item" href="http://127.0.0.1:8000/register"
                  >Registrazione</a
                >
                <form id="logout-form" action="#" method="POST" class="d-none">
                  @csrf
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.logo-navbar {
  img {
    width: 100px;
  }
}

.navBar {
  width: 100vw;
}
.btn-header {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.822);
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.btn-header:hover,
.btn-header.active {
  background-color: transparent;
  color: black;
  border-radius: 0;
  box-shadow: 0 2px 0 0 #17c499;
}

.btn-header-2 {
  background-color: #10d1a0;
  color: white;
  border-radius: 5px;
}

.btn-header-2:hover,
.btn-header-2.active {
  background-color: #48bb9e;
  color: white;
  border-radius: 5px;
}

.logo-header {
  width: 120px;
}
</style>
