<template>
  <!-- 门诊专区管理 -->
  <div class="outpatientZone">
     <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['专区及品牌维护',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
          :disabled="selectedList.length == 0">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          prop="number"
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
          prop="sort"
          label="排序"
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
          prop="retailPrice"
          label="建议零售价"
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
          prop="SFDA"
          label="国药准字"
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
          prop="time"
          label="添加时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 绑定商品dialog -->
    <el-dialog
      title="商品列表"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="70%">
      <!-- 搜索框 -->
      <search-bar>
        <template>
          <el-input style="width:200px;margin-right:5px" clearable
            placeholder="输入编号/名称" v-model="searchForm2.name"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getGoodsList">搜索</el-button>
        </template>
      </search-bar>
      <el-scrollbar style="height:280px;padding-top:20px;box-sizing:border-box;">
        <el-table
          :data="goodsList"
          stripe
          @selection-change="selectionChange2"
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
              <span>{{(currPage2 - 1) * pageSize2 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="商品编号"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="specification"
            label="规格"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="mediumPackage"
            label="中包装"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="packages"
            label="生产厂家"
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
        </el-table>
      </el-scrollbar>
      <!-- 分页 -->
      <pagination :allPage="allPage2" :pageSize="pageSize2" :currIndex="currPage2"
        @hanSiChange="hanSiChange2" @hanCurrChange="hanCurrChange2"></pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'outpatientZone',
  data() {
    return {
       /**表格数据 */
      //商品编号	商品名称	排序	商品规格	建议零售价	库存	国药准字	生产厂家	添加时间
      tableData:[{
        number:"商品编号",
        name:"商品名称",
        sort:"排序",
        specification:"商品规格",
        retailPrice:"建议零售价",
        repertory:"库存",
        SFDA:"国药准字",
        producer:"生产厂家",
        time:"添加时间"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      selectedList:[],/**存放选中的数据 */
      /**搜索表单 */
      searchForm:{
        name:""
      },

      dialogVisible:false,
      //商品编号	名称	规格	中包装	件装量	生产厂家	库存
      goodsList:[{
        number:"商品编号",
        name:"名称",
        specification:"规格",
        mediumPackage:"中包装",
        packages:"生产厂家",
        producer:"生产厂家",
        repertory:"库存"
      }],/**商品列表 */
      selectedList2:[],/**存放选中的商品数据 */
      /**分页数据 */
      currPage2:1,
      pageSize2:20,
      allPage2:0,
      /**搜索表单 */
      searchForm2:{
        name:""
      },
    }
  },
  components: {

  },
  methods:{
     /**获取表格数据 */
    getTableData(){},
    /**获取商品数据 */
    getGoodsList(){},
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
    /**分页size改变 */
    hanSiChange2(val){
      this.pageSize2 = val;
      this.getGoodsList()
    },
    /**当前页改变 */
    hanCurrChange2(val){
      this.currPage2 = val;
      this.getGoodsList()
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    /**点击添加商品 */
    handleAdd(){
      this.dialogVisible = true;
    },
    /**点击确定绑定 */
    submitForm(){
    
    },
    /**取消绑定 */
    clearForm(){
      this.dialogVisible = false;
    },
    
    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },
    /**selection change触发事件 */
    selectionChange2(section){
      //存放选中的表格数据
      this.selectedList2 = section;
    },
  }
}
</script>

<style scoped>
.outpatientZone{
  width: 100%;
  height: 100%;
}
</style>
