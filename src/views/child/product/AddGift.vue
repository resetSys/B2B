<template>
  <!-- 新增礼品 -->
  <div class="addGift">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addForm.name" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specification">
            <el-input v-model="addForm.specification" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="包装单位" prop="packingNnit">
            <el-input v-model="addForm.packingNnit" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="生产厂家" prop="producer">
            <el-input v-model="addForm.producer" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="建议零售价" prop="repertory">
            <el-input v-model="addForm.repertory" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="retailPrice">
            <el-input v-model="addForm.retailPrice" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="排序值" prop="sort">
            <el-input v-model="addForm.sort" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="封面图片" prop="view">
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
import PageHeader from "@/components/PageHeader.vue";
import ImgUpload from "@/components/ImgUpload";

export default {
  name: 'addGift',
  data() {
    return {
      /**新增表单 */
      //商品名称 商品规格 包装单位 生产厂家 建议零售价 库存 封面图片 排序值
      addForm:{
        name:"",
        specification:"",
        packingNnit:"",
        producer:"",
        repertory:"",
        retailPrice:"",
        view:"",
        sort:""
      },
      /**新增表单规则 */
      addFormRule:{}
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
.addGift{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
