<template>
  <!-- 注册资质管理 -->
  <div class="registCertificate">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
          :disabled="selectedList.length == 0" @click="handleDel">批量删除</el-button>
        <el-button type="primary" icon="el-icon-link"
          :disabled="selectedList.length == 0" @click="handleBind">绑定ERP分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="状态"
           style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="正常" value="正常"></el-option>
          <el-option label="已删除" value="已删除"></el-option>
        </el-select>
        <el-select v-model="searchForm.type" placeholder="领取类型" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="医疗机构" value="医疗机构"></el-option>
          <el-option label="零售药店" value="零售药店"></el-option>
          <el-option label="生产企业" value="生产企业"></el-option>
          <el-option label="商业公司" value="商业公司"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
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
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="roleType"
          show-overflow-tooltip
          label="角色类型">
        </el-table-column>
        <el-table-column
          prop="operaRoles"
          align="center"
          show-overflow-tooltip
          label="运营角色">
        </el-table-column>
        <el-table-column
          prop="operaMode"
          label="运营方式"
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
          <template slot-scope="scope">
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="handleCerti(scope.row)">资质管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 绑定ERP分类 -->
    <el-dialog
      title="绑定ERP分类"
      :visible.sync="erpDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="40%">
      <el-form :model="erpForm" label-width="150px" label-position="right" ref="erpForm">
        <el-form-item prop="type" label="类型">
          <el-select v-model="erpForm.type" placeholder="状态" clearable style="width:80%;">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="医疗机构" value=""></el-option>
            <el-option label="零售药店" value=""></el-option>
            <el-option label="生产企业" value=""></el-option>
            <el-option label="商业公司" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="ERP分类名称">
          <el-input v-model="erpForm.name" clearable style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="info" @click="resetForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'registCertificate',
  data() {
    return {
      /**表格数据 */
      //角色类型	运营角色	运营方式	状态
      tableData:[{
        roleType:"角色类型",
        operaRoles:"运营角色",
        operaMode:"运营方式",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        status:"",
        type:"",
        name:""
      },
      /**select选中项 */
      selectedList:[],

      /**绑定erpdialog */
      erpDialog:false,
      /**绑定erp表单 */
      erpForm:{
        type:"",
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
    /**会员 selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      window.console.log(section)
      this.selectedList = section;
    },

    /**点击注册资质 */
    handleCerti(){
      let prams = null;
      // if (row) {
      //   prams = encodeURIComponent(JSON.stringify(row));
      // } else {
      //   prams = row;
      // }
      this.$router.push({
        path:"certificate",
        query:{
          row:prams
        }
      });
      prams = null;
    },
    /**点击批量删除 */
    handleDel(){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        
      }).catch(() => {});
    },
    /**点击绑定erp分类 */
    handleBind(){
      this.erpDialog = true;
    },
    /**提交绑定erp表单 */
    submitForm(){
      this.$refs['erpForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '执行提交',
            type: 'info'
          });
        }
      });
    },
    /**重置表单 */
    resetForm(){
      this.$refs['erpForm'].resetFields();
      this.erpDialog = false
    }
  }
}
</script>

<style scoped>
.registCertificate{
  width: 100%;
  height: 100%;
}
</style>
