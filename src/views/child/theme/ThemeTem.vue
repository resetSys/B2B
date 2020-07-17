<template>
  <!-- 主题活动模板 -->
  <div class="themeTem">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['模板管理','活动模板']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-document-add">添加模板</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="模板状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已上架" value="已上架"></el-option>
          <el-option label="未上架" value="未上架"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="活动名称"></el-input>
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
          prop="temNum"
          show-overflow-tooltip
          label="模板编号">
        </el-table-column>
        <el-table-column
          prop="tem"
          align="center"
          show-overflow-tooltip
          label="模板">
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
            <el-button type="primary" style="padding:2px 3px;" plain>上架</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain>编辑</el-button>
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
  name: 'themeTem',
  data() {
    return {
      /**表格数据 */
      //序号	模板编号	模板	状态	操作
      tableData:[{
        temNum:"模板编号",
        tem:"模板",
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
.themeTem{
  width: 100%;
  height: 100%;
}
</style>
