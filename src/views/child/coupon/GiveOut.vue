<template>
  <!-- 优惠券下发 -->
  <div class="giveOut">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['优惠券',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="设备类型" style="width:100px;margin-right:5px"
          v-model="searchForm.deviceType">
          <el-option label="通用" value="99"></el-option>
          <el-option label="电脑端" value=""></el-option>
          <el-option label="安卓" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
        <el-select placeholder="规则范围" style="width:100px;margin-right:5px"
          v-model="searchForm.range">
          <el-option label="全部" value="99"></el-option>
          <el-option label="全部商品" value=""></el-option>
          <el-option label="分类商品" value=""></el-option>
          <el-option label="独立商品" value=""></el-option>
          <el-option label="品牌商品" value=""></el-option>
        </el-select>
        <el-select placeholder="规则类型" style="width:100px;margin-right:5px"
          v-model="searchForm.ruleType">
          <el-option label="全部" value="99"></el-option>
          <el-option label="无门槛" value=""></el-option>
          <el-option label="满减" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入名称" v-model="searchForm.name"></el-input>
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
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="code"
          show-overflow-tooltip
          label="优惠券编码">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="优惠券数量">
        </el-table-column>
        <el-table-column
          prop="num"
          label="优惠券数量"
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
          prop="rangeType"
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
          prop="start"
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
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
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
  name: 'giveOut',
  data() {
    return {
      /**表格数据 */
      //序号	操作	优惠券编码	优惠券名称	优惠券数量	
      //渠道类型	领取类型	范围类型	范围	优惠类型	开始时间	结束时间
      tableData:[{
        code:"优惠券编码",
        name:"优惠券数量",
        num:"优惠券数量",
        deviceType:"渠道类型",
        getType:"领取类型",
        rangeType:"范围类型",
        range:"范围",
        couponType:"优惠类型",
        start:"开始时间",
        end:"结束时间"
      }],
      /**搜索表单 */
      //设备类型 规则范围 规则类型 优惠券名称
      searchForm:{
        deviceType:"99",
        range:"99",
        ruleType:"99",
        name:""
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
    /**获取表格数据 */
    getTableData(){},
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
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

  }
}
</script>

<style scoped>
.giveOut{
  width: 100%;
  height: 100%;
}
</style>
