<template>
  <div class="admin">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
         :disabled="selectedList.length==0">删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="addDrawer = true">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="是否启用" style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value="1"></el-option>
          <el-option label="未启用" value="2"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px"></el-input>
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
          type="selection"
          align="center"
          width="55">
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
            <el-button type="warning" style="padding:2px 3px;" @click="handleEdit(scope.row)"
             plain>编辑</el-button>
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
            <el-form-item label="密码" prop="pass">
              <el-input v-model="addForm.pass" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="organ">
              <el-select v-model="addForm.organ" placeholder="请选择" clearable style="width:100%">
                <el-option
                  v-for="(role,index) in organList"
                  :key="index"
                  :label="role.label"
                  :value="role.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理角色" prop="role">
              <el-select v-model="addForm.role" placeholder="请选择" clearable style="width:100%">
                <el-option
                  v-for="(role,index) in roleList"
                  :key="index"
                  :label="role.label"
                  :value="role.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="addForm.tel" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
//网络
import { request } from "@/request";

export default {
  name: 'admin',
  data() {
    return {
      adminId:this.$store.state.adminId,
      organId:this.$store.state.organId,
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
      addForm:{/**表单数据 */
        user:"",
        pass:"",
        organ:"",
        role:"",
        name:"",
        tel:"",
        sex:"",
        address:""
      },
      formRule:{/**表单验证 */
        name:[
          {required:true,message:'请输入配置名称',trigger:'blur'},
        ]
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
    crumbsBar,
    Pagination,
    SearchBar
  },
  mounted(){
    this.getRole();
    this.getOrgan();
    this.getTableData()
  },
  filters:{
    /**转换tips状态 */
    formatType(num){
      switch (num) {
        case 1:
          return "success"    
        case 2:
          return "danger"
        default:
          break;
      }
    },
    /**转换状态码 */
    formatStatus(num){
      switch (num) {
        case 1:
          return "启用中"
        case 2:
          return "禁用中"
        default:
          break;
      }
    }
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
        let {Success,Data,PageCount} = res.data.models;
        this.allPage = PageCount;
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
      window.console.log(section)
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


    /**编辑表格数据 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
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
