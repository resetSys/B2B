<template>
  <!-- 充值流水 -->
  <div class="topupWater">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select 
          placeholder="状态"
          v-model="searchForm.status" 
          style="width:100px;margin-right:5px" 
          clearable>
          <el-option label="全部" value="99"></el-option>
          <el-option label="成功" value="成功"></el-option>
          <el-option label="失败" value="失败"></el-option>
        </el-select>
        <el-select 
          placeholder="活动状态" 
          v-model="searchForm.actionStatus" 
          style="width:100px;margin-right:5px" 
          clearable>
          <el-option label="全部" value="99"></el-option>
          <el-option label="参与" value="参与"></el-option>
          <el-option label="不参与" value="不参与"></el-option>
        </el-select>
        <el-date-picker
          v-model="searchForm.start"
          style="width:200px;margin-right:5px"
          placeholder="请选择起始日期"
          type="date">
        </el-date-picker>
        <el-date-picker
          v-model="searchForm.end"
          style="width:200px;margin-right:5px"
          placeholder="请选择截至日期"
          type="date">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
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
          prop="orderNum"
          show-overflow-tooltip
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="money"
          align="center"
          show-overflow-tooltip
          label="金额">
        </el-table-column>
        <el-table-column
          prop="topupWay"
          label="充值方式"
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
          prop="waterType"
          label="流水类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="topupWay"
          label="充值方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="goods"
          label="商品"
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
  name: 'topupWater',
  data() {
    return {
      /**表格数据 */
      //序号	订单号	金额	充值方式	状态	流水类型	充值时间	用户名	联系方式	商品
      tableData:[{
        orderNum:"订单号",
        money:"金额",
        topupWay:"充值方式",
        status:"状态",
        waterType:"流水类型",
        topupTime:"充值时间",
        userName:"用户名",
        tel:"联系方式",
        goods:"商品"
      }],
      searchForm:{/**搜素表单 */
        status:"99",
        actionStatus:"99",
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
  components: {
  },
  methods:{
    /**获取表格数据 */
    getTableData(){
      
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
    /**刷新数据 */
    handleRefresh(){
      this.getTableData()
    },
  }
}
</script>

<style scoped>
.topupWater{
  width: 100%;
  height: 100%;
}
</style>
