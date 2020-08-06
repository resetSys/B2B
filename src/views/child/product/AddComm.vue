<template>
  <!-- 新增推荐商品 -->
  <div class="addComm">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addForm.name" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="推荐位置" prop="recommPosition">
            <el-input v-model="addForm.recommPosition" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="状态" prop="status">
            <el-input v-model="addForm.status" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addForm.sort" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="" prop="">
            <el-button type="primary">提交</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: 'addComm',
  data() {
    return {
      /**新增表单 */
      //推荐商品 位置类型 状态 排序
      addForm:{
        name:"",
        recommPosition:"",
        status:"",
        sort:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    PageHeader
  },
  methods:{
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },
    /**图片成功上传回调 */
    imgFallback(url){
      this.addForm.image = url;
    }
  }
}
</script>

<style scoped>
.addComm{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
