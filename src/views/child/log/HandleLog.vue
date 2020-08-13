<template>
  <div class="handleLog">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['日志管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          type="date"
          style="width:200px;margin-right:5px;"
          v-model="searchForm.start"
          clearable 
          placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          clearable 
          v-model="searchForm.end"
          style="width:200px;margin-right:5px;"
          placeholder="截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入管理员名称" v-model="searchForm.name"></el-input>
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
          prop="number"
          label="编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="admin"
          label="管理员账号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="des"
          label="操作说明"
          align="center"
          show-overflow-tooltip>
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
  name: 'handleLog',
  data() {
    return {
      /**表格数据 */
      //编号	时间	管理员账号	操作说明
      tableData:[{
        number:"编号",
        time:"时间",
        admin:"管理员账号",
        des:"操作说明"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        start:"",
        end:"",
        name:""
      }
    }
  },
  components: {

  },
  methods:{
    /**获取表格数据 */
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
  }
}
</script>

<style scoped>
.handleLog{
  width: 100%;
  height: 100%;
}
</style>
