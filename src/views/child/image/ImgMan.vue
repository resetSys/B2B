<template>
  <!-- 图片维护 -->
  <div class="imgMan">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-document-add">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="状态" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="已上架" value=""></el-option>
          <el-option label="未上架" value=""></el-option>
        </el-select>
        <el-select placeholder="设备类型" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="PC端" value=""></el-option>
          <el-option label="移动端" value=""></el-option>
        </el-select>
        <el-select placeholder="图片分类" style="width:100px;margin-right:5px" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="轮播图片" value=""></el-option>
          <el-option label="首页楼层图" value=""></el-option>
          <el-option label="药店诊所楼层图" value=""></el-option>
          <el-option label="热词搜索" value=""></el-option>
          <el-option label="App专区推荐" value=""></el-option>
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
          prop="id"
          show-overflow-tooltip
          label="ID">
        </el-table-column>
        <el-table-column
          prop="sort"
          align="center"
          show-overflow-tooltip
          label="排序">
        </el-table-column>
        <el-table-column
          prop="imgClassify"
          label="图片分类"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="imgTit"
          label="图片标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="imgType"
          label="类别"
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
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="danger" style="padding:2px 3px;" plain>下架</el-button>
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
  name: 'imgMan',
  data() {
    return {
      /**表格数据 */
      //序号	ID	图片分类	图片标题	类别	备注	创建日期	排序	状态	操作
      tableData:[{
        id:"ID",
        sort:"排序",
        imgClassify:"图片分类",
        imgTit:"图片标题",
        imgType:"类别",
        des:"备注",
        status:"状态",
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
.imgMan{
  width: 100%;
  height: 100%;
}
</style>
