<template>
  <div class="productClassify">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['商品管理','商品分类']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">新增分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
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
          prop="number"
          show-overflow-tooltip
          label="编号">
        </el-table-column>
        <el-table-column
          prop="classify"
          align="center"
          show-overflow-tooltip
          label="类别名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="等级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>查看子类</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain>编辑</el-button>
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

export default {
  name: 'productClassify',
  data() {
    return {
      /**表格数据 */
      //序号	编号	类别名称	级别	排序	操作
      tableData:[{
        number:"编号",
        name:"类别名称",
        classify:"类别名称",
        grade:"级别",
        sort:"排序"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination
  }
}
</script>

<style scoped>
.productClassify{
  width: 100%;
  height: 100%;
}
</style>
