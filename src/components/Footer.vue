<script>
export default {
  name: "Footer",
};
</script>

<template>
  <div class="container">
    <div
      class="content-footer d-flex flex-column flex-sm-row justify-content-between row"
    >
      <!-- LOGO -->

      <div
        class="logo-footer d-flex justify-content-center col-12 col-sm-4 mb-3 mb-sm-0"
      >
        <img class="logo img-fluid" src="../../public/logo (1).png" alt="" />
      </div>

      <!-- PRIVACY -->

      <div
        class="privacy-footer col-12 col-sm-4 mb-3 mb-sm-0 d-flex align-items-center"
      >
        <ul class="d-flex flex-row list-unstyled m-0 justify-content-center">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Condizioni</a>
          </li>
        </ul>
      </div>

      <!-- MENU FOOTER -->

      <div class="menu-footer col-12 col-sm-4 d-flex align-items-center">
        <ul class="d-flex flex-row list-unstyled m-0 justify-content-center">
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../scss/main.scss" as *;

// LOGO
.logo-footer {
  img {
    width: 120px;
  }
}

ul {
  li {
    margin-left: 10px;

    a {
      text-decoration: none;
      color: $text_grey;
    }
  }
}
</style>
