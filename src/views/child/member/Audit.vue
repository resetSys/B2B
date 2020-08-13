<template>
  <div class="audit">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="infoForm" label-position="rigth" label-width="100px"
        ref="infoForm">
        <div class="form-item-wrap">
          <el-form-item label="机构">
            <el-input class="form-input" v-model="infoForm.organName" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input class="form-input" v-model="infoForm.company" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="客户类型">
            <el-input v-model="infoForm.clientType" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="infoForm.name" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="手机">
            <el-input v-model="infoForm.tel" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="infoForm.sex" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="邮箱">
            <el-input v-model="infoForm.email" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="infoForm.address" clearable
              style="width:200px;" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 回执意见 -->
      <el-form :model="opinionForm" label-position="rigth" label-width="100px"
        :rules="goodFormRule" ref="opinionForm">
        <div class="form-item-wrap">
          <el-form-item label="回执意见" prop="opinion">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              style="width:600px"
              v-model="opinionForm.opinion">
            </el-input>
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

export default {
  name: 'audit',
  data() {
    return {
      /**基本信息表单 */
      //机构 单位名曾 客户类型 姓名 手机 性别 邮箱 省市区 地址
      infoForm:{
        organName:"",
        company:"",
        clientType:"",
        name:"",
        tel:"",
        sex:"",
        email:"",
        address:""
      },
      /**审批意见 */
      opinionForm:{
        ipinion:""
      }
    }
  },
  components: {
    
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
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },

    /**提交表单 */
    submitForm(){
      this.$refs['opinionForm'].validate((valid)=>{
        if(valid){
          this.$message({
            message: '提交表单',
            type: 'info'
          });
        }
      })
    },
    /**重置表单 */
    resetForm(){
      this.$refs['opinionForm'].resetFields();
    },
  }
}
</script>

<style scoped>
.audit{
  width: 100%;
  height: 100%;
}
</style>
