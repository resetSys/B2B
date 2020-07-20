<template>
  <!-- 用户ip捕捉记录 -->
  <div class="logIp">
     <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['日志管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          type="date"
          style="width:200px;margin-right:5px;"
          placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          style="width:200px;margin-right:5px;"
          placeholder="截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入管理员名称"></el-input>
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
          prop="organNum"
          show-overflow-tooltip
          label="机构编号">
        </el-table-column>
        <el-table-column
          prop="user"
          align="center"
          show-overflow-tooltip
          label="账号">
        </el-table-column>
        <el-table-column
          prop="hostIp"
          label="主机IP"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="assessIp"
          label="访问IP"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="port"
          label="端口"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
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
  name: 'logIp',
  data() {
    return {
      /**表格数据 */
      //机构编号	账号	主机IP	访问IP	端口	时间
      tableData:[{
        organNum:"机构编号",
        user:"账号",
        hostIp:"主机IP",
        assessIp:"访问IP",
        port:"端口",
        time:"时间"
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
.logIp{
  width: 100%;
  height: 100%;
}
</style>
