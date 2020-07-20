<template>
  <!-- 退款单请求 -->
  <div class="refundRequest">
     <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['订单管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">导出</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="订单状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="待审核" value=""></el-option>
          <el-option label="已通过" value=""></el-option>
          <el-option label="已反驳" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入订单号/收货公司"></el-input>
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
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="contact"
          align="center"
          show-overflow-tooltip
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司"
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
          prop="refund"
          label="退款金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="data"
          label="日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
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
            <el-button type="primary" style="padding:2px 3px;" plain>规则设置</el-button>
          </template>
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
  name: 'refundRequest',
  data() {
    return {
      //序号	姓名	联系方式	公司	订单号	退款金额	日期	时间	状态	操作
      tableData:[{
        name:"姓名",
        contact:"联系方式",
        company:"公司",
        orderNum:"订单号",
        refund:"退款金额",
        data:"日期",
        time:"时间",
        status:"状态"
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
.refundRequest{
  width: 100%;
  height: 100%;
}
</style>
