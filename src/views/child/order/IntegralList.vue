<template>
  <!-- 积分订单列表 -->
  <div class="integralList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['订单管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入客户名称" v-model="searchForm.name"></el-input>
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
          prop="receiptNum"
          show-overflow-tooltip
          label="单据编号">
        </el-table-column>
        <el-table-column
          prop="organNum"
          align="center"
          show-overflow-tooltip
          label="单位名称">
        </el-table-column>
        <el-table-column
          prop="data"
          label="日期"
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
          prop="salesman"
          label="业务员"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="integral"
          label="数量"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="number"
          label="积分数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="viewDetails">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 查看明细dialog -->
    <el-dialog
      title="活动规则"
      :visible.sync="detailDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="70%">
      <el-scrollbar style="height:400px;">
        <el-table
          :data="detailData"
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
            prop="receiptNum"
            show-overflow-tooltip
            label="单据编号">
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'integralList',
  data() {
    return {
      /**表格数据 */
      //单据编号	单位名称	日期	时间	业务员	数量	积分数	订单状态	操作
      tableData:[{
        receiptNum:"单据编号",
        organNum:"单位名称",
        data:"日期",
        time:"时间",
        salesman:"业务员",
        integral:"数量",
        number:"积分数",
        status:"订单状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**查看明细dialog */
      detailDialog:false,
      /**明细数据 */
      //单据编号	日期	时间	商品名称	单位	数量	积分	积分总额
      detailData:[
        {
          orderNum:"单据编号",
          date:"日期",
          time:"时间",
          unit:"单位",
          sum:"数量",
          integral:"积分",
          integralSum:"积分总额"
        }
      ],
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

    /**查看明细 */
    viewDetails(){
      this.detailDialog = true;
    }
  }
}
</script>

<style scoped>
.integralList{
  width: 100%;
  height: 100%;
}
</style>
