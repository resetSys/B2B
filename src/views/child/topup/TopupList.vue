<template>
  <!-- 充值活动列表 -->
  <div class="topupList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">新增充值金额</el-button>
        <el-button type="success" icon="el-icon-circle-check"
          :disabled="selectedList.length==0">批量上架</el-button>
        <el-button type="warning" icon="el-icon-circle-close"
          :disabled="selectedList.length==0">批量下架</el-button>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
      </template>
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        stripe
        tooltip-effect="dark"
        @selection-change="selectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
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
            <el-button type="primary" style="padding:2px 3px;" 
              plain @click="handleActive">活动规则</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增充值 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        充值管理
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="商品名" prop="type">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="充值类型" prop="type">
              <el-select v-model="addForm.type" placeholder="请选择" clearable style="width:100%">
                <el-option label="固定金额" value="固定金额"></el-option>
                <el-option label="自定义金额" value="自定义金额"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值金额" prop="money">
              <el-input-number 
                v-model="addForm.money" 
                clearable 
                style="width:100%;"
                :controls="false">
              </el-input-number>
            </el-form-item>
            <el-form-item label="备注" prop="des">
              <el-input v-model="addForm.des" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
    <!-- 充值规则设置 -->
    <el-dialog
      title="活动规则"
      :visible.sync="ruleDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="40%">
      <el-form :model="topupForm" label-position="rigth" label-width="80px"
        :rules="topupFormRule" ref="topupForm">
        <el-form-item label="活动状态" prop="status">
          <el-select v-model="topupForm.status" placeholder="请选择" clearable style="width:100%">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="红包金额" prop="money">
          <el-input-number 
            v-model="topupForm.money" 
            clearable
            :min="1"
            style="width:50%;"
            :controls="false">
          </el-input-number>
        </el-form-item>
        <el-form-item label="红包个数" prop="number">
          <el-input-number 
            v-model="topupForm.number" 
            clearable
            :min="1"
            style="width:50%;"
            :controls="false">
          </el-input-number>
        </el-form-item>
        <el-form-item label="开始时间" prop="start">
          <el-date-picker
            v-model="topupForm.start"
            style="width:100%;"
            placeholder="请选择起始日期"
            type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end">
          <el-date-picker
            v-model="topupForm.end"
            style="width:100%;"
            placeholder="请选择截至日期"
            type="date">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitRule">取 消</el-button>
        <el-button type="info" @click="resetRule">确 定</el-button>
      </span>
    </el-dialog>
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
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      addDrawer:false,/**新增drawer */
      /**表单数据 */
      //机构id 用户名 密码 角色id 联系方式 性别 修改时该管理员id
      addForm:{
        name:"",
        type:"",
        money:"",
        des:""
      },
      formRule:{/**表单验证 */
      },
      selectedList:[],/**select选中项 */
      ruleDialog:false,/**活动规则设置dialog */
      topupForm:{/**充值规则表单 */
        status:"",
        money:"",
        number:"",
        start:"",
        end:""
      },
      topupFormRule:{}/**充值规则表单规则 */
    }
  },
  components: {
    crumbsBar,
    Pagination
  },
  methods:{
    /**获取表格数据 */
    getTableData(){},
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
      this.getTableData();
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
      this.getTableData();
    },
    /**刷新数据 */
    handleRefresh(){
      this.getTableData()
    },

    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /*********** 新增充值金额 ************/
    /**新增充值金额 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'info'
          });
        } else {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          });
        }
      })
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = null;
      }
      this.addDrawer = false;
    },

    /*********** 活动规则设置 ************/
    /**点击活动规则 */
    handleActive(){
      this.ruleDialog = true;
    },
    /**提交活动规则 */
    submitRule(){
      this.$refs['topupForm'].validate((valid)=>{
        if (valid) {
          this.$message({
            message: '点击提交',
            type: 'info'
          });
        } else {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          });
        }
      })
    },
    /**关闭取消规则 */
    resetRule(){
      this.$refs['topupForm'].resetFields();
      for (const key in this.addForm) {
        this.topupForm[key] = null;
      }
      this.ruleDialog = false;
    }
  }
}
</script>

<style scoped>
.topupList{
  width: 100%;
  height: 100%;
}
</style>
