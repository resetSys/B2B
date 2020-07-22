<template>
  <div class="pageHeader">
    <el-page-header @back="goBack" :content="title"></el-page-header>
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
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #dcdcdc;
}
</style>
