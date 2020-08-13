<template>
  <!-- 主题商品组合 -->
  <div class="themePro">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['主题活动',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete" :disabled="selectedList.length == 0"
          @click="handleDel">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增组合</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
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
        @selection-change="selectionChange"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="70">
        </el-table-column>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="组合名称">
        </el-table-column>
        <el-table-column
          prop="create"
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="handleBind(scope.row)">商品组合</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        添加组合
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="组合名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="addForm.sort" :controls="false" :min="0"
                style="width:100%;"></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
    <!-- 关于商品绑定一种是在本页面，一种是跳转 -->
    <!-- 商品组合绑定商品 -->
  </div>
</template>

<script>
//网络
// import { request } from "@/request";

export default {
  name: 'themePro',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      //组合名称	创建日期	
      tableData:[{
        name:"模板编号",
        create:"模板",
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      searchForm:{/**搜索表单 */
        name:""
      },
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //名称 排序
      addForm:{
        name:"",
        sort:""
      },
      /**表单规则 */
      formRule:{},
      /**select选中项 */
      selectedList:[],
    }
  },
  components: {
  },
  mounted(){
    
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
    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /**点击新增 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = ""
      }
      this.addDrawer = false;
    },
    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'info'
          });
        }
      })
    },
    /**删除组合 */
    handleDel(){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        
      }).catch(() => {});
    },
    /**点击商品组合 */
    handleBind(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"addTemPro",
        query:{
          row:prams
        }
      });
      prams = null;
    },
  }
}
</script>

<style scoped>
.themePro{
  width: 100%;
  height: 100%;
}
</style>
