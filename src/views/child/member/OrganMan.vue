<template>
  <!-- 机构管理 -->
  <div class="organMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增机构</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入名称"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="organCode"
          show-overflow-tooltip
          label="机构编码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="organName"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="organTel"
          show-overflow-tooltip
          label="机构联系方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="organNum"
          show-overflow-tooltip
          label="机构编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="aboutAddress"
          show-overflow-tooltip
          label="地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="detailAddress"
          show-overflow-tooltip
          label="详细地址">
        </el-table-column>
      </el-table>
    </el-scrollbar>
     <!-- 添加机构 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增机构
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="机构名称" prop="organName">
              <el-input v-model="addForm.organName" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="organTel">
              <el-input v-model="addForm.organTel" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="aboutAddress">
              <el-cascader  
                v-model="addForm.aboutAddress"
                placeholder="选择地址(可搜索)"
                :options="$store.state.citys"
                :props="{value:'label',label:'label'}"
                style="width:100%;"
                filterable>
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input v-model="addForm.detailAddress" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//混入
import { mustFill } from "@/mixins/data/valid.js";//混入表单必填项

export default {
  name: 'organMan',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**表格数据 */
      //机构编码	机构名称	机构联系方式	机构编号	省	市	区	详细地址
      tableData:[{
        organCode:"机构编码",
        organName:"机构名称",
        organTel:"机构联系方式",
        organNum:"机构编号",
        aboutAddress:"地址",
        detailAddress:"详细地址"
      }],
      addDrawer:false,/**新增drawer */
      /**表单数据 */
      //机构名称 联系方式 地址 详细地址
      addForm:{
        organName:"",
        organTel:"",
        aboutAddress:"",
        detailAddress:""
      },
      formRule:{/**表单验证 */
        organName:[mustFill],
        organTel:[mustFill],
        aboutAddress:[mustFill],
        detailAddress:[mustFill]
      },
    }
  },
  components: {
    
  },
  methods:{
    /**获取表格数据 */
    getTableData(){},
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /**新增机构 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = null;
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
        } else {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          });
        }
      })
    },

  }
}
</script>

<style scoped>
.organMan{
  width: 100%;
  height: 100%;
}
</style>
