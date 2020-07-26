<template>
  <!-- 广告位管理 -->
  <div class="advertising">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['系统配置',$route.meta.title]">
    </crumbs-bar>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm"> 
        <div class="form-item-wrap">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker
              style="width:200px;"
              v-model="addForm.startTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker
              style="width:200px;"
              v-model="addForm.endTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="链接地址" prop="link">
            <el-input v-model="addForm.link" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="广告展示宽度" prop="width">
            <el-input v-model="addForm.width" clearable style="width:200px;">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="广告展示高度" prop="height">
            <el-input v-model="addForm.height" clearable style="width:200px;">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="广告图" prop="image">
            <img-upload action="" @fallback="imgFallback"></img-upload>
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
import ImgUpload from "@/components/ImgUpload";

export default {
  name: 'advertising',
  data() {
    return {
       /**新增表单 */
      //开始日期 结束日期 链接地址  广告展示长度 广告展示宽度 广告图
      addForm:{
        startTime:"",
        endTime:"",
        link:"",
        width:"",
        height:"",
        image:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    CrumbsBar,
    ImgUpload
  },
  methods:{
    /**图片成功上传回调 */
    imgFallback(url){
      this.addForm.image = url;
    },
    /**重置表单|刷新页面 */
    handleRefresh(){
      
    },
  }
}
</script>

<style scoped>
.advertising{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
