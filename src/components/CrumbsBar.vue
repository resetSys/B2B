<template>
  <div class="crumbsBar">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-s-home"></i>平台</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in crumbsList" :key="'b'+index"
        >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="crumbs-controls">
      <slot>
        <el-button type="primary" @click="handleRefresh">
          <i ref="refresh" :class="{'el-icon-refresh':true,'refreshAnima':isRefresh}"></i>
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'crumbsBar',
  props:{
    crumbsList:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      isRefresh:false
    }
  },
  components: {

  },
  methods:{
    handleRefresh(){
      this.isRefresh = true;
      let timer = window.setTimeout(()=>{
        this.isRefresh = false;
        clearTimeout(timer);
      },1000)
    }
  },
  
}
</script>

<style scoped>
.crumbsBar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #dcdcdc;
}
.crumbs-controls{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 500px;
  height: 100%;
}
.refreshAnima{
  transition: transform 1s;
  transform: rotate(360deg);
}
</style>
