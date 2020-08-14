<template>
  <div class="admin">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <!-- <el-button type="danger" icon="el-icon-delete"
         :disabled="selectedList.length==0">删除</el-button> -->
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="是否启用" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value="2"></el-option>
          <el-option label="未启用" value="1"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable></el-input>
        <el-button type="primary" icon="el-icon-search"
          @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user"
          align="center"
          show-overflow-tooltip
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organ"
          label="机构名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create"
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status|formatType">{{scope.row.status|formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==2" type="danger" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,1)">禁用</el-button>
            <el-button v-else type="success" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,2)">启用</el-button>
            <el-button type="warning" style="padding:2px 3px;" @click="handleEdit(scope.row)"
             plain>编辑</el-button>
            <el-button v-if="scope.row.status == 1" type="danger" style="padding:2px 3px;" plain
              @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加管理员 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        信息注册
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="用户名" prop="user">
              <el-input v-model="addForm.user" clearable></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="addForm.pass" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="organId">
              <el-select v-model="addForm.organId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="(role,index) in organList"
                  :key="index"
                  :label="role.label"
                  :value="role.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理角色" prop="roleId">
              <el-select v-model="addForm.roleId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="(role,index) in roleList"
                  :key="index"
                  :label="role.label"
                  :value="role.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="addForm.tel" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择" style="width:100%">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//网络
import { request } from "@/request";
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";
import { mustFill } from "@/mixins/data/valid.js";//混入表单必填项

export default {
  name: 'admin',
  mixins:[formatStatus],
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**表格数据 */
      //序号	用户名	真实姓名	手机号	机构	创建日期	状态	操作
      tableData:[{
        user:"",
        userId:"",
        pass:"",
        organ:"",
        organId:"",
        role:"",
        roleId:"",
        roleType:"",
        name:"",
        tel:"",
        sex:"",
        address:"",
        create:"",
        status:""
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      addDrawer:false,/**新增管理员drawer */
      /**表单数据 */
      //机构id 用户名 密码 角色id 联系方式 性别 修改时该管理员id
      addForm:{
        user:"",
        name:"",
        pass:"",
        organId:"",
        roleId:"",
        tel:"",
        sex:"",
        userId:""
      },
      formRule:{/**表单验证 */
        name:[mustFill],
        user:[mustFill],
        pass:[mustFill],
        organId:[mustFill],
        roleId:[mustFill],
        tel:[mustFill],
        sex:[mustFill],
      },
      searchForm:{/**搜索表单 */
        name:"",
        status:"99"
      },
      selectedList:[],/**select选中项 */
      /**注册表单需要的数据-------------- */
      roleList:[],/**管理角色 */
      organList:[],/**机构数据 */
    }
  },
  components: {
  
  },
  mounted(){
    this.getRole();//获取角色列表
    this.getOrgan();//获取机构列表
    this.getTableData()//获取管理员列表
  },
  filters:{
    /**使用混入 转换tips状态 */
    /**使用混入 转换状态码 */
  },
  methods:{
    /**表格数据操作------------------------ */
    /**获取管理员数据 */
    getTableData(){
      request({
        url:"HTUserAdmin/GetManagerList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:this.searchForm.status,
          sqlValue:this.searchForm.name,
          pageIndex:this.currPage,
          pageSize:this.pageSize
        },
      }).then((res) => {
        let {Success,Data,RecordCount} = res.data.models;
        this.allPage = RecordCount;
        this.tableData = [];
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.tableData.push({
              user:Data[i].username,
              userId:Data[i].userId,
              pass:Data[i].password,
              organ:Data[i].entname,
              organId:Data[i].entId,
              role:Data[i].rolename,
              roleId:Data[i].role_id,
              roleType:Data[i].role_type,
              name:Data[i].name,
              tel:Data[i].telphone,
              create:Data[i].add_time,
              status:Data[i].status
            })
          }
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
      this.getTableData()
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
      this.getTableData()
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /**获取注册表单中选项数据------------------------ */
    /**获取角色选项 */
    getRole(){
      request({
        url:"HTUserAdmin/GetRole",
        method:"post",
        data:{
          entId:this.organId,
        },
      }).then((res) => {
        this.roleList = [];
        let {Success,Data} = res.data.models;
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.roleList.push({
              label:Data[i].RoleName,
              value:Data[i].Id
            })
          }
          
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**获取机构选项 */
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
          
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**编辑管理员数据 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**新增管理员 */
    handleAdd(){
      this.addDrawer = true;
      //给新增表单下拉框默认值
      this.addForm.organId = this.organList[0].value;
      this.addForm.roleId = this.roleList[0].value;
      this.addForm.sex = "男";
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = null;
      }
      this.addDrawer = false;
    },
    /**修改账户状态 */
    changeStatus(row,status){
      request({
        url:"HTUserAdmin/UpdateManager",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          listStr:row.userId,
          status:status,
        },
      }).then((res) => {
        //提示成功，刷新数据
        let {Success,Message,MsgCode} = res.data.models;
        if (Success) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getTableData();
        } else {
          this.$message({
            message: '操作失败:'+Message+MsgCode,
            type: 'error'
          });
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          request({
            url:"HTUserAdmin/AddManager",
            method:"post",
            data:{
              entId:this.organId,
              userId:this.adminId,
              userName:this.addForm.user,
              name:this.addForm.name,
              pwd:this.addForm.pass,
              xEntId:this.addForm.organId,
              roleId:this.addForm.roleId,
              phone:this.addForm.tel,
              sex:this.addForm.sex,
              magId:this.addForm.userId,
            },
          }).then((res) => {
            let {Success,MsgCode,Message} = res.data.models;
            if (Success) {
              //提示新增功能成功,关闭dialog,刷新数据
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.clearForm();
              this.getTableData();
            } else {
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
    /**点击删除管理员 */
    handleDel(row){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.changeStatus(row,0);
      }).catch(() => {});
    }
  }
}
</script>

<style scoped>
.admin{
  width: 100%;
  height: 100%;
}

</style>
