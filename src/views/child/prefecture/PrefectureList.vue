<template>
  <!-- 专区列表管理 -->
  <div class="prefectureList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['专区及品牌维护',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增品牌</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="是否启用" style="width:100px;margin-right:5px" 
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="未上架" value=""></el-option>
          <el-option label="已上架" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="number"
          show-overflow-tooltip
          label="方案编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="方案名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
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
          prop="create"
          label="创建日期"
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
          prop="des"
          label="备注"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="handleBrand(scope.row)">品牌商品</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增品牌 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        品牌信息
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="formRule" ref="addForm">
            <el-form-item label="品牌名称" prop="brandName">
              <el-input v-model="addForm.brandName" clearable></el-input>
            </el-form-item>
            <el-form-item label="品牌图片" prop="brandImg">
              <upload accept="image/*" @fileChange="fileChange"></upload>
            </el-form-item>
            <el-form-item label="图片链接" prop="imgUrl">
              <el-input v-model="addForm.imgUrl" clearable></el-input>
            </el-form-item>
            <el-form-item label="详情图片" prop="detailsImg">
              <upload accept="image/*" @fileChange="fileChange2"></upload>
            </el-form-item>
            <el-form-item label="描述" prop="des">
              <el-input v-model="addForm.des" clearable></el-input>
            </el-form-item>
            <el-form-item label="首页品牌推荐" prop="isRecommend">
              <el-radio-group v-model="addForm.isRecommend">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="addForm.sort" :min="1" :controls="false"
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
  </div>
</template>

<script>

export default {
  name: 'prefectureList',
  data() {
    return {
      /**表格数据 */
      //序号	方案编号	方案名称	类别	排序	创建日期 状态 备注	操作
      tableData:[{
        number:"方案编号",
        name:"方案名称",
        type:"类别",
        sort:"排序",
        create:"创建日期",
        status:"状态",
        des:"备注"
      }],
      searchForm:{/**搜索表单 */
        status:"",
        name:""
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      addDrawer:false,/**新增品牌drawer */
      /**表单数据 */
      //品牌名称 品牌图片 图片链接 品牌详情图片 备注 首页品牌推荐 排序
      addForm:{
        brandName:"",
        brandImg:"",
        imgUrl:"",
        detailsImg:"",
        des:"",
        isRecommend:1,
        sort:""
      },
      formRule:{/**表单验证 */
      },
    }
  },
  components: {
    
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

    /**upload上传回调 */
    fileChange(files){
      this.addForm.brandImg = files;
    },
    fileChange2(files){
      this.addForm.detailsImg = files;
    },

    /**点击新增 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**点击品牌商品 */
    handleBrand(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"prefectureGoods",
        query:{
          row:prams
        }
      });
      prams = null;
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
      });
    },
    /**清除表单 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    }
  }
}
</script>

<style scoped>
.prefectureList{
  width: 100%;
  height: 100%;
}
</style>
