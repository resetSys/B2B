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
              <el-option label="一级路径" value="0"></el-option>
              <el-option 
                v-for="(item,index) in classifyList" 
                :key="index"
                :label="item.label" 
                :value="item.value">
              </el-option>
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
            <el-button type="info" @click="resetForm">重置</el-button>
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
//网络
import { request } from "@/request";

export default {
  name: 'addProClassify',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
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
      classifyList:[]/**分类列表 */
    }
  },
  components: {
    PageHeader,
    ImgUpload
  },
  mounted(){
    window.console.log(this.$route.query.row);
    //接收传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //将row数据放进表单中
      for (const key in row) {
        this.addForm[key] = row[key];
      }
    } else {
      //执行注册
    }
    this.getClassify()
  },
  methods:{
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },
    /**图片成功上传回调 */
    imgFallback(url){
      this.addForm.view = url;
    },

    /**获取一级分类 */
    /**获取表格 */
    getClassify(){
      request({
        url:"HTGoodsAdmin/GetGoodsCheckBox",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
        },
      }).then((res) => {
        let {Success,Data} = res.data.models;
        let categoryList = Data[0].CategoryList;
        this.classifyList = [];
        if (Success) {
          categoryList.forEach(ele => {
            this.classifyList.push({
              label:ele.Title,
              value:ele.CategoryId
            })
          });
        }
        window.console.log(res);
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          request({
            url:"HTUserAdmin/SaveRole",
            method:"post",
            data:{
              entId:this.organId,
              userId:this.adminId,
              roleName:this.addForm.name,
              dedcribe:this.addForm.des,
              xEntId:this.addForm.roleOrganId,
              listStr:this.addForm.funId,
              sort:this.addForm.sort,
              roleId:this.addForm.roleId,
            },
          }).then((res) => {
            let {Success,MsgCode,Message} = res.data.models;
            if (Success) {
              //提示新增功能成功,关闭dialog,刷新数据
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.goBack();//返回上一页会自动重置表单
            } else {
              //失败提示
              this.$message({
                message: '操作失败'+MsgCode+Message,
                type: 'error'
              });
            }
            window.console.log(res)
          }).catch((err) => {
            window.console.log(err);
          });
        } else {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          });
        }
      })
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
      //树形控件也必须重置
      this.$refs['tree'].setCheckedKeys([]);
    },
  }
}
</script>

<style scoped>
.addProClassify{
  width: 100%;
  height: 100%;
}
</style>
