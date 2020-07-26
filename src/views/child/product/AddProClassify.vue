<template>
  <!-- 新增商品分类 -->
  <div class="addProClassify">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="父类别" prop="parent">
            <el-select v-model="addForm.parent" placeholder="请选择" clearable style="width:200px">
              <el-option label="开启" value="开启"></el-option>
              <el-option label="关闭" value="关闭"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addForm.sort" clearable style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="类别名称" prop="name">
            <el-input v-model="addForm.name" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="调用别名" prop="alias">
            <el-input v-model="addForm.alias" clearable style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="seo标题" prop="seoTit">
            <el-input v-model="addForm.seoTit" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="seo描述" prop="seoDes">
            <el-input v-model="addForm.seoDes" clearable style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="分类图片" prop="img">
            <img-upload action=""></img-upload>
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
import ImgUpload from "@/components/ImgUpload";

export default {
  name: 'addProClassify',
  data() {
    return {
      /**新增分类表单 */
      //父类别 排序 类别名称 分类图片 调用别名 seo标题 seo描述
      addForm:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      },
      addFormRule:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      },
    }
  },
  components: {
    PageHeader,
    ImgUpload
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    },
    /**图片成功上传回调 */
    imgFallback(url){
      this.addForm.view = url;
    }
  }
}
</script>

<style scoped>
.addProClassify{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
