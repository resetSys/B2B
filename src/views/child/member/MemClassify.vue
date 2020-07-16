<template>
  <!-- 会员分类管理 -->
  <div class="memClassify">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['会员管理','会员分类']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-folder-add">新增客户分类</el-button>
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
          align="center"
          prop="type"
          show-overflow-tooltip
          label="类型">
        </el-table-column>
        <el-table-column
          prop="cname"
          align="center"
          show-overflow-tooltip
          label="分类名称">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
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
  name: '',
  data() {
    return {
      /**表格数据 */
      //序号	类型	分类名称	操作
      tableData:[{
        type:"类型",
        cname:"分类名称",
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
.memClassify{
  width: 100%;
  height: 100%;
}
</style>
