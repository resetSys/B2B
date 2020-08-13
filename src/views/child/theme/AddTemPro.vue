<template>
  <!-- 商品组合 -->
  <div class="addTemPro">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title">
      <template slot="controls">
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </template>
    </page-header>
    <!-- 展示已经绑定的商品 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-table
        :data="bindList"
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
      </el-table>
    </el-scrollbar>
    <!-- dialog显示所有的商品 -->
    <el-dialog
      title="商品列表"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="90%">
      <!-- 搜索框 -->
      <search-bar>
        <template>
          <el-input style="width:200px;margin-right:5px" clearable
            placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getGoodsList">搜索</el-button>
        </template>
      </search-bar>
      <el-scrollbar style="height:300px;padding-top:20px;box-sizing:border-box;">
        <el-table
          :data="goodsList"
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
        </el-table>
      </el-scrollbar>
      <!-- 分页 -->
      <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
        @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//网络
import { request } from "@/request";

export default {
  name: 'addTemPro',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**已商品绑定 */
      bindList:[],
      goodsList:[//商品列表
        {
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
        }
      ],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        name:""
      },
      /**所有商品dialog */
      dialogVisible:false
    }
  },
  components: {
  },
  mounted(){
    //接收role传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //获取改组合已经绑定的数据
      this.getBindList();
    }
    this.getGoodsList();
  },
  methods:{
    /**获取已绑定商品 */
    getBindList(){},
    handleAdd(){
      this.dialogVisible = true
    },

    /**获取商品列表 */
    getGoodsList(){
      request({
        url:"HTGoodsAdmin/GetGoodsList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:"99",
          sqlValue:this.searchForm.name,
          pageIndex:this.currPage,
          pageSize:this.pageSize,
          categoryId:"99",
          attribute:"99",
          promType:"99",
          promStatus:"99",
        },
      }).then((res) => {
        let {Success,Data,RecordCount} = res.data.models;
        this.allPage = RecordCount;
        this.goodsList = [];
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.goodsList.push({
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
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
      this.getGoodsList()
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
      this.getGoodsList()
    },
    /**选中商品*/
    selectionChange(section){
      this.selectedList = section;
    },
    /**提交选中的商品 */
    submitBind(){
      
    },

    /**返回 */
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>
.addTemPro{
  width: 100%;
  height: 100%;
}
</style>
