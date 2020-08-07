<template>
  <!-- 订单列表 -->
  <div class="orderList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['订单管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="单据状态" style="width:100px;margin-right:5px"
          v-model="searchForm.orderStatus">
          <el-option label="全部" value="99"></el-option>
          <el-option label="未支付" value=""></el-option>
          <el-option label="已支付" value=""></el-option>
          <el-option label="已出库" value=""></el-option>
          <el-option label="已收货" value=""></el-option>
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
          placeholder="输入订单号/收货地址" v-model="searchForm.content"></el-input>
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
          prop="organ"
          show-overflow-tooltip
          label="机构">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          align="center"
          show-overflow-tooltip
          label="单据编号">
        </el-table-column>
        <el-table-column
          prop="customNum"
          label="客户编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="customer"
          label="客户名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="consignee"
          label="收货人"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="payMode"
          label="支付方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="coupon"
          label="优惠金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actualPayment"
          label="实付金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sum"
          label="总金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create"
          label="下单日期"
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'orderList',
  data() {
    return {
      /**表格数据 */
      //序号	机构	单据编号	客户编号	客户名称	收货人	
      //支付方式	订单状态	优惠金额	实付金额	总金额	来源	下单日期
      tableData:[{
        organ:"机构",
        orderNum:"单据编号",
        customNum:"客户编号",
        customer:"客户名称",
        consignee:"收货人",
        payMode:"支付方式",
        orderStatus:"订单状态",
        coupon:"优惠金额",
        actualPayment:"实付金额",
        sum:"总金额",
        source:"来源",
        create:"下单日期"
      }],
      /**搜索表单 */
      //单据状态 开始日期 截止日期 模糊查询
      searchForm:{
        orderStatus:"",
        start:"",
        end:"",
        content:""
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  },
  methods:{
     /**获取表格 */
    getTableData(){},
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
.orderList{
  width: 100%;
  height: 100%;
}
</style>
