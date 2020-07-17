<template>
  <!-- 模板绑定 -->
  <div class="template">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-document-add">添加模板绑定</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="是否启用" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已上架" value="已上架"></el-option>
          <el-option label="未上架" value="未上架"></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商品组合" value="商品组合"></el-option>
          <el-option label="商品分类" value="商品分类"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入名称"></el-input>
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
          prop="img"
          show-overflow-tooltip
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="图片" style="height:50px;width:auto;vertical-align: middle;">
          </template>
        </el-table-column>
        <el-table-column
          prop="temNum"
          align="center"
          show-overflow-tooltip
          label="模板编号">
        </el-table-column>
        <el-table-column
          prop="tem"
          label="模板"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="activityType"
          label="活动类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
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
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="warning" style="padding:2px 3px;" plain>下架</el-button>
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
  name: 'template',
  data() {
    return {
      /**表格数据 */
      //序号	图片	模板编号	模板	活动类型	标题	状态	排序	操作
      tableData:[{
        img:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        temNum:"模板编号",
        tem:"模板",
        activityType:"活动类型",
        title:"标题",
        status:"状态",
        sort:"排序"
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
.template{
  width: 100%;
  height: 100%;
}
</style>
