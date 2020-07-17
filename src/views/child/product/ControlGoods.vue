<template>
  <div class="controlGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['商品管理','控销产品']">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="商品状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已上架" value="已上架"></el-option>
          <el-option label="已下架" value="已下架"></el-option>
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
          prop="organName"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
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
          prop="SFDA"
          label="生产公司"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="producer"
          label="国药准字"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellCustom"
          label="可销客户"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="notSellCustom"
          label="不可销客户"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellClassify"
          label="可销客户分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="notSellClassify"
          label="不可销客户分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="saleableArea"
          label="可销区域"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="notSaleableArea"
          label="不可销区域"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
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
  name: 'controlGoods',
  data() {
    return {
      /**表格数据 */
      //操作	机构	产品名	规格	国药准字	生产公司	可销客户	不可销客户	
      //可销客户分类	不可销客户分类	可销区域	不可销区域
      tableData:[{
        organName:"机构名称",
        name:"商品名称",
        specification:"商品规格",
        SFDA:"国药准字",
        producer:"生产公司",
        sellCustom:"可销客户",
        notSellCustom:"不可销客户",
        sellClassify:"可销客户分类",
        notSellClassify:"不可销客户分类",
        saleableArea:"可销区域",
        notSaleableArea:"不可销区域"
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
.controlGoods{
  width: 100%;
  height: 100%;
}
</style>
