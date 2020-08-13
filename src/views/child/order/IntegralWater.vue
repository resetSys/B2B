<template>
  <!-- 积分流水列表 -->
  <div class="integralWater">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-date-picker
          type="date"
          v-model="searchForm.start"
          clearable 
          style="width:200px;margin-right:5px"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          type="date"
          v-model="searchForm.end"
          clearable
          style="width:200px;margin-right:5px"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
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
          prop="clientNum"
          show-overflow-tooltip
          label="客户编号">
        </el-table-column>
        <el-table-column
          prop="clientName"
          align="center"
          show-overflow-tooltip
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="change"
          label="积分变动"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="integral"
          label="变动后积分"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="realIntegral"
          label="现存积分"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="改动时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="numbers"
          label="电商单号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ERP"
          label="ERP单号"
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
  name: 'integralWater',
  data() {
    return {
      //行号	客户编号	客户名称	类型	积分变动	变动后积分	现存积分	改动时间	电商单号	ERP单号
      /**表格数据 */
      tableData:[{
        clientNum:"客户编号",
        clientName:"客户名称",
        type:"类型",
        change:"积分变动",
        integral:"变动后积分",
        realIntegral:"现存积分",
        time:"改动时间",
        numbers:"电商单号",
        ERP:"ERP单号"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        start:"",
        end:"",
        name:""
      }
    }
  },
  components: {
    
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
.integralWater{
  width: 100%;
  height: 100%;
}
</style>
