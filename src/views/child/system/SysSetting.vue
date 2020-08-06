<template>
  <div class="sysSetting">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['系统配置',$route.meta.title]"></crumbs-bar>
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
            <el-button type="primary" plain style="padding:2px 3px;" 
              @click="dialogVisible = true">规则设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 规则设置 -->
    <el-dialog
      title="规则设置"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="500px">
      <el-form :model="formData" label-position="left" label-width="80px"
        :rules="formRule" ref="addForm">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="配置状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" style="width:100%;">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input-number v-model="formData.money" :controls="false" style="width:100%;"
            :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="配置" prop="config">
          <el-input v-model="formData.config" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  name: 'sysSetting',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        num:"1",
        item:"订单送积分",
        plate:"900"
      }],
      /**dialog */
      dialogVisible:false,
      formData:{
        name:"",
        status:null,
        money:null,
        config:null
      },
      formRule:{
        name:[
          {required:true,message:'请输入配置名称',trigger:'blur'},
        ],
        status:[
          {required:true,message:"请输入配置状态",trigger:'blur'}
        ],
        money:[
          {required:true,message:"请输入配置金额",trigger:'blur'}
        ],
        config:[
          {required:true,message:"请输入配置",trigger:'blur'}
        ]
      },
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
    }
  },
  components: {
    crumbsBar,
    Pagination
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

    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid) => {
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
  },
}
</script>

<style scoped>
.sysSetting{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
