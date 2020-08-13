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
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addForm.name" clearable style="width:200px"
              placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="addForm.sort" :controls="false" :min="0"
              style="width:200px;text-align:left;"></el-input-number>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="角色机构" prop="organId">
            <el-select v-model="addForm.organId" placeholder="请选择" clearable style="width:200px">
                <el-option
                  v-for="(role,index) in organList"
                  :key="index"
                  :label="role.label"
                  :value="role.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="des">
            <el-input v-model="addForm.des" clearable style="width:200px" placeholder="请输入该角色的备注"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-scrollbar style="height:300px;width:300px">
            <el-form-item label="功能选择" prop="funId">
              <el-tree
                :data="funList"
                show-checkbox
                @check="treeChecked"
                ref="tree"
                node-key="id">
              </el-tree>
            </el-form-item>
          </el-scrollbar>
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
//网络
import { request } from "@/request";

export default {
  name: 'addRole',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**新增表单 */
      //角色名称 描述 角色机构id 功能id  排序 角色id
      addForm:{
        name:"",
        id:"",
        des:"",
        funId:"",
        sort:"",
        organId:""
      },
      /**新增表单规则 */
      addFormRule:{},
      /**功能列表 */
      funList: [],
      organList:[],/**注册机构列表 */
    }
  },
  components: {
  },
  mounted(){
    //接收role传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //将row数据放进表单中
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
    } else {
      //执行注册
    }
    this.getFunList();//获取功能列表
    this.getOrgan();//获取机构列表
  },
  methods:{
    /**获取该角色信息 */
    getRoleData(){},
    /**获取功能列表 */
    getFunList(){
      request({
        url:"HTSystemSetting/GetMethodList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:"99",
          sqlValue:"",
          Source:"99",
          pageIndex:1,
          pageSize:20
        },
      }).then((res) => {
        let {Success,Data,PageCount} = res.data.models;
        this.allPage = PageCount;
        this.funList = [];
        if (Success) {
          //一级菜单而二级菜单都加到一起
          /**递归函数 */
          this.recursion(Data);
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**递归调用函数 */
    recursion(list) {
      //先传入一个list，如果list中的Smethods是数组，再调用自身传入数组
      for (let i = 0; i < list.length; i++) {
        this.funList.push({
          id:list[i].Id,
          label:list[i].Title,
          children:[]
        })
        if (list[i].SMethod instanceof Array) {
          for (let j = 0,childs = list[i].SMethod; j < childs.length; j++) {
            this.funList[i].children.push({
              id:childs[j].Id,
              label:childs[j].Title,
              children:[]
            })
          }
        }
      }
    },
    /**获取机构列表 */
    getOrgan(){
      request({
        url:"HTUserAdmin/GetEntDoc",
        method:"post",
        data:{
          entId:this.organId,
        },
      }).then((res) => {
        this.organList = [];
        let {Success,Data} = res.data.models;
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.organList.push({
              label:Data[i].EntName,
              value:Data[i].EntId
            });
          }
          //表单机构选择赋初值
          this.addForm.roleOrganId = this.organList[0].value;
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
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
              roleId:this.addForm.id,
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

    /**获取选中权限的id */
    treeChecked(){
      let res = this.$refs.tree.getCheckedKeys()
      this.addForm.funId = res.join(",");
    }
  }
}
</script>

<style scoped>
.addRole{
  width: 100%;
  height: 100%;
}
</style>
