<template>
  <!-- 订单来源统计 -->
  <div class="orderSource">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['用户分析',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          placeholder="选择截至日期">
        </el-date-picker>
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
          prop="number"
          align="center"
          show-overflow-tooltip
          label="设备下单(次数)">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          align="center"
          show-overflow-tooltip
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="scale"
          align="center"
          show-overflow-tooltip
          label="占总订单百分比(%)">
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
  </div>
</template>

<script>

export default {
  name: 'orderSource',
  data() {
    return {
      /**表格数据 */
      //排名	设备下单(次数)	设备类型	占总订单百分比(%)
      tableData:[{
        sort:"排序",
        number:"设备下单(次数)",
        deviceType:"设备类型",
        scale:"占总订单百分比(%)"
      }],
    }
  },
  components: {
   
  }
}
</script>

<style scoped>
.orderSource{
  width: 100%;
  height: 100%;
}
</style>
