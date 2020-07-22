<template>
  <div class="productClassify">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['商品管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="number"
          show-overflow-tooltip
          label="编号">
        </el-table-column>
        <el-table-column
          prop="classify"
          align="center"
          show-overflow-tooltip
          label="类别名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="等级"
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
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="viewChild">查看子类</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="handleDel">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增分类 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        信息注册
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="addFormRule" ref="addForm">
            <el-form-item label="父类别" prop="parent">
              <el-select v-model="addForm.parent" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
            </el-form-item>
            <el-form-item label="类别名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="分类图片" prop="img">
              <img-upload action=""></img-upload>
            </el-form-item>
            <el-form-item label="调用别名" prop="alias">
              <el-input v-model="addForm.alias" clearable></el-input>
            </el-form-item>
            <el-form-item label="seo标题" prop="seoTit">
              <el-input v-model="addForm.seoTit" clearable></el-input>
            </el-form-item>
            <el-form-item label="seo描述" prop="seoDes">
              <el-input v-model="addForm.seoDes" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
    <!-- 子类数据dialog -->
    <el-dialog
      title="子类列表"
      :visible.sync="childDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="70%">
      <search-bar>
        <template>
          <el-input v-model="searchForm2.name" style="width:200px;margin-right:5px"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </template>
      </search-bar>
      <el-scrollbar style="height:300px">
        <el-table
          :data="childData"
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="编号"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="类别名称"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="grade"
            label="级别"
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
            label="操作"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="warning" plain style="padding:2px 3px;"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" plain style="padding:2px 3px;"
                @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <pagination :allPage="allPage2" :pageSize="pageSize2" :currIndex="currPage2"
        @hanSiChange="hanSiChange2" @hanCurrChange="hanCurrChange2"></pagination>
    </el-dialog>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import ImgUpload from "@/components/ImgUpload";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'productClassify',
  data() {
    return {
      /**表格数据 */
      //序号	编号	类别名称	级别	排序	操作
      tableData:[{
        number:"编号",
        name:"类别名称",
        classify:"类别名称",
        grade:"级别",
        sort:"排序"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**select选中项 */
      selectedList:[],
      /**新增drawer */
      addDrawer:false,
      /**新增分类表单 */
      //父类别 排序 类别名称 分类图片 调用别名 seo标题 seo描述
      addForm:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      },
      addFormRule:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      },
      
      /**子类dialog */
      childDialog:false,
      /**子类分页数据 */
      currPage2:1,
      pageSize2:0,
      allPage2:0,
      /**子类搜索表单 */
      searchForm2:{
        name:""
      },
      /**子类数据 */
      //序号	编号	类别名称	级别	排序	操作
      childData:[{
        number:"编号",
        name:"类别名称",
        grade:"级别",
        sort:"排序"
      }],
      
    }
  },
  components: {
    crumbsBar,
    Pagination,
    ImgUpload,
    SearchBar
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
    /**点击编辑 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**点击删除 */
    handleDel(){
      this.$confirm('确定删除该条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => {});
    },
    // 查看子类
    viewChild(){
      this.childDialog = true;
    },
    /**分页数据改变 */
    hanSiChange2(val){
      this.pageSize2 = val;
    },
    hanCurrChange2(val){
      this.currPage2 = val;
    },
    /**新增分类 */
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
    /**提交新增分类 */
    submit(){
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '执行提交',
            type: 'info'
          });
        }
      });
    },

    /**子类删除 */
    handleDel2(){
      this.$confirm('确定删除该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => {});
    },
    /**子类编辑 */
    handleEdit2(){
    
    },
  }
}
</script>

<style scoped>
.productClassify{
  width: 100%;
  height: 100%;
}
</style>
