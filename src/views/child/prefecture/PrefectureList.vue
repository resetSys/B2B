<template>
  <!-- 专区列表管理 -->
  <div class="prefectureList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['专区及品牌维护',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">新增品牌</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="是否启用" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="未上架" value=""></el-option>
          <el-option label="已上架" value=""></el-option>
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="number"
          show-overflow-tooltip
          label="方案编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="方案名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
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
          prop="create"
          label="创建日期"
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
          prop="des"
          label="备注"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>品牌商品</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
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
  name: 'prefectureList',
  data() {
    return {
      /**表格数据 */
      //序号	方案编号	方案名称	类别	排序	创建日期 状态 备注	操作
      tableData:[{
        number:"方案编号",
        name:"方案名称",
        type:"类别",
        sort:"排序",
        create:"创建日期",
        status:"状态",
        des:"备注"
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
.prefectureList{
  width: 100%;
  height: 100%;
}
</style>
