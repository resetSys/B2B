<template>
  <!-- 消费流水列表 -->
  <div class="expenseWater">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['订单管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          type="date"
          clearable
          v-model="searchForm.start"
          style="width:200px;margin-right:5px"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          clearable
          v-model="searchForm.end"
          style="width:200px;margin-right:5px"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入订单号/收货地址"></el-input>
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
          prop="userName"
          align="center"
          show-overflow-tooltip
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式"
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
          prop="money"
          label="金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="device"
          label="设备"
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
          prop="time"
          label="消费时间"
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
  name: 'expenseWater',
  data() {
    return {
      //序号	订单号	用户名	联系方式	支付方式	金额	设备	状态	流水类型	消费时间
      tableData:[{
        orderNum:"订单号",
        userName:"用户名",
        contact:"联系方式",
        payMode:"支付方式",
        money:"金额",
        device:"设备",
        status:"状态",
        waterType:"流水类型",
        time:"消费时间"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      //开始时间 结束时间 模糊查询
      searchForm:{
        start:"",
        end:"",
        content:""
      }
    }
  },
  components: {
    
  },
  mounted(){

  },
  methods:{
    /**获取表格 */
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
.expenseWater{
  width: 100%;
  height: 100%;
}
</style>
