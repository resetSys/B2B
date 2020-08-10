<template>
  <!-- 商品新增编辑 -->
  <div class="addProduct">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 商品表单 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="goodForm" label-position="rigth" label-width="100px"
        :rules="goodFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="所属分类" prop="classify">
            <el-input class="form-input" v-model="goodForm.classify" clearable
              style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型" prop="commendType">
            <el-input class="form-input" v-model="goodForm.commendType" clearable
              style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品名称" prop="name">
            <el-input class="form-input" v-model="goodForm.name" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="助记码" prop="mnemonicsCode">
            <el-input class="form-input" v-model="goodForm.mnemonicsCode" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="通用名" prop="commonName">
            <el-input class="form-input" v-model="goodForm.commonName" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specification">
            <el-input class="form-input" v-model="goodForm.specification" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="包装单位" prop="package">
            <el-input class="form-input" v-model="goodForm.package" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="中包装" prop="mediumPackage">
            <el-input class="form-input" v-model="goodForm.mediumPackage" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="计量规格" prop="metrologicalSpecification">
            <el-input class="form-input" v-model="goodForm.metrologicalSpecification" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="生产厂家" prop="producer">
            <el-input class="form-input" v-model="goodForm.producer" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="批准文号" prop="approvalNumber">
            <el-input class="form-input" v-model="goodForm.approvalNumber" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="剂型" prop="dosageForm">
            <el-input class="form-input" v-model="goodForm.dosageForm" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="类别" prop="type">
            <el-input class="form-input" v-model="goodForm.type" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="存储条件" prop="storageCondition">
            <el-input class="form-input" v-model="goodForm.storageCondition" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="建议零售价" prop="suggestedPrice">
            <el-input class="form-input" v-model="goodForm.suggestedPrice" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-input class="form-input" v-model="goodForm.brand" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="排序值" prop="sort">
            <el-input class="form-input" v-model="goodForm.sort" clearable
              style="width:200px;">></el-input>
          </el-form-item>
          <el-form-item label="封面图片" prop="cover">
            <upload accept="image/*" @fileChange="fallback"></upload>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品说明书" prop="des">
            <wang-editor :value="goodForm.des" @change="change"></wang-editor>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
//组件
import WangEditor from "@/components/WangEditor.vue";


export default {
  name: 'addProduct',
  data() {
    return {
      /**商品表单 */
      //所属分类 推荐类型 商品名称 助记码 通用名 商品规格 包装单位 中包装 计量规格
      //生产厂家 批准文号 剂型 类别 存储条件 建议零售价 品牌 封面图片 排序值 商品说明书
      goodForm:{
        classify:"",
        commendType:"",
        name:"",
        mnemonicsCode:"",
        commonName:"",
        specification:"",
        package:"",
        mediumPackage:"",
        metrologicalSpecification:"",
        producer:"",
        approvalNumber:"",
        dosageForm:"",
        type:"",
        storageCondition:"",
        suggestedPrice:"",
        brand:"",
        cover:"",
        sort:"",
        des:""
      },
      goodFormRule:{
        classify:[],
        commendType:[],
        name:[],
        mnemonicsCode:[],
        commonName:[],
        specification:[],
        package:[],
        mediumPackage:[],
        metrologicalSpecification:[],
        producer:[],
        approvalNumber:[],
        dosageForm:[],
        type:[],
        storageCondition:[],
        suggestedPrice:[],
        brand:[],
        cover:[],
        sort:[],
        des:[]
      },
    }
  },
  components: {
    WangEditor
  },
  mounted(){
    //接收role传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //执行编辑
    } else {
      //执行注册
    }
  },
  methods:{
    /**返回 */
    goBack() {
      this.$router.go(-1);
    },

    /**提交表单 */
    submitForm(){
      this.$message({
        message: '提交表单',
        type: 'info'
      });
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
    },

    /**文件上传回调 */
    fallback(file){
      this.goodForm.cover = file
    },
    /**富文本编辑内容改变回调 */
    change(val) {
      this.goodForm.des = val
    },
  }
}
</script>

<style scoped>
.addProduct{
  width: 100%;
  height: 100%;
}
</style>
