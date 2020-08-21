<template>
  <!-- 收藏统计 -->
  <div class="collect">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['用户分析',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          v-model="searchForm.start"
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.end"
          style="margin-right:5px"
          type="date"
          clearable 
          placeholder="选择截至日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入关键字" v-model="searchForm.name"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          prop="sort"
          show-overflow-tooltip
          label="排名">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          show-overflow-tooltip
          label="收藏数">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="收藏产品名">
        </el-table-column>
        <el-table-column
          prop="specification"
          align="center"
          show-overflow-tooltip
          label="规格">
        </el-table-column>
        <el-table-column
          prop="SFDA"
          align="center"
          show-overflow-tooltip
          label="国药准字">
        </el-table-column>
        <el-table-column
          prop="productor"
          align="center"
          show-overflow-tooltip
          label="生产公司">
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
  </div>
</template>

<script>

export default {
  name: 'collect',
  data() {
    return {
      /**表格数据 */
      //排名	收藏数	收藏产品名	规格	国药准字	生产公司
      tableData:[{
        sort:"排序",
        number:"收藏数",
        name:"收藏产品名",
        specification:"规格",
        SFDA:"国药准字",
        productor:"生产公司"
      }],
      /**搜索表单 */
      searchForm:{
        start:"",
        end:"",
        name:""
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
  },
  methods:{
    /**获取表格数据 */
    getTableData(){},
    /**刷新数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
      this.getTableData()
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
      this.getTableData()
    },

  }
}
</script>

<style scoped>
.collect{
  width: 100%;
  height: 100%;
}
</style>
