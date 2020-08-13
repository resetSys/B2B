<template>
  <div class="floorSetting">
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
        <el-form-item label="排序" prop="index">
          <el-input-number v-model="formData.index" :controls="false" style="width:100%;"
            :min="1"  placeholder="请输入排列序号"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'floorSetting',
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
        index:null
      },
      formRule:{
        name:[
          {required:true,message:'请输入楼层名称',trigger:'blur'},
        ],
        index:[
          {required:true,message:"请输入楼层顺序",trigger:'blur'}
        ]
      },
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
    }
  },
  components: {
  },
  methods:{
    /**获取表格数据 */
    getTableData(){
    
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

    /**提交表单 */
    submitForm(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'info'
          });
        }
      });
    },
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
      this.dialogVisible = false;
    }
  }
}
</script>

<style scoped>
.floorSetting{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
