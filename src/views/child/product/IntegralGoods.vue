<template>
  <!-- 积分商品 -->
  <div class="integralGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['商品管理','积分商品']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="商品分类" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部分类" value="全部分类"></el-option>
          <el-option label="办公用品" value="办公用品"></el-option>
          <el-option label="家用家电" value="家用家电"></el-option>
          <el-option label="生活用品" value="生活用品"></el-option>
          <el-option label="热门兑换" value="热门兑换"></el-option>
        </el-select>
        <el-select placeholder="商品状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
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
          prop="number"
          align="center"
          show-overflow-tooltip
          label="商品编号">
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
          prop="packingNnit"
          label="包装单位"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="producer"
          label="生产厂家"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="classify"
          label="商品分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="creditsExchange"
          label="兑换积分"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isUseing"
          label="是否启用"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
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
  name: 'integralGoods',
  data() {
    return {
      /**表格数据 */
      //行号	机构名称	商品编号	商品名称	商品规格	
      //包装单位	生产厂家	商品分类	价格	兑换积分	是否启用	操作
      tableData:[{
        organName:"机构名称",
        number:"商品编号",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        classify:"商品分类",
        price:"价格",
        creditsExchange:"兑换积分",
        isUseing:"是否启用"
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
.integralGoods{
  width: 100%;
  height: 100%;
}
</style>
