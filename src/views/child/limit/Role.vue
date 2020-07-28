<template>
  <!-- 注册审核管理 -->
  <div class="role">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
         :disabled="selectedList.length==0">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.isUsing" placeholder="是否启用" style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value="1"></el-option>
          <el-option label="未启用" value="2"></el-option>
        </el-select>
        <!-- <el-select v-model="searchForm.type" placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="99"></el-option>
          <el-option label="商城后台" value="b2b"></el-option>
          <el-option label="业务通APP" value="YWT"></el-option>
        </el-select> -->
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称"></el-input>
        <el-button type="primary" icon="el-icon-search"
          @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px)">
      <el-table
        :data="tableData"
        stripe
        @selection-change="selectionChange"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="des"
          align="center"
          show-overflow-tooltip
          label="描述">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
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
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1" type="danger" style="padding:2px 3px;" plain>禁用</el-button>
            <el-button v-else type="success" style="padding:2px 3px;" plain>启用</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加角色 -->
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
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="des">
              <el-input v-model="addForm.des" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-input v-model="addForm.type" clearable></el-input>
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
  name: 'role',
  data() {
    return {
      adminId:this.$store.state.adminId,
      organId:this.$store.state.organId,
      /**表格数据 */
      //id 名称	描述	排序	类型 机构名称 机构id 状态
      tableData:[{
        id:"",
        name:"",
        des:"",
        sort:"",
        type:"",
        organ:"",
        organId:"",
        status:""
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      addForm:{
        name:"",
        des:"",
        sort:"",
        type:""
      },
      /**表单规则 */
      formRule:{},
      /**搜索表单 */
      searchForm:{
        name:"",
        isUsing:"99",
        type:""
      },
      /**select选中项 */
      selectedList:[],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  },
  mounted(){
    this.getTableData();
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
    /**获取表格 */
    getTableData(){
      request({
        url:"HTUserAdmin/GetRoleList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:this.searchForm.isUsing,
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
              id:Data[i].Id,
              name:Data[i].RoleName,
              des:Data[i].Describe,
              sort:Data[i].Sort,
              type:Data[i].MethodId,
              organ:Data[i].EntName,
              organId:Data[i].EntId,
              status:Data[i].Status
            })
          }
        }
        window.console.log(res)
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
    },
    /**新增角色 */
    handleAdd(roleId){
      this.$router.push({
        path:"addRole",
        query:{
          roleId:roleId
        }
      });
    },
  }
}
</script>

<style scoped>
.role{
  width: 100%;
  height: 100%;
}
</style>
