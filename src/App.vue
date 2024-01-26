<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Main
  },
};
</script>

<template>
  <Header></Header>
  <Main class="main"></Main>
  <Footer></Footer>
</template>

<style lang="scss">
  @import '../src/scss/main.scss';

  .main {
    min-height: calc(100vh - 225px);
  }
</style>
