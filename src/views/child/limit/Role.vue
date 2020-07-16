<template>
  <!-- 注册审核管理 -->
  <div class="role">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','角色管理']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">删除</el-button>
        <el-button type="primary" icon="el-icon-document-add"
          @click="formdrawer = true">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="是否启用" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
        <el-select placeholder="类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value="全部"></el-option>
          <el-option label="商城后台" value="商城后台"></el-option>
          <el-option label="业务通APP" value="业务通APP"></el-option>
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
          prop="num"
          show-overflow-tooltip
          label="序号">
        </el-table-column>
        <el-table-column
          prop="item"
          align="center"
          show-overflow-tooltip
          label="配置项">
        </el-table-column>
        <el-table-column
          prop="plate"
          label="配置码"
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
    <!-- 添加角色 -->
    <el-drawer
      title=""
      :visible.sync="formdrawer"
      :withHeader="false"
      direction="rtl">
      <div class="drawer-header">
        信息注册
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="formData" label-position="rigth" label-width="80px"
            :rules="formRule">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="des">
              <el-input v-model="formData.des" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="formData.sort" clearable></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-input v-model="formData.type" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="formdrawer = false">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'role',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        num:"1",
        item:"订单送积分",
        plate:"900"
      }],
      /**新增drawer */
      formdrawer:false,
      formData:{
        name:"",
        des:"",
        sort:"",
        type:""
      },
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
.role{
  width: 100%;
  height: 100%;
}
</style>
