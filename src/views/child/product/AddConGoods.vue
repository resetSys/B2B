<template>
  <div class="addConGoods">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <el-form-item label="商品标识" prop="goodsId">
          <el-input v-model="addForm.goodsId" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择商品</el-button>
        </el-form-item>
        <el-form-item label="单位可销" prop="unitY">
          <el-input v-model="addForm.unitY" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择单位</el-button>
        </el-form-item>
        <el-form-item label="单位禁销" prop="unitN">
          <el-input v-model="addForm.unitN" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择单位</el-button>
        </el-form-item>
        <el-form-item label="区域可销" prop="areaY">
          <el-input v-model="addForm.areaY" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择区域</el-button>
        </el-form-item>
        <el-form-item label="区域禁销" prop="areaN">
          <el-input v-model="addForm.areaN" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择区域</el-button>
        </el-form-item>
        <el-form-item label="类型可销" prop="typeY">
          <el-input v-model="addForm.typeY" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择类型</el-button>
        </el-form-item>
        <el-form-item label="类型禁销" prop="typeY">
          <el-input v-model="addForm.typeN" clearable style="width:200px"></el-input>
          <el-button type="primary" style="margin-left:5px">选择类型</el-button>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button type="primary">提交</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: 'addConGoods',
  data() {
    return {
      /**新增表单 */
      //商品ID 单位可销 单位禁销 区域可销 区域禁销 类型可销 类型禁销
      addForm:{
        goodsId:"",
        unitY:"",
        unitN:"",
        areaY:"",
        areaN:"",
        typeY:"",
        typeN:"",
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    PageHeader
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.addConGoods{
  width: 100%;
  height: 100%;
}
</style>
