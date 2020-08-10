<template>
  <!-- 在线支付查询 -->
  <div class="payQuery">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['订单管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="支付方式" style="width:100px;margin-right:5px"
          v-model="searchForm.orderStatus">
          <el-option label="全部" value="99"></el-option>
          <el-option label="微信" value=""></el-option>
          <el-option label="支付宝" value=""></el-option>
        </el-select>
        <el-date-picker
          type="date"
          v-model="searchForm.start"
          style="width:200px;margin-right:5px"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          v-model="searchForm.end"
          style="width:200px;margin-right:5px"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入订单号" v-model="searchForm.content"></el-input>
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
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNum"
          show-overflow-tooltip
          label="订单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="unit"
          show-overflow-tooltip
          label="单位">
        </el-table-column>
        <el-table-column
          align="center"
          prop="temporaryNum"
          show-overflow-tooltip
          label="临时单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="money"
          show-overflow-tooltip
          label="金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="payMode"
          show-overflow-tooltip
          label="支付方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          show-overflow-tooltip
          label="日期时间">
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
  name: 'payQuery',
  data() {
    return {
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      //支付方式 开始时间 截至时间 单号
      searchForm:{
        payMode:"99",
        start:"",
        end:"",
        number:""
      },
      /**表格数据 */
      //订单号	单位	临时单号	交易号	金额	方式	时间
      tableData:[{
        orderNum:"",
        unit:"",
        temporaryNum:"",
        money:"",
        payMode:"",
        time:""
      }],
    }
  },
  components: {
   
  },
  methods:{
    /**获取表格数据 */
    getTableData(){
    },
    /**刷新表格数据 */
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
.payQuery{
  width: 100%;
  height: 100%;
}
</style>
