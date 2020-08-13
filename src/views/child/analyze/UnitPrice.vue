<template>
  <!-- 客单价统计 -->
  <div class="unitPrice">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['用户分析',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
          prop="price"
          align="center"
          show-overflow-tooltip
          label="客单价">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="下单数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="订单总额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userNum"
          label="用户编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userTel"
          label="用户电话"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userComNum"
          label="用户公司编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userCompany"
          label="用户公司名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
  </div>
</template>

<script>

export default {
  name: 'unitPrice',
  data() {
    return {
      /**表格数据 */
      //排名	客单价	下单数	订单总额	用户编号	用户名	用户电话	用户公司编号	用户公司名称
      tableData:[{
        sort:"排名",
        price:"客单价",
        orderNum:"下单数",
        amount:"订单总额",
        userNum:"用户编号",
        userName:"用户名",
        userTel:"用户电话",
        userComNum:"用户公司编号",
        userCompany:"用户公司名称"
      }],
    }
  },
  components: {
    
  }
}
</script>

<style scoped>
.unitPrice{
  width: 100%;
  height: 100%;
}
</style>
