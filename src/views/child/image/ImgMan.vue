<template>
  <!-- 图片维护 -->
  <div class="imgMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value=""></el-option>
          <el-option label="已上架" value=""></el-option>
          <el-option label="未上架" value=""></el-option>
        </el-select>
        <el-select v-model="searchForm.device" placeholder="设备类型" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value=""></el-option>
          <el-option label="PC端" value=""></el-option>
          <el-option label="移动端" value=""></el-option>
        </el-select>
        <el-select v-model="searchForm.classify" placeholder="图片分类" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value=""></el-option>
          <el-option label="轮播图片" value=""></el-option>
          <el-option label="首页楼层图" value=""></el-option>
          <el-option label="药店诊所楼层图" value=""></el-option>
          <el-option label="热词搜索" value=""></el-option>
          <el-option label="App专区推荐" value=""></el-option>
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
        style="width: 100%">
        <el-table-column
          align="center"
          prop="id"
          show-overflow-tooltip
          label="ID">
        </el-table-column>
        <el-table-column
          prop="sort"
          align="center"
          show-overflow-tooltip
          label="排序">
        </el-table-column>
        <el-table-column
          prop="imgClassify"
          label="图片分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="imgTit"
          label="图片标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="imgType"
          label="类别"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="des"
          label="备注"
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
          prop="create"
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="handleOut">下架</el-button>
            <el-button v-if="false" type="success" style="padding:2px 3px;" plain
              @click="handlePut">上架</el-button>
            <el-button v-if="false" type="danger" style="padding:2px 3px;" plain
              @click="handleDel">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增图片 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增图片
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="115px"
            :rules="addFormRule" ref="addForm">
            <el-form-item label="标题" prop="imgTit">
              <el-input v-model="addForm.imgTit" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="imgType">
              <el-input v-model="addForm.imgType" clearable></el-input>
            </el-form-item>
            <el-form-item label="图片一级分类" prop="imgClassify">
              <el-input v-model="addForm.imgClassify" clearable></el-input>
            </el-form-item>
            <el-form-item label="图片二级分类" prop="twoClassify">
              <el-input v-model="addForm.twoClassify" clearable></el-input>
            </el-form-item>
            <el-form-item label="选择图片" prop="imgUrl">
              <img-upload action="" @fallback="uploadSuccess"></img-upload>
            </el-form-item>
            <el-form-item label="电脑端跳转链接" prop="pcLink">
              <el-input v-model="addForm.pcLink" clearable></el-input>
            </el-form-item>
            <el-form-item label="移动端跳转类型" prop="appLink">
              <el-input v-model="addForm.appLink" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="des">
              <el-input v-model="addForm.des" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ImgUpload from "@/components/ImgUpload.vue";

export default {
  name: 'imgMan',
  data() {
    return {
      /**表格数据 */
      //序号	ID	图片分类	图片标题	类别	备注	创建日期	排序	状态	操作
      tableData:[{
        id:"ID",
        sort:"排序",
        imgClassify:"图片分类",
        imgTit:"图片标题",
        imgType:"类别",
        des:"备注",
        status:"状态",
        create:"创建日期"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        status:"",
        device:"",
        classify:"",
        name:""
      },
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //标题 所属类别 图片一级分类 图片二级分类 选择图片 电脑端跳转链接 移动端跳转类型 备注 排序
      addForm:{
        imgTit:"",
        imgType:"",
        imgClassify:"",
        twoClassify:"",
        imgUrl:"",
        pcLink:"",
        appLink:"",
        des:"",
        sort:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    ImgUpload
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

    /**点击新增 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**点击上架 */
    handlePut(){
      this.$message({
        message: '点击上架',
        type: 'info'
      });
    },
    /**点击下架 */
    handleOut(){
      this.$message({
        message: '点击下架',
        type: 'info'
      });
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
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = null;
      }
      this.addDrawer = false;
    },
    /**提交表单 */
    submit(){
      this.$message({
        message: '执行提交操作',
        type: 'info'
      });
    },

    uploadSuccess(url){
      this.addForm.imgUrl = url;
    }
  }
}
</script>

<style scoped>
.imgMan{
  width: 100%;
  height: 100%;
}
</style>
