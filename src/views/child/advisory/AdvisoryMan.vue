<template>
  <!-- 咨询管理 -->
  <div class="advisoryMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['咨询管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">添加咨询</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="咨询分类" style="width:100px;margin-right:5px" 
          v-model="searchForm.type">
          <el-option label="全部" value="99"></el-option>
          <el-option label="新闻动态" value=""></el-option>
          <el-option label="医药咨询" value=""></el-option>
          <el-option label="监管信息" value=""></el-option>
          <el-option label="公告" value=""></el-option>
        </el-select>
        <el-select placeholder="发布状态" style="width:100px;margin-right:5px" 
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已发布" value=""></el-option>
          <el-option label="未发布" value=""></el-option>
        </el-select>
        <el-date-picker
          type="date"
          v-model="searchForm.start"
          style="width:200px;margin-right:5px"
          placeholder="选择开始日期"
          clearable>
        </el-date-picker>
        <el-date-picker
          type="date"
          v-model="searchForm.end"
          style="width:200px;margin-right:5px"
          placeholder="选择结束日期"
          clearable>
        </el-date-picker>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入咨询名称名称" v-model="searchForm.name"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          show-overflow-tooltip
          label="ID">
        </el-table-column>
        <el-table-column
          prop="classify"
          align="center"
          show-overflow-tooltip
          label="分类">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="main"
          label="摘要"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="browse"
          label="浏览次数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="发布状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="success" style="padding:2px 3px;" plain>上架</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain @click="handleAdd(scope.row)">编辑</el-button>
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
  name: 'advisoryMan',
  data() {
    return {
      /**表格数据 */
      //ID	分类	标题	摘要	更新时间	浏览次数	发布状态	操作
      tableData:[{
        id:"ID",
        classify:"分类",
        title:"标题",
        main:"摘要",
        updateTime:"更新时间",
        browse:"浏览次数",
        status:"发布状态"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**搜索表单 */
      searchForm:{
        type:"99",
        status:"99",
        start:"",
        end:"",
        name:""
      },
    }
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

    /**新增/编辑咨询 */
    handleAdd(row){
      let prams = null;
      if (row) {
        prams = encodeURIComponent(JSON.stringify(row));
      } else {
        prams = row;
      }
      this.$router.push({
        path:"addAdvisory",
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
.advisoryMan{
  width: 100%;
  height: 100%;
}
</style>
