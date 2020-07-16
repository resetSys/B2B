<template>
  <!-- 注册资质管理 -->
  <div class="registCertificate">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['会员管理','注册资质']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-link">绑定ERP分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="正常" value="正常"></el-option>
          <el-option label="已删除" value="已删除"></el-option>
        </el-select>
        <el-select placeholder="领取类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="医疗机构" value="医疗机构"></el-option>
          <el-option label="零售药店" value="零售药店"></el-option>
          <el-option label="生产企业" value="生产企业"></el-option>
          <el-option label="商业公司" value="商业公司"></el-option>
        </el-select>
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
          prop="roleType"
          show-overflow-tooltip
          label="角色类型">
        </el-table-column>
        <el-table-column
          prop="operaRoles"
          align="center"
          show-overflow-tooltip
          label="运营角色">
        </el-table-column>
        <el-table-column
          prop="operaMode"
          label="运营方式"
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
          label="操作"
          align="center">
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain>规则设置</el-button>
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
  name: 'registCertificate',
  data() {
    return {
      /**表格数据 */
      //角色类型	运营角色	运营方式	状态
      tableData:[{
        roleType:"角色类型",
        operaRoles:"运营角色",
        operaMode:"运营方式",
        status:"状态"
      }],
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar,
  }
}
</script>

<style scoped>
.registCertificate{
  width: 100%;
  height: 100%;
}
</style>
