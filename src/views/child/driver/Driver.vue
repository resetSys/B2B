<template>
  <!-- 用户引导 -->
  <div class="driver">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['引导指南',$route.meta.title]">
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar class="scrollbar">
      <div class="wrapper">
        <el-card class="box-card">
          <p class="box-card-title">
            <i class="el-icon-s-opportunity"></i>点击按钮可查看本管理系统的基本操作
          </p>
          <el-button type="primary" @click.stop="guide">引导</el-button>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
//混入driver
import driver from "@/mixins/drivers/driver"

export default {
  name: 'driver',
  mixins:[driver],
  data() {
    return {
      
    }
  },
  components: {

  },
  
}
</script>

<style scoped>
.driver{
  width: 100%;
  height: 100%;
}
.scrollbar{
  height:calc(100% - 40px);
}
.wrapper{
  padding: 20px;
  box-sizing: border-box;
}
/********** 卡片内样式 **********/
.box-card{

}
.box-card-title{
  margin-bottom: 20px;
}
.box-card-title>i{
  color: #ffc107;
}
</style>
