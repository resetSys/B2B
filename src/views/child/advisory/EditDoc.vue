<template>
  <!-- 帮助文档编辑 -->
  <div class="editDoc">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单 -->
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
        </div>
        <div class="form-item-warp">
          <el-form-item label="排序值" prop="sort">
            <el-input-number v-model="addForm.sort" :min="1" :controls="false" style="width:200px;"></el-input-number>
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
  name: 'editDoc',
  data() {
    return {
      //新增表单
      //父级id 文章标题 排序 文章正文
      addForm:{
        title:"",
        sort:"",
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
.editDoc{
  width: 100%;
  height: 100%;
}
</style>
