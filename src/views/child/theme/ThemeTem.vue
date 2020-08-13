<template>
  <!-- 主题活动模板 -->
  <div class="themeTem">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['模板管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">添加模板</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="模板状态" v-model="searchForm.status" style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已上架" value="2"></el-option>
          <el-option label="未上架" value="1"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable
          placeholder="活动名称"></el-input>
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
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="temNum"
          show-overflow-tooltip
          label="模板编号">
        </el-table-column>
        <el-table-column
          prop="tem"
          align="center"
          show-overflow-tooltip
          label="模板">
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
            <el-button type="primary" style="padding:2px 3px;" plain>上架</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row)">编辑</el-button>
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
  name: 'themeTem',
  data() {
    return {
      /**表格数据 */
      //序号	模板编号	模板	状态	操作
      tableData:[{
        temNum:"模板编号",
        tem:"模板",
        status:"状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        status:"99",
        name:""
      }
    }
  },
  components: {
  },
  methods:{
    /**获取表格数据 */
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

    /**点击新增/编辑 */
    handleAdd(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"addTemplate",
        query:{
          row:prams
        }
      });
      prams = null;
    },
    /**改变状态 */
    changeStatus(){},
  }
}
</script>

<style scoped>
.themeTem{
  width: 100%;
  height: 100%;
}
</style>
