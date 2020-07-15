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
      isRefresh:false,
      timer:null
    }
  },
  components: {

  },
  methods:{
    handleRefresh(){
      //添加防抖
      this.isRefresh = true;
      if(this.timer){
        window.clearTimeout(this.timer);
      } else {
        window.console.log("执行刷新");
      }
      this.timer = window.setTimeout(()=>{
        window.console.log("执行setTimeOut")
        this.isRefresh = false;
        window.clearTimeout(this.timer);
        this.timer = null;
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
