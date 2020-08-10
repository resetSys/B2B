<template>
  <div class="controlBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'controlBar',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.controlBar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: .5px solid #dcdcdc;
}
</style>
