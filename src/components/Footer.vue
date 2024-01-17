<script>

export default{
  name:'Footer',
 
}
</script>

<template>
  
    <div class="container">
      <div class="left">
        <h3>Boolando S.r.l</h3>
        <span><a href="#">Ciao</a></span>
      </div>
      <div class="right">
        <h3>Trovaci anche su</h3>
        <div class="social">
          <ul>
            <li>
            <span><a href="#">Ciao</a></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../scss/main.scss' as *;

footer {
  background-color: $text_grey;
  padding: 15px 0;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left,
.right {
  margin: 0;
}
.social ul {
  display: flex;
}
.social ul li{
  margin: 5px;
  color: white;
}
span a {
  color: $text_grey;
  text-decoration: none;
  margin-right: 5px;
  font-size: .7rem;
}
</style>
