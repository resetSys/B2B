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
          @click="handleAdd">添加商品</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.attr" placeholder="商品属性" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" placeholder="商品状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.activityArea" placeholder="活动专区" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.activityStatus" placeholder="活动状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
        </el-select>
        <el-select v-model="searchForm.classify" placeholder="商品分类" style="width:200px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
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
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 商品编辑 -->
    <el-dialog
      title="商品编辑"
      :visible.sync="addDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      @close="clearForm"
      width="70%">
      <el-scrollbar style="height:300px;">
        <div class="drawer-form-wrap">
          <el-form :model="goodForm" label-position="rigth" 
            label-width="100px" ref="goodForm">
            <el-form-item label="所属分类" prop="classify">
              <el-input class="form-input" v-model="goodForm.classify" clearable></el-input>
            </el-form-item>
            <el-form-item label="推荐类型" prop="commendType">
              <el-input class="form-input" v-model="goodForm.commendType" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input class="form-input" v-model="goodForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="助记码" prop="mnemonicsCode">
              <el-input class="form-input" v-model="goodForm.mnemonicsCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="通用名" prop="commonName">
              <el-input class="form-input" v-model="goodForm.commonName" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品规格" prop="specification">
              <el-input class="form-input" v-model="goodForm.specification" clearable></el-input>
            </el-form-item>
            <el-form-item label="包装单位" prop="package">
              <el-input class="form-input" v-model="goodForm.package" clearable></el-input>
            </el-form-item>
            <el-form-item label="中包装" prop="mediumPackage">
              <el-input class="form-input" v-model="goodForm.mediumPackage" clearable></el-input>
            </el-form-item>
            <el-form-item label="计量规格" prop="metrologicalSpecification">
              <el-input class="form-input" v-model="goodForm.metrologicalSpecification" clearable></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="producer">
              <el-input class="form-input" v-model="goodForm.producer" clearable></el-input>
            </el-form-item>
            <el-form-item label="批准文号" prop="approvalNumber">
              <el-input class="form-input" v-model="goodForm.approvalNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="剂型" prop="dosageForm">
              <el-input class="form-input" v-model="goodForm.dosageForm" clearable></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <el-input class="form-input" v-model="goodForm.type" clearable></el-input>
            </el-form-item>
            <el-form-item label="存储条件" prop="storageCondition">
              <el-input class="form-input" v-model="goodForm.storageCondition" clearable></el-input>
            </el-form-item>
            <el-form-item label="建议零售价" prop="suggestedPrice">
              <el-input class="form-input" v-model="goodForm.suggestedPrice" clearable></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
              <el-input class="form-input" v-model="goodForm.brand" clearable></el-input>
            </el-form-item>
            <el-form-item label="封面图片" prop="cover">
              <img-upload action="https://jsonplaceholder.typicode.com/posts/" @fallback="imgFallback"></img-upload>
            </el-form-item>
            <el-form-item label="排序值" prop="sort">
              <el-input class="form-input" v-model="goodForm.sort" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品说明书" prop="des">
              <quill-editor 
                style="height:200px"
                v-model="goodForm.des"
                ref="myQuillEditor">
              </quill-editor>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import ImgUpload from "@/components/ImgUpload.vue";


export default {
  name: 'productList',
  data() {
    return {
      /**表格数据 */
      //序号	商品编号	操作	商品名称	商品规格	包装单位	
      //生产厂家	商品分类	库存	建议零售价	效期时间	操作备注
      tableData:[{
        number:"商品编号",
        name:"商品名称",
        specification:"商品规格",
        packingNnit:"包装单位",
        producer:"生产厂家",
        classify:"商品分类",
        repertory:"库存",
        retailPrice:"建议零售价",
        validTime:"效期时间"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**搜索表单 */
      //商品属性 商品状态 活动专区 活动状态 商品分类 商品名称
      searchForm:{
        attr:"",
        status:"",
        activityArea:"",
        activityStatus:"",
        classify:"",
        name:""
      },
      /** 商品表单drawer*/
      addDialog:false,
      /**商品表单 */
      //所属分类 推荐类型 商品名称 助记码 通用名 商品规格 包装单位 中包装 计量规格
      //生产厂家 批准文号 剂型 类别 存储条件 建议零售价 品牌 封面图片 排序值 商品说明书
      goodForm:{
        classify:"",
        commendType:"",
        name:"",
        mnemonicsCode:"",
        commonName:"",
        specification:"",
        package:"",
        mediumPackage:"",
        metrologicalSpecification:"",
        producer:"",
        approvalNumber:"",
        dosageForm:"",
        type:"",
        storageCondition:"",
        suggestedPrice:"",
        brand:"",
        cover:"",
        sort:"",
        des:""
      },
      goodFormRule:{
        classify:[],
        commendType:[],
        name:[],
        mnemonicsCode:[],
        commonName:[],
        specification:[],
        package:[],
        mediumPackage:[],
        metrologicalSpecification:[],
        producer:[],
        approvalNumber:[],
        dosageForm:[],
        type:[],
        storageCondition:[],
        suggestedPrice:[],
        brand:[],
        cover:[],
        sort:[],
        des:[]
      },
      /**select选中项 */
      selectedList:[],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar,
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

    /**会员 selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      window.console.log(section)
      this.selectedList = section;
    },
    /**编辑商品数据 */
    handleEdit(){
      this.addDialog = true;
    },
    /**批量删除 */
    handleDel(){
      this.$message({
        message: '批量删除',
        type: 'info'
      });
    },
    /**批量上架 */
    handlePut(){
      this.$message({
        message: '批量上架',
        type: 'info'
      });
    },
    /**添加新增 */
    handleAdd(){
      this.$message({
        message: '添加新增按钮',
        type: 'info'
      });
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

    /**图片上传成功返回url */
    imgFallback(src){
      this.goodForm.cover = src;
    }
  }
}
</script>

<style scoped>
.productList{
  width: 100%;
  height: 100%;
}
/* 编辑表单中的input */
.form-input{
  width: 200px;
}
</style>
