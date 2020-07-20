<template>
  <!-- 商品评论审核 -->
  <div class="commentAduit">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['评论管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量拒绝</el-button>
        <el-button type="primary" icon="el-icon-document-add">批量通过</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="未审核" value=""></el-option>
          <el-option label="已审核" value=""></el-option>
          <el-option label="拒绝展示" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入产品名称"></el-input>
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
          prop="user"
          show-overflow-tooltip
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="goods"
          align="center"
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="评价星级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="评论时间"
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
          prop="grade"
          label="评价星级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评论内容"
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
  name: 'commentAduit',
  data() {
    return {
      /**表格数据 */
      //序号	用户名称	商品名称	评价星级	评论时间 状态	评论内容
      tableData:[{
        user:"用户名称",
        goods:"商品名称",
        grade:"评价星级",
        time:"评论时间",
        status:"状态",
        comment:"评论内容"
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
.commentAduit{
  width: 100%;
  height: 100%;
}
</style>
