<template>
  <!-- 订单时间统计 -->
  <div class="orderTime">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['用户分析',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          v-model="searchForm.start"
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.end"
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入关键字" v-model="searchForm.name"></el-input>
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
          align="center"
          prop="sort"
          show-overflow-tooltip
          label="排名">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          show-overflow-tooltip
          label="订单下单数(次数)">
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          show-overflow-tooltip
          label="日期">
        </el-table-column>
        <el-table-column
          prop="timeStream"
          align="center"
          show-overflow-tooltip
          label="时间段">
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
  name: 'orderTime',
  data() {
    return {
      /**表格数据 */
      //排名	订单下单数（次数）	日期	时间段
      tableData:[{
        sort:"排序",
        number:"订单下单数(次数)",
        time:"日期",
        timeStream:"时间段", 
      }],
      /**搜索表单 */
      searchForm:{
        start:"",
        end:"",
        name:""
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
  },
  methods:{
     /**获取表格数据 */
    getTableData(){},
    /**刷新数据 */
    handleRefresh(){
      this.getTableData();
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
  }
}
</script>

<style scoped>
.orderTime{
  width: 100%;
  height: 100%;
}
</style>
