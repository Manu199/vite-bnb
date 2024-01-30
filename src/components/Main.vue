<script>
export default {
  name: "Main",
  components: {

  },
};
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped>

main{
  margin-top: 80px;
  min-height: calc(100vh - 184px);

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - 262px);
  }
}












</style>