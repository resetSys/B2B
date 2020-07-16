<template>
  <div class="registAudit">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['会员管理','注册审核']">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="审核状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已驳回" value="已驳回"></el-option>
          <el-option label="审核中" value="审核中"></el-option>
          <el-option label="已审核" value="已审核"></el-option>
        </el-select>
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
          prop="organCode"
          show-overflow-tooltip
          label="机构编码">
        </el-table-column>
        <el-table-column
          prop="organName"
          align="center"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="province"
          label="省"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="city"
          label="市"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="area"
          label="市"
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
            <el-button type="warning" plain style="padding:2px 3px">规则设置</el-button>
          </template>
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
  name: 'registAudit',
  data() {
    return {
      /**表格数据 */
      //机构编码、机构名称、姓名、联系方式、省、市、区、状态
      tableData:[{
        organCode:"机构编码",
        organName:"机构名称",
        name:"姓名",
        tel:"联系方式",
        province:"省",
        city:"市",
        area:"区",
        status:"状态"
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
.registAudit{
  width: 100%;
  height: 100%;
}
</style>
