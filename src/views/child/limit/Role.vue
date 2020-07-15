<template>
  <div class="role">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template>
        <el-button type="danger" icon="el-icon-document-delete">删除</el-button>
        <el-button type="primary" icon="el-icon-document-add">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px"></el-input>
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
          prop="num"
          show-overflow-tooltip
          label="序号">
        </el-table-column>
        <el-table-column
          prop="item"
          align="center"
          show-overflow-tooltip
          label="配置项">
        </el-table-column>
        <el-table-column
          prop="plate"
          label="配置码"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="text">规则设置</el-button>
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
  name: 'role',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        num:"1",
        item:"订单送积分",
        plate:"900"
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
.role{
  width: 100%;
  height: 100%;
}
</style>
