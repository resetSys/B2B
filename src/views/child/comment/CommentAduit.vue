<template>
  <!-- 商品评论审核 -->
  <div class="commentAduit">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['评论管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-circle-close"
          :disabled="selectedList.length == 0">批量拒绝</el-button>
        <el-button type="primary" icon="el-icon-circle-check"
          :disabled="selectedList.length == 0">批量通过</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="类型" style="width:100px;margin-right:5px"
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="未审核" value=""></el-option>
          <el-option label="已审核" value=""></el-option>
          <el-option label="拒绝展示" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入产品名称" v-model="searchForm.name"></el-input>
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
          prop="user"
          show-overflow-tooltip
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="goods"
          align="center"
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="评价星级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="评论时间"
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
          prop="grade"
          label="评价星级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评论内容"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
  </div>
</template>

<script>

export default {
  name: 'commentAduit',
  data() {
    return {
      /**表格数据 */
      //序号	用户名称	商品名称	评价星级	评论时间 状态	评论内容
      tableData:[{
        user:"用户名称",
        goods:"商品名称",
        grade:"评价星级",
        time:"评论时间",
        status:"状态",
        comment:"评论内容"
      }],
      selectedList:[],/**select选中项 */
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      searchForm:{/**搜索表单 */
        status:"99",
        name:""
      }
    }
  },
  components: {
  
  },
  methods:{
    /**获取管理员数据 */
    getTableData(){
      
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
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },
  }
}
</script>

<style scoped>
.commentAduit{
  width: 100%;
  height: 100%;
}
</style>
