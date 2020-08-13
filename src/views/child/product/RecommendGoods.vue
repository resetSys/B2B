<template>
  <!-- 推荐商品管理 -->
  <div class="recommendGoods">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加推荐</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.position" placeholder="位置选择" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="购物车" value="购物车"></el-option>
          <el-option label="结算成功" value="结算成功"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" placeholder="状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已上架" value="已上架"></el-option>
          <el-option label="已下架" value="已下架"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入商品名/助忆词"></el-input>
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
          prop="name"
          show-overflow-tooltip
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="helpCode"
          align="center"
          show-overflow-tooltip
          label="助记码">
        </el-table-column>
        <el-table-column
          prop="producer"
          label="生产厂家"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="SFDA"
          label="国药准字"
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
          prop="type"
          label="剂型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="recommPosition"
          label="推荐位置"
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
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="handleOut">下架</el-button>
            <el-button v-if="false" type="success" style="padding:2px 3px;" plain
              @click="handlePut">上架</el-button>
            <el-button v-if="false" type="danger" style="padding:2px 3px;" plain
              @click="handleDel">删除</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增推荐商品 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        新增推荐商品
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="addFormRule" ref="addForm">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="推荐位置" prop="recommPosition">
              <el-input v-model="addForm.recommPosition" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-input v-model="addForm.status" clearable></el-input>
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

export default {
  name: 'recommendGoods',
  data() {
    return {
      /**表格数据 */
      //序号	商品名	助记码	生产厂商	国药准字	规格	单位	剂型	推荐位置	状态	操作
      tableData:[{
        name:"商品名",
        helpCode:"助记码",
        producer:"生产厂家",
        SFDA:"国药准字",
        specification:"商品规格",
        packingNnit:"包装单位",
        type:"剂型",
        recommPosition:"推荐位置",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        position:"",
        status:"",
        name:""
      },
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //推荐商品 位置类型 状态 排序
      addForm:{
        name:"",
        recommPosition:"",
        status:"",
        sort:""
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
      this.$router.push('AddComm');
    },
    /**点击修改 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**点击删除 */
    handleDel(){
      this.$message({
        message: '点击删除',
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
    /**点击上架 */
    handlePut(){
      this.$message({
        message: '点击上架',
        type: 'info'
      });
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
  }
}
</script>

<style scoped>
.recommendGoods{
  width: 100%;
  height: 100%;
}
</style>
