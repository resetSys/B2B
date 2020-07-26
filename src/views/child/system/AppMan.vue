<template>
  <!-- app版本管理 -->
  <div class="appMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['系统配置',$route.meta.title]">
    </crumbs-bar>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="版本名称" prop="name">
            <el-input v-model="addForm.name" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="原版本号" prop="oldVersion">
            <el-input v-model="addForm.oldVersion" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="新版本号" prop="newVersion">
            <el-input v-model="addForm.newVersion" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="强制更新" prop="isForce">
            <el-input v-model="addForm.isForce" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="APK文件" prop="file">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="更新说明" prop="des">
            <el-input v-model="addForm.des" clearable style="width:200px;"></el-input>
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
//组件
import CrumbsBar from "@/components/CrumbsBar.vue";

export default {
  name: 'appMan',
  data() {
    return {
      /**新增表单 */
      //版本名称 原版本号 新版本号 强制更新 APK文件 更新说明
      addForm:{
        name:"",
        oldVersion:"",
        newVersion:"",
        isForce:"",
        file:"",
        des:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    CrumbsBar
  },
  methods:{
    /**重置表单|刷新页面 */
    handleRefresh(){
      
    },
  }
}
</script>

<style scoped>
.appMan{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
