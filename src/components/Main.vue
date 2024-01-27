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
  margin-top: 100px;
  min-height: calc(100vh - 225px);
}

</style>