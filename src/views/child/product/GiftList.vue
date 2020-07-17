<template>
  <div class="giftList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['商品管理','礼品列表']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-delete">批量上架</el-button>
        <el-button type="danger" icon="el-icon-document-add">批量下架</el-button>
        <el-button type="primary" icon="el-icon-document-add">添加礼品</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="礼品状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="上架中" value="上架中"></el-option>
          <el-option label="下架中" value="下架中"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称/厂家"></el-input>
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
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="配置商品名称">
        </el-table-column>
        <el-table-column
          prop="specification"
          align="center"
          show-overflow-tooltip
          label="商品规格">
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
          prop="repertory"
          label="库存"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="retailPrice"
          label="建议零售价"
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
  name: 'giftList',
  data() {
    return {
      /**表格数据 */
      //	序号	商品编号	商品名称	商品规格	包装单位	生产厂家	库存	建议零售价	状态	操作
      tableData:[{
        number:"商品编号",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        repertory:"库存",
        retailPrice:"建议零售价",
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
.giftList{
  width: 100%;
  height: 100%;
}
</style>
