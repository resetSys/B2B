<template>
  <!-- 消息推送 -->
  <div class="informMan">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['消息推送',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">创建消息</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px" clearable
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
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          show-overflow-tooltip
          label="类型">
        </el-table-column>
        <el-table-column
          prop="range"
          align="center"
          show-overflow-tooltip
          label="推送范围">
        </el-table-column>
        <el-table-column
          prop="time"
          label="推送时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isPush"
          label="是否推送"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isPublish"
          label="是否发布"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="类容"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>启用</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'informMan',
  data() {
    return {
      /**表格数据 */
      //序号	类型	推送范围	推送时间	标题	Url地址	是否推送	是否发布	类容	操作
      tableData:[{
        type:"类型",
        range:"推送范围",
        time:"推送时间",
        title:"标题",
        url:"URL地址",
        isPush:"是否推送",
        isPublish:"是否发布",
        content:"类容"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  }
}
</script>

<style scoped>
.informMan{
  width: 100%;
  height: 100%;
}
</style>
