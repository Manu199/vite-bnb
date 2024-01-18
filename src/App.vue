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
  <Main></Main>
  <Footer></Footer>
</template>

<style scoped></style>
