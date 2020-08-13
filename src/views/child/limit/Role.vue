<template>
  <!-- 注册审核管理 -->
  <div class="role">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
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
          align="center"
          prop="name"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organ"
          align="center"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="des"
          align="center"
          show-overflow-tooltip
          label="描述">
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
            <el-button v-if="scope.row.status==2" type="danger" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,1)">禁用</el-button>
            <el-button v-else type="success" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,2)">启用</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status == 1" type="danger" style="padding:2px 3px;" plain
              @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
  </div>
</template>

<script>
//网络
import { request } from "@/request";
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";

export default {
  name: 'role',
  mixins:[formatStatus],
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**表格数据 */
      //id 名称	描述	排序	类型 机构名称 机构id 状态
      tableData:[{
        id:"",
        name:"",
        des:"",
        sort:"",
        funId:"",
        organ:"",
        organId:"",
        status:""
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
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
    
  },
  mounted(){
    this.getTableData();
  },
  filters:{
    /**使用混入 转换tips状态 */
    /**使用混入 转换状态码 */
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
        let {Success,Data,RecordCount} = res.data.models;
        this.allPage = RecordCount;
        this.tableData = [];
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.tableData.push({
              id:Data[i].Id,
              name:Data[i].RoleName,
              des:Data[i].Describe,
              sort:Data[i].Sort,
              funId:Data[i].MethodId,
              organ:Data[i].EntName,
              organId:Data[i].EntId,
              status:Data[i].Status
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
    /**新增角色 */
    handleAdd(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"addRole",
        query:{
          row:prams
        }
      });
      prams = null;
    },
    /**修改角色状态 */
    changeStatus(row,status){
      request({
        url:"HTUserAdmin/UpdateRoleStatus",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          listStr:row.id,
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
    /**删除角色 */
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
.role{
  width: 100%;
  height: 100%;
}
</style>
