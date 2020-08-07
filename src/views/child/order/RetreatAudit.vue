<template>
  <!-- 退单审核 -->
  <div class="retreatAudit">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['订单管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-download" @click="handleExport">导出退货单</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="订单状态" style="width:100px;margin-right:5px"
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="待审核" value=""></el-option>
          <el-option label="已通过" value=""></el-option>
          <el-option label="已反驳" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入订单号/收货公司" v-model="searchForm.name"></el-input>
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
          prop="user"
          show-overflow-tooltip
          label="申请人账号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="申请人姓名">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="companyNum"
          label="公司编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderMode"
          label="下单渠道"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="refundTime"
          label="退货时间"
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
            <el-button type="primary" style="padding:2px 3px;" plain>操作</el-button>
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'retreatAudit',
  data() {
    return {
      /**表格数据 */
      //序号	申请人账号	申请人姓名	联系方式	公司编号	公司名称
      //	订单号	下单渠道	下单时间	退货时间	状态	操作
      tableData:[{
        user:"申请人账号",
        name:"申请人姓名",
        contact:"联系方式",
        companyNum:"公司编号",
        companyName:"公司名称",
        orderNum:"订单号",
        orderMode:"下单渠道",
        orderTime:"下单时间",
        refundTime:"退货时间",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        status:"99",
        name:""
      }
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
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

    /**点击导出 */
    handleExport(){
      this.$message({
        message: '点击导出',
        type: 'info'
      });
    }
  }
}
</script>

<style scoped>
.retreatAudit{
  width: 100%;
  height: 100%;
}
</style>
