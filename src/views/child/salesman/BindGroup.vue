<template>
  <!-- 绑定会员分组 -->
  <div class="bindGroup">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </page-header>
    <!-- 表格数据 -->
    <el-scrollbar style="height:calc(100% - 90px);padding-top:20px;box-sizing:border-box;">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
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
          prop="groupID"
          label="分组Id"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="分组名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="editTime"
          label="最后修改时间"
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
          prop="memberNum"
          label="绑定会员数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organName"
          label="机构名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organNum"
          label="机构编号"
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
          <el-button type="primary" icon="el-icon-search" @click="getDialogData">搜索</el-button>
        </template>
      </search-bar>
      <el-scrollbar style="height:280px;padding-top:20px;box-sizing:border-box;">
        <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
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
          prop="groupID"
          label="分组Id"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="分组名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="editTime"
          label="最后修改时间"
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
          prop="memberNum"
          label="绑定会员数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organName"
          label="机构名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organNum"
          label="机构编号"
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
  name: 'bindGroup',
  data() {
    return {
      /**表格数据 */
      //序号	分组Id	分组名称	创建时间	最后修改时间	状态	绑定会员数	机构名称	机构编号
      tableData:[{
        groupID:"分组Id",
        groupName:"分组名称",
        createTime:"创建时间",
        editTime:"最后修改时间",
        status:"状态",
        memberNum:"绑定会员数",
        organName:"机构名称",
        organNum:"机构编号"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,

      dialogVisible:false,/**商品列表dialog */
      //序号	分组Id	分组名称	创建时间	最后修改时间	状态	绑定会员数	机构名称	机构编号
      goodsList:[{
        groupID:"分组Id",
        groupName:"分组名称",
        createTime:"创建时间",
        editTime:"最后修改时间",
        status:"状态",
        memberNum:"绑定会员数",
        organName:"机构名称",
        organNum:"机构编号"
      }],/**商品列表 */
      selectedList2:[],/**存放选中的商品数据 */
      /**分页数据 */
      currPage2:1,
      pageSize2:20,
      allPage2:0,
      /**搜索表单 */
      searchForm2:{
        name:""
      }
    }
  },
  components: {

  },
  mounted(){
    //接收role传递参数
    let row = JSON.parse(decodeURIComponent(this.$route.query.row));
    if (row) {
      //将row数据放进表单中
      
    } else {
      //执行注册
    }
  },
  methods:{
    /**返回上一页 */
    goBack() {
      this.$router.go(-1);
    },

    /**获取数据 */
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
    /**点击添加商品 */
    handleAdd(){
      this.dialogVisible = true;
    },

    /**获取商品数据 */
    getDialogData(){},
    /**分页size改变 */
    hanSiChange2(val){
      this.pageSize2 = val;
      this.getDialogData()
    },
    /**当前页改变 */
    hanCurrChange2(val){
      this.currPage2 = val;
      this.getDialogData()
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
.bindGroup{
  width: 100%;
  height: 100%;
}
</style>
