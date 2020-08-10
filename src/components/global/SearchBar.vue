<template>
  <div class="searchBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.searchBar{
  text-align: right;
  line-height: 37.5px;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 0.5px solid #dcdcdc;
}
</style>
