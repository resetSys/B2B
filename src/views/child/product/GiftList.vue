<template>
  <div class="giftList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['商品管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-upload2"
          :disabled="selectedList.length==0" @click="handlePut">批量上架</el-button>
        <el-button type="danger" icon="el-icon-download"
          :disabled="selectedList.length==0" @click="handleOut">批量下架</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加礼品</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="礼品状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="上架中" value="上架中"></el-option>
          <el-option label="下架中" value="下架中"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称/厂家"></el-input>
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
          prop="number"
          show-overflow-tooltip
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="配置商品名称">
        </el-table-column>
        <el-table-column
          prop="specification"
          align="center"
          show-overflow-tooltip
          label="商品规格">
        </el-table-column>
        <el-table-column
          prop="packingNnit"
          label="包装单位"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="producer"
          label="生产厂家"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="repertory"
          label="库存"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="retailPrice"
          label="建议零售价"
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
    <!-- 新增礼品 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增礼品
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="addFormRule" ref="addForm">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品规格" prop="specification">
              <el-input v-model="addForm.specification" clearable></el-input>
            </el-form-item>
            <el-form-item label="包装单位" prop="packingNnit">
              <el-input v-model="addForm.packingNnit" clearable></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="producer">
              <el-input v-model="addForm.producer" clearable></el-input>
            </el-form-item>
            <el-form-item label="建议零售价" prop="repertory">
              <el-input v-model="addForm.repertory" clearable></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="retailPrice">
              <el-input v-model="addForm.retailPrice" clearable></el-input>
            </el-form-item>
            <el-form-item label="封面图片" prop="view">
              <img-upload action="" @fallback="imgFallback"></img-upload>
            </el-form-item>
            <el-form-item label="排序值" prop="sort">
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
import ImgUpload from "@/components/ImgUpload";

export default {
  name: 'giftList',
  data() {
    return {
      /**表格数据 */
      //	序号	商品编号	商品名称	商品规格	包装单位	生产厂家	库存	建议零售价	状态	操作
      tableData:[{
        number:"商品编号",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        repertory:"库存",
        retailPrice:"建议零售价",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**select选中项 */
      selectedList:[],
       /**搜索表单 */
      searchForm:{
        status:"",
        name:""
      },
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //商品名称 商品规格 包装单位 生产厂家 建议零售价 库存 封面图片 排序值
      addForm:{
        name:"",
        specification:"",
        packingNnit:"",
        producer:"",
        repertory:"",
        retailPrice:"",
        view:"",
        sort:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    ImgUpload,
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
      this.selectedList = section;
    },
    /**礼品新增 */
    handleAdd(){
      // this.addDrawer = true;
      this.$router.push('addGift');
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
    /**点击上架 */
    handlePut(){
      this.$message({
        message: '执行上架',
        type: 'info'
      });
    },
    /**点击下架 */
    handleOut(){
      this.$message({
        message: '执行下架',
        type: 'info'
      });
    },


    /**图片成功上传回调 */
    imgFallback(url){
      this.addForm.view = url;
    }
  }
}
</script>

<style scoped>
.giftList{
  width: 100%;
  height: 100%;
}
</style>
