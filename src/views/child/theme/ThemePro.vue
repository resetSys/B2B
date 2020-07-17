<template>
  <!-- 主题商品组合 -->
  <div class="themePro">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-document-add">新增组合</el-button>
      </template>
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
          prop="name"
          align="center"
          show-overflow-tooltip
          label="组合名称">
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
            <el-button type="primary" style="padding:2px 3px;" plain>商品组合</el-button>
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
  name: 'themePro',
  data() {
    return {
      //组合名称	创建日期	
      tableData:[{
        name:"模板编号",
        create:"模板",
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
.themePro{
  width: 100%;
  height: 100%;
}
</style>
