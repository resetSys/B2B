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
/* 修改element默认样式 */
/* 滚动容器 */
.el-scrollbar__wrap{
  /* overflow-x: hidden; */
}
/* navmenu导航菜单 */
.el-submenu__title,.el-menu-item{
  /* display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box; */
}
.el-menu-item-group__title{
  /* text-align: left; */
}
/* 解决下拉框显示不全的bug */
.el-scrollbar__wrap{
  /* margin-bottom: 0 !important; */
}
/* tabs margin-bottom设置为0 */
.el-tabs__header{
  /* margin:0; */
}
</style>
