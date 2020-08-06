<template>
  <!-- 机构管理 -->
  <div class="organMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline">新增机构</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入名称"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          show-overflow-tooltip
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="商品名称">
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
          prop="validTime"
          label="效期时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'organMan',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**表格数据 */
      //机构编码	机构名称	机构联系方式	机构编号	省	市	区	详细地址
      tableData:[{
        id:"商品id",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        classify:"商品分类",
        repertory:"库存",
        retailPrice:"建议零售价",
        validTime:"效期时间",
        status:"状态",
        sort:"排序"
      }],
    }
  },
  components: {
    crumbsBar,
    SearchBar,
  },
  methods:{
    /**获取表格数据 */
    getTableData(){
    
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    }

  }
}
</script>

<style scoped>
.organMan{
  width: 100%;
  height: 100%;
}
</style>
