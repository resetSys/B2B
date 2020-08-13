<template>
  <!-- 方案列表 -->
  <div class="schemes">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['促销管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.type" placeholder="方案类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="换购" value="换购"></el-option>
          <el-option label="买赠" value="买赠"></el-option>
          <el-option label="折扣" value="折扣"></el-option>
          <el-option label="抢购" value="抢购"></el-option>
          <el-option label="效期" value="效期"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" placeholder="方案状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
          <el-option label="已删除" value="已删除"></el-option>
        </el-select>
        <el-date-picker
          v-model="searchForm.start"
          style="width:200px;margin-right:5px;"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.end"
          style="width:200px;margin-right:5px;"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/方案名称"></el-input>
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
          label="促销类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="range"
          label="日期范围"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create"
          label="添加时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="促销类型"
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
            <el-button v-if="false" type="success" style="padding:2px 3px;" plain>上架</el-button>
            <el-button v-if="false" type="danger" style="padding:2px 3px;" plain>删除</el-button>
          </template>
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
  name: 'schemes',
  data() {
    return {
      /**表格数据 */
      //序号	方案编号(点击进入详情)	方案名称	促销类型	开始日期	结束日期	添加时间	状态	操作
      tableData:[{
        number:"方案编号",
        name:"方案名称",
        type:"促销类型",
        range:"日期范围",
        create:"添加时间",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        type:"",
        status:"",
        start:"",
        end:"",
        name:""
      }
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
.schemes{
  width: 100%;
  height: 100%;
}
</style>
