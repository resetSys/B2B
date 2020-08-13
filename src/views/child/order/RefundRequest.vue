<template>
  <!-- 退款单请求 -->
  <div class="refundRequest">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['订单管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="订单状态" style="width:100px;margin-right:5px"
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="待审核" value=""></el-option>
          <el-option label="已通过" value=""></el-option>
          <el-option label="已反驳" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入订单号/收货公司" v-model="searchForm.name"></el-input>
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
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="contact"
          align="center"
          show-overflow-tooltip
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="refund"
          label="退款金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="data"
          label="日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司"
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
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>操作</el-button>
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
  name: 'refundRequest',
  data() {
    return {
      //序号	姓名	联系方式	公司	订单号	退款金额	日期	时间	状态	操作
      tableData:[{
        name:"姓名",
        contact:"联系方式",
        company:"公司",
        orderNum:"订单号",
        refund:"退款金额",
        data:"日期",
        time:"时间",
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
    /**获取表格数据 */
    getTableData(){
    },
    /**刷新表格数据 */
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
.refundRequest{
  width: 100%;
  height: 100%;
}
</style>
