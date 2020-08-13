<template>
  <!-- 添加积分商品 -->
  <div class="addIntGoods">
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
          <el-form-item label="商品分类" prop="classify">
            <el-input v-model="addForm.classify" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="展示楼层" prop="floor">
            <el-input v-model="addForm.floor" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="生产厂家" prop="producer">
            <el-input v-model="addForm.producer" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="addForm.price" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="积分" prop="creditsExchange">
            <el-input v-model="addForm.creditsExchange" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="repertory">
            <el-input v-model="addForm.repertory" clearable style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="上传图片" prop="image">
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
import ImgUpload from "@/components/ImgUpload";

export default {
  name: 'addIntGoods',
  data() {
    return {
      /**新增表单 */
      //商品名称 商品规格 包装单位 商品分类 展示楼层 上传图片 生产厂家 价格 积分 库存
      addForm:{
        name:"",
        specification:"",
        packingNnit:"",
        classify:"",
        floor:"",
        image:"",
        producer:"",
        price:"",
        creditsExchange:"",
        repertory:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    ImgUpload
  },
  methods:{
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
.addIntGoods{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
