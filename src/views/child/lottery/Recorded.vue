<template>
  <!-- 中奖记录 -->
  <div class="recorded">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['抽奖管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="中奖记录" value=""></el-option>
        </el-select>
        <el-date-picker
          type="date"
          style="width:200px;margin-right:5px"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          style="width:200px;margin-right:5px"
          placeholder="选择结束日期">
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
          prop="clientNum"
          show-overflow-tooltip
          label="中奖客户编号">
        </el-table-column>
        <el-table-column
          prop="clientName"
          align="center"
          show-overflow-tooltip
          label="中奖客户名称">
        </el-table-column>
        <el-table-column
          prop="prizeImg"
          label="奖品图片"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeNum"
          label="奖品编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeType"
          label="奖品类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeVal"
          label="奖品价值"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="winTime"
          label="中奖时间"
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'recorded',
  data() {
    return {
      /**表格数据 */
      //编号	中奖客户编号	中奖客户名称	奖品图片	奖品编号	奖品名称	奖品类型	奖品价值	中奖时间
      tableData:[{
        clientNum:"中奖客户编号",
        clientName:"中奖客户名称",
        prizeImg:"奖品图片",
        prizeNum:"奖品编号",
        prizeName:"奖品名称",
        prizeType:"奖品类型",
        prizeVal:"奖品价值",
        winTime:"中奖时间"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  }
}
</script>

<style scoped>
.recorded{
  width: 100%;
  height: 100%;
}
</style>
