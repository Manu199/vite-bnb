<script>
export default {
  name: "Footer",
};
</script>

<template>
  <footer>
    <div class="container mt-4">
      <div class="row">
        <!-- LOGO -->
        <div class="logo-footer col-12 col-xs-4 col-md-4 mb-2 mb-md-0 d-flex justify-content-center align-items-center justify-content-sm-center justify-content-md-start logo-footer">
          <img class="img-fluid" src="/logo.png" alt="logo" />
        </div>

        <!-- PRIVACY -->
        <div class="col-12 col-xs-4 col-md-4 d-flex justify-content-center align-items-center">
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
        <div class="col-12 col-xs-4 col-md-4 d-flex align-items-center justify-content-center justify-content-sm-center justify-content-md-end">
          <ul class="d-flex flex-row list-unstyled m-0">

            <!-- {{ --SVG ICONS-- }} -->
            <svg class="svg--source" width="0" height="0" aria-hidden="true">

              <symbol id="svg--X" viewbox="0 -7 50 30">

                <path
                  d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />

              </symbol>

              <symbol id="svg--facebook" viewbox="0 -7 16 30">
                <path
                  d="M12 3.303h-2.285c-0.27 0-0.572 0.355-0.572 0.831v1.65h2.857v2.352h-2.857v7.064h-2.698v-7.063h-2.446v-2.353h2.446v-1.384c0-1.985 1.378-3.6 3.269-3.6h2.286v2.503z" />
              </symbol>

              <symbol id="svg--instagram" viewbox="-1 0 18 18">

                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </symbol>

              <symbol id="svg--youtube" viewbox="-150 -150 800 800">

                <path
                  d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />

              </symbol>

            </svg>

            <div class="wrapper">
              <div class="connect m-0">

                <a href="https://twitter.com/?lang=it" target="_blanck" class="share X">
                  <svg role="presentation" class="svg--icon">
                    <use xlink:href="#svg--X" />
                  </svg>
                  <span class="clip">X</span>
                </a>

                <a href="https://www.facebook.com/" rel="author" target="_blanck" class="share facebook">
                  <svg role="presentation" class="svg--icon">
                    <use xlink:href="#svg--facebook" />
                    <span class="clip">FACEBOOK</span>
                  </svg>
                </a>

                <a href="https://www.instagram.com/" rel="author" target="_blanck" class="share instagram">
                  <svg role="presentation" class="svg--icon">
                    <use xlink:href="#svg--instagram" />
                    <span class="clip">INSTAGRAM</span>
                  </svg>
                </a>

                <a href="https://www.youtube.com/" target="_blanck" class="share youtube">
                  <svg role="presentation" class="svg--icon">
                    <use xlink:href="#svg--youtube" />
                    <span class="clip">YOU-TUBE</span>
                  </svg>
                </a>

              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
@use "../scss/main.scss" as *;

// LOGO
.logo-footer {
  img {
    width: 120px;
    height: 45px;
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

.clip {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.svg--source {
  display: none;
}

.svg--icon {
  width: 100%;
  max-width: 1rem;
  height: 100%;
  max-height: 5rem;
  display: block;
  margin: 0 auto;
  fill: currentColor;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.share {
  width: 2rem;
  height: 2rem;
  float: left;
  margin: 0.5rem 1rem 0.5rem 0;
  padding-top: 0.4rem;
  color: #353c4a;
  border: 0.125rem solid #f3f3f3;
  box-shadow: 0 0 8px 0 rgba(50, 50, 50, 0.15);
  border-radius: 50%;
  transition: 250ms;

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    //background: #f1f1f1;
  }

  &:focus {
    outline-color: inherit;
  }
}

.X {

  &:hover,
  &:focus {
    color: #00aced;
    box-shadow: 0 0 24px 0 #00aced;
  }
}

.github {

  &:hover,
  &:focus {
    color: #4183c4;
    box-shadow: 0 0 24px 0 #4183c4;
  }
}

.pinterest {

  &:hover,
  &:focus {
    color: #bd081c;
    box-shadow: 0 0 24px 0 #bd081c;
  }
}

.youtube {

  &:hover,
  &:focus {
    color: #cd201f;
    box-shadow: 0 0 24px 0 #cd201f;
  }
}

.facebook {

  &:hover,
  &:focus {
    color: #3b5998;
    box-shadow: 0 0 24px 0 #3b5998;
  }
}

.instagram {

  &:hover,
  &:focus {
    color: #e6614f;
    box-shadow: 0 0 24px 0 #d839dd;
  }

  .google {

    &:hover,
    &:focus {
      color: #dd4b39;
      box-shadow: 0 0 24px 0 #dd4b39;
    }
  }
}
</style>
