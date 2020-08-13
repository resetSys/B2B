<template>
  <!-- 业务员列表 -->
  <div class="salesmanList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['业务员管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="是否启用" style="width:100px;margin-right:5px" 
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value=""></el-option>
          <el-option label="已禁用" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="name"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
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
          align="center"
          prop="user"
          show-overflow-tooltip
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机"
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
          prop="groupId"
          label="分组ID"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="分组名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="handleBind(scope.row)">绑定分组</el-button>
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

export default {
  name: 'salesmanList',
  data() {
    return {
      /**表格数据 */
      //序号	用户名	状态	姓名	性别	手机	创建日期	分组ID	分组名称	操作
      tableData:[{
        user:"用户名",
        name:"姓名",
        sex:"性别",
        tel:"手机",
        create:"创建日期",
        groupId:"分组ID",
        groupName:"分组名称",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        status:"99",
        name:""
      }
    }
  },
  components: {
    
  },
  methods:{
    /**获取数据 */
    getTableData(){},
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

    /**绑定分组 */
    handleBind(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"bindGroup",
        query:{
          row:prams
        }
      });
      prams = null;
    }
  }
}
</script>

<style scoped>
.salesmanList{
  width: 100%;
  height: 100%;
}
</style>
