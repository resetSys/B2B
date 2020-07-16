<template>
  <!-- 会员列表 -->
  <div class="memList">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['会员管理','会员列表']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
        <el-button type="warning" icon="el-icon-edit-outline">批量审核</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="会员状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px"></el-input>
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
          prop="user"
          align="center"
          show-overflow-tooltip
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          show-overflow-tooltip
          label="性别">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="unitNum"
          label="单位编号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="unitName"
          label="单位名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="clientGrade"
          label="客户等级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="clientType"
          label="客户类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create"
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="warning" plain style="padding:2px 3px;">优惠券发放</el-button>
            <el-button type="danger" plain style="padding:2px 3px;">禁用</el-button>
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
  name: 'memList',
  data() {
    return {
      /**表格数据 */
      // 用户名 操作 状态 性别 姓名 手机 单位编号 单位名称 客户级别 客户类型 机构 创建日期
      tableData:[{
        user:"测试账号",
        status:"正常",
        name:"姓名",
        sex:"性别",
        tel:"电话",
        unitNum:"单位编号",
        unitName:"单位名称",
        clientGrade:"客户等级",
        clientType:"客户类型",
        organiza:"机构",
        create:"创建日期"
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
.memList{
  width: 100%;
  height: 100%;
}
</style>
