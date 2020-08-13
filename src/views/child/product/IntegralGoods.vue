<template>
  <!-- 积分商品 -->
  <div class="integralGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['商品管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增积分商品</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.classify" placeholder="商品分类" 
          style="width:100px;margin-right:5px">
          <el-option label="全部分类" value="全部分类"></el-option>
          <el-option label="办公用品" value="办公用品"></el-option>
          <el-option label="家用家电" value="家用家电"></el-option>
          <el-option label="生活用品" value="生活用品"></el-option>
          <el-option label="热门兑换" value="热门兑换"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" placeholder="商品状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
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
          prop="organName"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          show-overflow-tooltip
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="specification"
          label="商品规格"
          align="center"
          show-overflow-tooltip>
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
          prop="classify"
          label="商品分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="creditsExchange"
          label="兑换积分"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isUseing"
          label="是否启用"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="handleOut">下架</el-button>
            <el-button v-if="false" type="success" style="padding:2px 3px;" plain>上架</el-button>
            <el-button v-if="false" type="danger" style="padding:2px 3px;" plain
              @click="handleDel">删除</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleEdit(scope.row)">编辑</el-button>
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
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品规格" prop="specification">
              <el-input v-model="addForm.specification" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="classify">
              <el-input v-model="addForm.classify" clearable></el-input>
            </el-form-item>
            <el-form-item label="展示楼层" prop="floor">
              <el-input v-model="addForm.floor" clearable></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="image">
              <el-input v-model="addForm.image" clearable></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="producer">
              <el-input v-model="addForm.producer" clearable></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="addForm.price" clearable></el-input>
            </el-form-item>
            <el-form-item label="积分" prop="creditsExchange">
              <el-input v-model="addForm.creditsExchange" clearable></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="repertory">
              <el-input v-model="addForm.repertory" clearable></el-input>
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

export default {
  name: 'integralGoods',
  data() {
    return {
      /**表格数据 */
      //行号	机构名称	商品编号	商品名称	商品规格	
      //包装单位	生产厂家	商品分类	价格	兑换积分	是否启用	操作
      tableData:[{
        organName:"机构名称",
        number:"商品编号",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        classify:"商品分类",
        price:"价格",
        creditsExchange:"兑换积分",
        isUseing:"是否启用"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        classify:"",
        status:"",
        name:""
      },
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //商品名称 商品规格 包装单位 商品分类 展示楼层 上传图片 生产厂家 价格 积分 库存
      addForm:{
        name:"",
        specification:"",
        packingNnit:"",
        classify:"",
        floor:"",
        image:"",
        producer:"",
        price:"",
        creditsExchange:"",
        repertory:""
      },
      /**新增表单规则 */
      addFormRule:{}
    }
  },
  components: {
    
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
      // this.addDrawer = true;
      this.$router.push('addIntGoods');
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
    /**点击编辑 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    }

  }
}
</script>

<style scoped>
.integralGoods{
  width: 100%;
  height: 100%;
}
</style>
