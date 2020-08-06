<template>
  <div class="pageHeader">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
  props:{
    title:{
      default:"请添加标题",
      type:String
    }
  },
  data() {
    return {

    }
  },
  methods:{
    goBack(){
      this.$emit('back');
    }
  }
}
</script>

<style scoped>
.pageHeader{
  position: relative;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  padding-top: 8px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #dcdcdc;
}
.controls{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  width: auto;
  height: auto;
}
</style>
