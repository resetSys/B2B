<template>
  <!-- 商品列表 -->
  <div class="productList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['商品列表',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
          :disabled="selectedList.length==0" @click="handleDel">批量删除</el-button>
        <el-button type="primary" icon="el-icon-s-order"
          :disabled="selectedList.length==0" @click="handlePut">批量上架</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">添加商品</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.attr" placeholder="商品属性" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option
            v-for="(item,index) in attrList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="searchForm.status" placeholder="商品状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.activityArea" placeholder="活动专区" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.activityStatus" placeholder="活动状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.classify" placeholder="商品分类" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option
            v-for="(item,index) in classifyList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          show-overflow-tooltip
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="商品名称">
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
          prop="validTime"
          label="效期时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status|formatType">{{scope.row.status|formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row)">编辑</el-button>
            <el-button type="success" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,2)" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="changeStatus(scope.row,1)" v-else>禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
  </div>
</template>

<script>
//网络
import { request } from "@/request";
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";

export default {
  name: 'productList',
  mixins:[formatStatus],
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**表格数据 */
      //序号	商品id	操作	商品名称	商品规格	包装单位	
      //生产厂家	商品分类	库存	建议零售价	效期时间	操作备注
      tableData:[{
        id:"商品id",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        classify:"商品分类",
        repertory:"库存",
        retailPrice:"建议零售价",
        validTime:"效期时间",
        status:"状态",
        sort:"排序"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      //商品属性 商品状态 活动专区 活动状态 商品分类 商品名称
      searchForm:{
        attr:"99",
        status:"99",
        activityArea:"99",
        activityStatus:"99",
        classify:"99",
        name:""
      },
      /**select选中项 */
      selectedList:[],
      /**搜索下拉数据 */
      attrList:[],//商品属性列表
      classifyList:[],//商品分类别表
    }
  },
  components: {
  },
  mounted(){
    this.getTableData()
    this.getClassifyList()
  },
  methods:{
     /**获取表格 */
    getTableData(){
      request({
        url:"HTGoodsAdmin/GetGoodsList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:this.searchForm.status,
          sqlValue:this.searchForm.name,
          pageIndex:this.currPage,
          pageSize:this.pageSize,
          categoryId:this.searchForm.classify,
          attribute:this.searchForm.attr,
          promType:this.searchForm.activityArea,
          promStatus:this.searchForm.activityStatus,
        },
      }).then((res) => {
        let {Success,Data,RecordCount} = res.data.models;
        this.allPage = RecordCount;
        this.tableData = [];
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.tableData.push({
              // ArticleId: "114498"
              // EntId: "E26FMM0XNYQ"
              // EntName: "郑州时空"
              // GoodsCode: "0100004"
              // GoodsId: "0100004    "
              // GoodsOrigin: ""
              // Img_Url: "/UploadFile/goods/2020_1/132226198639948582.png"
              // Min_Package: "6.00"
              // Remarks: "2020-06-10 10:03:41进行了上架!原因："
              // Stock_Quantity: "0.00"
              // Valdate: ""

              id:Data[i].ArticleId,
              name:Data[i].Sub_Title,
              specification:Data[i].Drug_Spec,
              packingNnit:Data[i].Package_Unit,
              producer:Data[i].Drug_Factory,
              classify:Data[i].Category,
              repertory:"库存",
              retailPrice:Data[i].Price,
              validTime:"效期时间",

              status:Data[i].Status,
              sort:Data[i].SortId
            })
          }
        }
        window.console.log(res);
        
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
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

    /**获取检索条件数据 */
    //获取分类和属性
    getClassifyList(){
      request({
        url:"HTGoodsAdmin/GetGoodsCheckBox",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
        },
      }).then((res) => {
        let {Success,Data} = res.data.models;
        let categoryList = Data[0].CategoryList;
        let attributeList = Data[0].AttributeList;
        this.classifyList = [];
        this.attrList = [];
        if (Success) {
          this.recursion(categoryList)
          attributeList.forEach(ele => {
            this.attrList.push({
              value:ele.AttributeId,
              label:ele.Title
            })
          });
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    //数组降级
    recursion(list){
      list.forEach(ele => {
        this.classifyList.push({
          value:ele.CategoryId,
          label:ele.Title
        })
        if (ele.LowerList instanceof Array) {
          this.recursion(ele.LowerList);
        }
      });
    },
    
    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },
    /**批量删除 */
    handleDel(){
      //将selected选中的list转化为字符串
      let idList = [];
      this.selectedList.forEach(ele => {
        idList.push(ele.id);
      });
      idList = idList.join();
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.changeStatus({id:idList},0);
      }).catch(() => {});
    },
    /**批量上架 */
    handlePut(){
      this.$message({
        message: '批量上架',
        type: 'info'
      });
    },
    /**点击新增/编辑 */
    handleAdd(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"addProduct",
        query:{
          row:prams
        }
      });
      prams = null;
    },
    /**清空表单信息 */
    clearForm(){
      this.$refs['goodForm'].resetFields();
      for (const key in this.goodForm) {
        this.goodForm[key] = null;
      }
      this.addDialog = false;
    },
    /**提交新增分类 */
    submit(){
      this.$refs['goodForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '执行提交',
            type: 'info'
          });
        }
      });
    },
    changeStatus(row,status){
      request({
        url:"HTGoodsAdmin/UpdateGoodsStatus",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          listStr:row.id,
          status:status,
        },
      }).then((res) => {
        //提示成功，刷新数据
        let {Success,Message,MsgCode} = res.data.models;
        if (Success) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getTableData();
        } else {
          this.$message({
            message: '操作失败:'+Message+MsgCode,
            type: 'error'
          });
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
  }
}
</script>

<style scoped>
.productList{
  width: 100%;
  height: 100%;
}
</style>