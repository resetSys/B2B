<template>
  <!-- 注册资质 -->
  <div class="certificate">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
          :disabled="selectedList.length==0" @click="handleDel">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增资质证书</el-button>
      </template>
    </page-header>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px);">
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
          prop="classify"
          show-overflow-tooltip
          label="资质分类">
        </el-table-column>
        <el-table-column
          prop="certificate"
          align="center"
          show-overflow-tooltip
          label="证书">
        </el-table-column>
        <el-table-column
          prop="roleNum"
          label="角色编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status|formatType">{{scope.row.status|formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="des"
          label="描述"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加证书 -->
    <el-dialog
      title="添加资质证书"
      :visible.sync="ceDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="40%">
      <el-form :model="ceForm" label-width="150px" label-position="right" ref="ceForm">
        <el-form-item prop="type" label="资质证书">
          <el-select v-model="ceForm.type" placeholder="请选择" clearable style="width:80%;">
            <el-option label="全部" value=""></el-option>
            <el-option label="公示许可证" value=""></el-option>
            <el-option label="年度报告" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="des" label="备注信息">
          <el-input v-model="ceForm.des" clearable style="width:80%;"></el-input>
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
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";

export default {
  name: 'certificate',
  mixins:[formatStatus],
  data() {
    return {
      /**表格数据 */
      //资质分类	证书	角色编号	时间	状态	备注
      tableData:[{
        classify:"资质分类",
        certificate:"证书",
        roleNum:"角色编号",
        status:"状态",
        des:"备注"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**select选中项 */
      selectedList:[],

      /**添加资质证书dialog */
      ceDialog:false,
      /**资质证书表单 */
      ceForm:{
        type:"",
        des:""
      }
    }
  },
  components: {
    
  },
  methods:{
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },

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

    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /**点击新增证书 */
    handleAdd(){
      this.ceDialog = true;
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
    /**提交绑定erp表单 */
    submitForm(){
      this.$refs['ceForm'].validate((valid) => {
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
      this.$refs['ceForm'].resetFields();
      this.ceDialog = false
    }
  }
}
</script>

<style scoped>
.certificate{
  width: 100%;
  height: 100%;
}
</style>
