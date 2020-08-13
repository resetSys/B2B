<template>
  <!-- 添加活动模板 -->
  <div class="addTemplate">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="addForm.title" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="内容" prop="content">
            <wang-editor :value="addForm.content" @change="change"></wang-editor>
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
  name: 'addTemplate',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      //推荐商品 位置类型 状态 排序
      addForm:{
        title:"",
        content:"<p>在此输入内容</p>",
      },
      /**新增表单规则 */
      addFormRule:{},
      isClear: false,
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
      // for (const key in this.addForm) {
      //   this.addForm[key] = row[key];
      // }
    } else {
      //执行注册
    }
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    },
    /**富文本编辑内容改变回调 */
    change(val) {
      this.addForm.content = val
    },
  }
}
</script>

<style scoped>
.addTemplate{
  width: 100%;
  height: 100%;
}
</style>
