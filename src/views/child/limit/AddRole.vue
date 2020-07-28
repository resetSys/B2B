<template>
  <!-- 新增角色 -->
  <div class="addRole">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 表单容器 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="addForm" label-position="rigth" label-width="100px"
        :rules="addFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addForm.sort" clearable style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="角色机构" prop="roleOrganId">
            <el-input v-model="addForm.roleOrganId" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="des">
            <el-input v-model="addForm.des" clearable style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="功能选择" prop="funId">
            <el-tree
              :data="funList"
              show-checkbox
              node-key="id">
            </el-tree>
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


export default {
  name: 'addRole',
  data() {
    return {
       /**新增表单 */
      //管理员id 机构id 角色名称 描述 角色机构id 功能id  排序 角色id
      addForm:{
        adminId:"",
        organId:"",
        roleName:"",
        roleId:"",
        des:"",
        funId:"",
        sort:"",
        roleOrganId:""
      },
      /**新增表单规则 */
      addFormRule:{},
      /**功能列表 */
      funList: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
    }
  },
  components: {
    PageHeader
  },
  mounted(){
    window.console.log("roleId->"+this.$route.query.roleId);
    //接收role传递参数
    let roleId = this.$route.query.roleId;
    if (roleId) {
      this.getRoleData();
    } else {
      //执行注册
    }
  },
  methods:{
    /**获取该角色信息 */
    getRoleData(){
      
    },

    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },

    /**提交表单 */
    submitForm(){
    
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
    }
  }
}
</script>

<style scoped>
.addRole{
  width: 100%;
  height: 100%;
}
.form-item-wrap{
  display: flex;
  padding: 0 0 0 20px;
  box-sizing: border-box;
}
</style>
