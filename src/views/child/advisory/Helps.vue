<template>
  <!-- 帮助中心 -->
  <div class="helps">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['咨询管理',$route.meta.title]"></crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
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
          prop="number"
          label="编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
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
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="success" style="padding:2px 3px;" plain
              @click="viewDoc(scope.row)">查看</el-button>
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
export default {
  name: 'helps',
  data() {
    return {
      /**表格数据 */
      //序号	编号	类别名称	级别	排序	操作
      tableData:[{
        number:"编号",
        name:"分类名称",
        level:"级别",
        sort:"排序"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
  },
  components: {

  },
  methods:{
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
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    /**查看分类下文档 */
    viewDoc(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"viewDoc",
        query:{
          row:prams
        }
      });
      prams = null;
    },
  }
}
</script>

<style scoped>
.helps{
  width: 100%;
  height: 100%;
}
</style>
