<template>
  <!-- 推荐专区 -->
  <div class="recommed">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['系统配置',$route.meta.title]"></crumbs-bar>
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
        <el-table-column
          align="center"
          prop="index"
          show-overflow-tooltip
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="alias"
          label="别名"
          align="center"
          show-overflow-tooltip>
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
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="dialogVisible= true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 修改楼层名 -->
    <el-dialog
      title="修改楼层名"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="500px">
      <el-form :model="formData" label-position="left" label-width="80px"
        :rules="formRule" ref="addForm">
        <el-form-item label="楼层名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入楼层名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <!-- 图片预览 -->
          <img-view></img-view>
          <upload accept="image/*" :size="1024" @fileChange="fallback"></upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="formData.url" placeholder="电脑端跳转链接地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formData.sort" :controls="false" style="width:100%;"
            :min="1" placeholder="请输入排列序号"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="resetForm">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'recommend',
  data() {
    return {
      tableData:[{
        index:"1",
        name:"专区推荐",
        alias:"Prefecture",
        sort:1
      }],
       /**dialog */
      dialogVisible:false,
      formData:{
        name:"",
        img:"",
        url:"",
        sort:null
      },
      formRule:{
        name:[
          {required:true,message:'请输入楼层名称',trigger:'blur'},
        ],
        img:[
          {required:true,message:"请选择图片",trigger:'blur'}
        ],
        url:[
          {required:true,message:"请输入链接地址",trigger:'blur'}
        ],
        sort:[
          {required:true,message:"请输入楼层顺序",trigger:'blur'}
        ]
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
    }
  },
  components: {
  },
  methods:{
    /**文件上传回调 */
    fallback(file){
      this.formData.img = file;
    },

    /**获取表格数据 */
    getTableData(){},
    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'success'
          });
        }
      })
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
      this.dialogVisible = false;
    },
    /**重置表单|刷新页面 */
    handleRefresh(){
      this.resetForm();
    },
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
  },
}
</script>

<style scoped>
.recommed{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
