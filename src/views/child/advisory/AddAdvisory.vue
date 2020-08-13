<template>
  <div class="addAdvisory">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" 
        label-position="rigth"
        label-width="100px"
        :rules="addFormRule"
        ref="addForm">
        <div class="form-item-warp">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="addForm.title" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="subTitle">
            <el-input v-model="addForm.subTitle" style="width:200px;"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-warp">
          <el-form-item label="文章分类" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择" clearable style="width:200px">
              <el-option label="全部" value="99"></el-option>
              <el-option label="新闻动态" value=""></el-option>
              <el-option label="医疗咨询" value=""></el-option>
              <el-option label="监管信息" value=""></el-option>
              <el-option label="公告" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值" prop="sort">
            <el-input-number v-model="addForm.sort" :min="1" :controls="false" style="width:200px;"></el-input-number>
          </el-form-item>
        </div>
        <div class="form-item-warp">
          <el-form-item label="文章摘要" prop="abstract">
            <el-input
               style="width:800px;"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              v-model="addForm.abstract">
            </el-input>
          </el-form-item>
        </div>
        <div class="form-item-warp">
          <el-form-item label="文章内容" prop="content">
            <wang-editor :value="addForm.content" @change="change" style="width:800px">
            </wang-editor>
          </el-form-item>
        </div>
        <div class="form-item-wrap" style="margin-top:20px">
          <el-form-item label="" prop="">
            <el-button type="primary" @click="submitForm">提交</el-button>
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
  name: 'addAdvisory',
  data() {
    return {
      //新增表单
      //文章标题 简略标题 文章类型 排序 发布日期 文章摘要 文章正文
      addForm:{
        title:"",
        subTitle:"",
        type:"",
        sort:"",
        releaseDate:"",
        abstract:"",
        content:""
      },
      addFormRule:{}
    }
  },
  components: {
    WangEditor
  },
  mounted(){
    //接收role传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //将row数据放进表单中
      
    } else {
      //执行注册
    }
  },
  methods:{
    /**富文本编辑内容改变回调 */
    change(val) {
      this.addForm.content = val
    },
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },

    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'info'
          });
        }
       });
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
    },
  }
}
</script>

<style scoped>
.addAdvisory{
  width: 100%;
  height: 100%;
}
</style>
