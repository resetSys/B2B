<template>
  <!-- 奖品列表 -->
  <div class="prizeList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['抽奖管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">新增</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入名称"></el-input>
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
          align="center"
          prop="prizeImg"
          show-overflow-tooltip
          label="奖品图片">
        </el-table-column>
        <el-table-column
          prop="prizeName"
          align="center"
          show-overflow-tooltip
          label="奖品名称">
        </el-table-column>
        <el-table-column
          prop="prizeType"
          label="奖品类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeNum"
          label="奖品编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="lastChange"
          label="最后修改时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>操作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
  </div>
</template>

<script>

export default {
  name: 'prizeList',
  data() {
    return {
      /**表格数据 */
      //编号	图片	奖品名称(5个字)	奖品类型	价值数量(积分，金钱)	最后修改时间	操作
      tableData:[{
        prizeImg:"奖品图片",
        prizeName:"奖品名称",
        prizeType:"奖品类型",
        prizeNum:"奖品编号",
        lastChange:"最后修改时间"
      }],
    }
  },
  components: {
    
  }
}
</script>

<style scoped>
.prizeList{
  width: 100%;
  height: 100%;
}
</style>
