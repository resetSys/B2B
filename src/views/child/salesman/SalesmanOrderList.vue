<template>
  <!-- 业务员订单列表 -->
  <div class="salesmanOrderList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['业务员管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="支付状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="已支付" value=""></el-option>
          <el-option label="未支付" value=""></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="已审核" value=""></el-option>
          <el-option label="未审核" value=""></el-option>
          <el-option label="已上传" value=""></el-option>
          <el-option label="已出库" value=""></el-option>
          <el-option label="已收货" value=""></el-option>
        </el-select>
        <el-date-picker
          type="date"
          clearable
          style="width:200px;margin-right:5px"
          placeholder="请选择开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          clearable
          style="width:200px;margin-right:5px"
          placeholder="请选择结束日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入业务员名称"></el-input>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入客户公司/订单编号/下单人姓名"></el-input>
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
          prop="organ"
          show-overflow-tooltip
          label="机构">
        </el-table-column>
        <el-table-column
          prop="salesman"
          align="center"
          show-overflow-tooltip
          label="业务员名称">
        </el-table-column>
        <el-table-column
          prop="documentCode"
          label="单据编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="customerID"
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
          prop="modePay"
          label="支付方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="statusPay"
          label="支付状态"
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
          prop="actually"
          label="实付金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="amount"
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
          prop="time"
          label="下单日期"
          align="center"
          show-overflow-tooltip>
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
  name: 'salesmanOrderList',
  data() {
    return {
      /**表格数据 */
      //序号	机构	操作	业务员名称	单据编号	客户编号	客户名称	收货人	
      //支付方式	支付状态	订单状态	优惠金额	实付金额	总金额	来源	下单日期
      tableData:[{
        organ:"机构",
        salesman:"业务员名称",
        documentCode :"单据编号",
        customerID:"客户编号",
        customer:"客户名称",
        consignee:"收货人",
        modePay:"支付方式",
        statusPay:"支付状态",
        orderStatus:"订单状态",
        coupon:"优惠金额",
        actually:"实付金额",
        amount:"总金额",
        source:"来源",
        time:"下单日期"
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
.salesmanOrderList{
  width: 100%;
  height: 100%;
}
</style>
