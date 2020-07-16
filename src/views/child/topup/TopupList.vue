<template>
  <!-- 充值活动列表 -->
  <div class="topupList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">新增充值金额</el-button>
        <el-button type="primary" icon="el-icon-document-add">批量上架</el-button>
        <el-button type="warning" icon="el-icon-document-remove">批量下架</el-button>
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
      </template>
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
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
        :"",
        :"",
        :"900",
        :"",
        :"",
        status:""
        <el-table-column
          align="center"
          prop="organNum"
          show-overflow-tooltip
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="goodName"
          align="center"
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="des"
          label="备注"
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
          prop="create"
          label="添加时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>活动规则</el-button>
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

export default {
  name: 'topupList',
  data() {
    return {
      /**表格数据 */
      //序号	机构编号	商品名	类型	金额	备注	添加时间	状态	操作
      tableData:[{
        organNum:"机构编号",
        goodName:"商品名",
        type:"类型",
        money:"金额",
        des:"备注",
        create:"添加时间",
        status:"状态"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination
  }
}
</script>

<style scoped>
.topupList{
  width: 100%;
  height: 100%;
}
</style>
