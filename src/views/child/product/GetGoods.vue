<template>
  <!-- 到货提醒 -->
  <div class="getGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
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
          align="center"
          prop="user"
          show-overflow-tooltip
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="buyer"
          align="center"
          show-overflow-tooltip
          label="求货用户">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="producer"
          label="厂家"
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
          prop="time"
          label="求货时间"
          align="center"
          show-overflow-tooltip>
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
  name: 'getGoods',
  data() {
    return {
      /**表格数据 */
      //用户账号	求货用户	电话	名称	厂家	库存	求货时间
      tableData:[{
        user:"用户账号",
        buyer:"求货用户",
        tel:"电话",
        name:"名称",
        producer:"厂家",
        repertory:"库存",
        time:"求货时间"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        name:""
      },
    }
  },
  components: {
    
  },
  methods:{
     /**获取表格 */
    getTableData(){
      // this.$store.commit('handleLoding');
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
    },
  }
}
</script>

<style scoped>
.getGoods{
  width: 100%;
  height: 100%;
}
</style>
