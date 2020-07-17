<template>
  <!-- 推荐商品管理 -->
  <div class="recommendGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">添加推荐</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="位置选择" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="购物车" value="购物车"></el-option>
          <el-option label="结算成功" value="结算成功"></el-option>
        </el-select>
        <el-select placeholder="状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已上架" value="已上架"></el-option>
          <el-option label="已下架" value="已下架"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="商品名/助忆词"></el-input>
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
          prop="name"
          show-overflow-tooltip
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="helpCode"
          align="center"
          show-overflow-tooltip
          label="助记码">
        </el-table-column>
        <el-table-column
          prop="producer"
          label="生产厂家"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="SFDA"
          label="国药准字"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="specification"
          label="商品规格"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="packingNnit"
          label="包装单位"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="剂型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="recommPosition"
          label="推荐位置"
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
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain>修改</el-button>
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
  name: 'recommendGoods',
  data() {
    return {
      /**表格数据 */
      //序号	商品名	助记码	生产厂商	国药准字	规格	单位	剂型	推荐位置	状态	操作
      tableData:[{
        name:"商品名",
        helpCode:"助记码",
        producer:"生产厂家",
        SFDA:"国药准字",
        specification:"商品规格",
        packingNnit:"包装单位",
        type:"剂型",
        recommPosition:"推荐位置",
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
.recommendGoods{
  width: 100%;
  height: 100%;
}
</style>
