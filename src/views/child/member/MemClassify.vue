<template>
  <!-- 会员分类管理 -->
  <div class="memClassify">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增客户分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
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
          align="center"
          prop="type"
          show-overflow-tooltip
          label="类型">
        </el-table-column>
        <el-table-column
          prop="cname"
          align="center"
          show-overflow-tooltip
          label="分类名称">
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
    <!-- 添加管理员 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增客户分类
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm">
            <el-form :model="addForm" label-position="rigth" label-width="80px"
              ref="addForm" :rules="addFormRule">
              <el-form-item label="类型" prop="type">
                <el-select v-model="addForm.type" placeholder="请选择" clearable style="width:100%">
                  <el-option label="终端" value="开启"></el-option>
                  <el-option label="连锁" value="关闭"></el-option>
                  <el-option label="批发" value="关闭"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="addForm.name" clearable></el-input>
              </el-form-item>
            </el-form>
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: '',
  data() {
    return {
      /**表格数据 */
      //序号	类型	分类名称	操作
      tableData:[{
        type:"类型",
        cname:"分类名称",
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**新增分类drawer */
      addDrawer:false,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**新增分类表单 */
      addForm:{
        type:"",
        name:""
      },
      /**新增表格数据 */
      addFormRule:{
        type:[
          {required:true,message:'请选择类型',trigger:'blur'},
        ],
        name:[
          {required:true,message:'请输入分类名称',trigger:'blur'},
        ]
      },
      /**select选中项 */
      selectedList:[],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  },
  methods:{
    /**新增分类 */
    handleAdd(){
      this.addDrawer = true
    },
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
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    },
  }
}
</script>

<style scoped>
.memClassify{
  width: 100%;
  height: 100%;
}
</style>
