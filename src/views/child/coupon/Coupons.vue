<template>
  <!-- 优惠券列表 -->
  <div class="coupons">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['优惠券','优惠券列表']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="领取类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="领券中心" value=""></el-option>
          <el-option label="新人" value=""></el-option>
          <el-option label="订单-无限制" value=""></el-option>
          <el-option label="订单-件数规则" value=""></el-option>
          <el-option label="订单-满额规则" value=""></el-option>
        </el-select>
        <el-select placeholder="设备类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="通用" value="全部"></el-option>
          <el-option label="电脑端" value=""></el-option>
          <el-option label="安卓" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称"></el-input>
        <el-input style="width:200px;margin-right:5px" clearable
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="code"
          show-overflow-tooltip
          label="编码">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="渠道类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="getType"
          label="领取类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rangeTpe"
          label="范围类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="range"
          label="范围"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="优惠类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="begin"
          label="开始时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="end"
          label="结束时间"
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
            <el-button type="warning" style="padding:2px 3px;" plain>下架</el-button>
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
  name: 'coupons',
  data() {
    return {
      /**表格数据 */
      //序号	操作	编码	名称	数量	渠道类型	领取类型	
      //范围类型	范围	优惠类型	开始时间	结束时间	状态
      tableData:[{
        code:"编码",
        name:"名称",
        num:"数量",
        deviceType:"渠道类型",
        getType:"领取类型",
        rangeTpe:"范围类型",
        range:"范围",
        couponType:"优惠类型",
        begin:"开始时间",
        end:"结束时间",
        status:"状态"
      }]
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
.coupons{
  width:100%;
  height: 100%;
}
</style>
