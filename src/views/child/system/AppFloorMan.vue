<template>
  <div class="appFloorMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['系统配置',$route.meta.title]">
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="楼层名">
        </el-table-column>
        <el-table-column
          prop="alias"
          align="center"
          show-overflow-tooltip
          label="别名">
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
          <template>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleConfig">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 编辑配置 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        修改配置
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="楼层名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <upload accept="image/*" :size="1024" @fileChange="fallback"></upload>
            </el-form-item>
            <el-form-item label="电脑端跳转链接" prop="PCLink">
              <el-input v-model="addForm.PCLink" clearable></el-input>
            </el-form-item>
            <el-form-item label="移动端跳转类型" prop="AppType">
              <el-select v-model="addForm.AppType" placeholder="是否启用"
                style="width:100%;" clearable>
                <el-option label="模板" value="a"></el-option>
                <el-option label="无跳转" value="b"></el-option>
                <el-option label="商品详情" value="c"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="移动端跳转模块" prop="AppMode">
              <el-select v-model="addForm.AppMode" placeholder="是否启用"
                style="width:100%;" clearable>
                <el-option label="全部分类" value="a"></el-option>
                <el-option label="商品组合" value="b"></el-option>
                <el-option label="促销卖场" value="c"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//组件
import Upload from "@/components/Upload.vue";

export default {
  name: 'appFloorMan',
  data() {
    return {
      /**表格数据 */
      //序号	楼层名	别名	排序	操作
      tableData:[{
        name:"楼层名",
        alias:"别名",
        sort:"排序",
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //楼层名 图片 电脑端跳转链接 移动端跳转类型 移动端跳转模块 排序
      addForm:{
        name:"",
        image:"",
        PCLink:"",
        AppType:"",
        AppMode:"",
        sort:""
      },
      /**表单规则 */
      formRule:{},
    }
  },
  components: {
    Upload
  },
  methods:{
    /**获取表格 */
    getTableData(){
      // this.$store.commit('handleLoding');
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    
    /**点击配置 */
    handleConfig(){
      this.addDrawer = true;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    },

    /**文件上传回调 */
    fallback(file){
      this.formData.image = file;
    },
  }
}
</script>

<style scoped>
.appFloorMan{
  width: 100%;
  height: 100%;
}
</style>
