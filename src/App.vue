<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
/* 全局公共样式 */
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
@import url("./assets/icon/iconfont.css");
*{
  padding: 0;
  margin: 0;
}
body,html{
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c2c2c;
  width: 100%;
  height: 100%;
}

</style>
