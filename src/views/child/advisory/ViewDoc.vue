<template>
  <!-- 查看分类文档 -->
  <div class="viewDoc">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">新增帮助文档</el-button>
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
          prop="number"
          label="编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="文章名称"
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
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row)">编辑</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
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
  name: 'viewDoc',
  data() {
    return {
      /**表格数据 */
      //序号	编号	文章名称	级别	排序
      tableData:[{
        number:"编号",
        name:"文章名称",
        level:"级别",
        sort:"排序"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
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

    /**添加/编辑文档 */
    handleAdd(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"editDoc",
        query:{
          row:prams
        }
      });
      prams = null;
    }
  }
}
</script>

<style scoped>
.viewDoc{
  width: 100%;
  height: 100%;
}
</style>
