<template>
  <!-- 商城配置 -->
  <div class="mallConfig">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['系统配置',$route.meta.title]"></crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="config"
          label="配置项"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="alias"
          label="别名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="warning" style="padding:2px 3px;" @click="handleConfig(scope.row)"
             plain>配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
     <!-- 修改 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        修改配置
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="配置名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="配置项" prop="config">
              <el-input v-model="addForm.config" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'mallConfig',
  data() {
    return {
      /**表格数据 */
      //序号	配置项	别名	排序	操作
      tableData:[{
        config:"配置项",
        alias:"别名",
        sort:"排序"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**新增管理员drawer */
      addDrawer:false,
      /**表单数据 */
      //配置名 配置项
      addForm:{
        name:"",
        config:""
      },
      /**表单验证 */
      formRule:{
        name:[
          {required:true,message:'请输入配置名称',trigger:'blur'},
        ]
      },
    }
  },
  components: {
  },
  methods:{
    /**获取表格 */
    getTableData(){
      // this.$store.commit('handleLoding');
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
    },

    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    handleConfig(){
      this.addDrawer = true;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    }
  }
}
</script>

<style scoped>
.mallConfig{
  width: 100%;
  height: 100%;
}
</style>
