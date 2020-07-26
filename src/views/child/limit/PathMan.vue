<template>
  <div class="pathMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
         :disabled="selectedList.length==0">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="addDrawer = true">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.isUsing" placeholder="是否启用" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="a"></el-option>
          <el-option label="已启用" value="b"></el-option>
          <el-option label="未启用" value="c"></el-option>
        </el-select>
        <el-select v-model="searchForm.type" placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="a"></el-option>
          <el-option label="商城后台" value="b"></el-option>
          <el-option label="业务通APP" value="c"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="path"
          align="center"
          show-overflow-tooltip
          label="路径">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isUsing"
          label="是否启用"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain>禁用</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加路径 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增路径
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="分类" prop="type">
              <el-select v-model="addForm.type" placeholder="类型" style="width:100%;" clearable>
                <el-option label="全部" value="a"></el-option>
                <el-option label="商城后台" value="b"></el-option>
                <el-option label="业务通APP" value="c"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="路径地址" prop="path">
              <el-input v-model="addForm.path" clearable></el-input>
            </el-form-item>
            <el-form-item label="父级" prop="parentId">
              <el-select v-model="addForm.parentId" placeholder="请选择" style="width:100%;" clearable>
                <el-option label="全部" value="a"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'pathMan',
  data() {
    return {
      //Id	权限名称	路径名称	父级Id	排序	是否启用	操作
      tableData:[{
        id:"",
        name:"aa",
        path:"bb",
        parentId:"",
        sort:"cc",
        isUsing:""
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //分类 权限名称 路径地址 父级 排序
      addForm:{
        type:"",
        name:"",
        path:"",
        parentId:"",
        sort:"",
      },
      /**表单规则 */
      formRule:{},
      /**搜索表单 */
      searchForm:{
        isUsing:"",
        type:"",
        name:""
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

    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      window.console.log(section)
      this.selectedList = section;
    },
    /**编辑表格数据 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
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
.pathMan{
  width: 100%;
  height: 100%;
}
</style>
