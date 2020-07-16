<template>
  <!-- 签到规则 -->
  <div class="signRule">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orginName"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="ruleNum"
          align="center"
          show-overflow-tooltip
          label="方案编号">
        </el-table-column>
        <el-table-column
          prop="ruleNume"
          label="方案名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="signType"
          label="签到类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="clientType"
          label="客户类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isUseing"
          label="是否启用"
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
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>规则设置</el-button>
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
  name: 'signRule',
  data() {
    return {
      /**表格数据 */
      //序号	机构名称	方案编号	方案名称	签到类型	客户类型	是否启用	创建日期	操作
      tableData:[{
        orginName:"机构名称",
        ruleNum:"方案编号",
        ruleNume:"方案名称",
        signType:"签到类型",
        clientType:"客户类型",
        isUseing:"是否启用",
        create:"创建日期"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar,
  }
}
</script>

<style scoped>
.signRule{
  width: 100%;
  height: 100%;
}
</style>
