<template>
  <!-- 证书过期管理 -->
  <div class="certExpired">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入单位编号/单位名称"></el-input>
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
          prop="companyId"
          show-overflow-tooltip
          label="公司标识">
        </el-table-column>
        <el-table-column
          prop="companyNum"
          align="center"
          show-overflow-tooltip
          label="公司编号">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="priceFav"
          label="价格优惠"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="businessPermit"
          label="经营许可"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="businessNature"
          label="经营性质"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="经营地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="medicalDevice"
          label="医疗器械"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="pharmProduct"
          label="药品生产"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MIPL"
          label="医疗机构执业许可证"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="yearlyReport"
          label="年度报告"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="QAA"
          label="质量保证协议"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MAIC"
          label="母婴保健"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MDM"
          label="医疗器械生产"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MAICT"
          label="母婴保健技术"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="GPSC"
          label="CSP证书"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MDP"
          label="医疗器械生产"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="MBL"
          label="药品经营许可证"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="FCP"
          label="食品流通许可证"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="PA"
          label="委托书"
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
  name: 'certExpired',
  data() {
    return {
      /*公司标识、公司编号、公司名称、价格优惠	经营许可	经营性质	
        地址	医疗器械	药品生产	医疗机构执业许可证	年度报告	
        质量保证协议	母婴保健	医疗器械生产	母婴保健技术	GSP证书	
        医疗器械生产	药品经营许可证	食品流通许可证	委托书*/
      /**表格数据 */
      tableData:[{
        companyId:"公司标识",//公司标识
        companyNum:"公司编号",//公司编号
        companyName:"公司名称",//公司名称
        priceFav:"价格优惠",//价格优惠
        businessPermit:"经营许可",//经营许可
        businessNature:"经营性质",//经营性质
        address:"地址",//地址
        medicalDevice:"医疗器械",//医疗器械
        pharmProduct:"药品生产",//药品生产
        MIPL:"医疗机构执业许可证",//医疗机构执业许可证
        yearlyReport:"年度报告",//年度报告
        QAA:"质量保证协议",//质量保证协议
        MAIC:"母婴保健",//母婴保健
        MDM:"医疗器械生产",//医疗器械生产
        MAICT:"母婴保健技术",//母婴保健技术
        GPSC:"GSP证书",//GSP证书
        MDP:"医疗器械生产",//医疗器械生产
        MBL:"药品经营许可证",//药品经营许可证
        FCP:"食品流通许可证",//食品流通许可证
        PA:"委托书"//委托书
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        name:""
      }
    }
  },
  components: {
    
  },
  methods:{
    /**获取表格 */
    getTableData(){
      // this.$store.commit('handleLoding');
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
    },
  }
}
</script>

<style scoped>
.certExpired{
  width: 100%;
  height: 100%;
}
</style>
