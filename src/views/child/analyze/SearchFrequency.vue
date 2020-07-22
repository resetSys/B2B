<template>
  <!-- 搜索频率分析 -->
  <div class="searchFrequency">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['用户分析',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          placeholder="选择开启日期">
        </el-date-picker>
        <el-date-picker
          style="margin-right:5px"
          type="date"
          placeholder="选择截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入关键字"></el-input>
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
          width="100"
          label="排名">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          show-overflow-tooltip
          width="100"
          label="搜索热度(次数)">
        </el-table-column>
        <el-table-column
          prop="keywords"
          label="搜索词"
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
  name: 'searchFrequency',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        sort:1,
        number:"2100",
        keywords:"冠状病毒防治"
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
.searchFrequency{
  width: 100%;
  height: 100%;
}
</style>
