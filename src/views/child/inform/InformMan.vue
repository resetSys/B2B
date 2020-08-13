<template>
  <!-- 消息推送 -->
  <div class="informMan">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['消息推送',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate">创建消息</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="输入编号/名称" v-model="searchForm.name"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
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
          prop="type"
          show-overflow-tooltip
          label="类型">
        </el-table-column>
        <el-table-column
          prop="range"
          align="center"
          show-overflow-tooltip
          label="推送范围">
        </el-table-column>
        <el-table-column
          prop="time"
          label="推送时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isPush"
          label="是否推送"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isPublish"
          label="是否发布"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="类容"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="success" style="padding:2px 3px;" plain>启用</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 创建消息 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        消息创建
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="消息类型" prop="msgType">
              <el-select v-model="addForm.msgType" placeholder="请选择" clearable style="width:100%">
                <el-option label="公告" value=""></el-option>
                <el-option label="积分" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户类型" prop="clientType">
              <el-select v-model="addForm.clientType" placeholder="请选择" clearable style="width:100%">
                <el-option label="全部" value=""></el-option>
                <el-option label="终端" value=""></el-option>
                <el-option label="连锁" value=""></el-option>
                <el-option label="批发" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="startTime">
              <el-date-picker
                v-model="addForm.startTime"
                type="datetime"
                style="width:100%;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="addForm.title" clearable></el-input>
            </el-form-item>
            <el-form-item label="url地址" prop="url">
              <el-input v-model="addForm.url" clearable></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="classify">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入内容"
                v-model="addForm.classify">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'informMan',
  data() {
    return {
      /**表格数据 */
      //序号	类型	推送范围	推送时间	标题	Url地址	是否推送	是否发布	类容	操作
      tableData:[{
        type:"类型",
        range:"推送范围",
        time:"推送时间",
        title:"标题",
        url:"URL地址",
        isPush:"是否推送",
        isPublish:"是否发布",
        content:"类容"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      addDrawer:false,/**创建消息drawer */
      /**表单数据 */
      //消息类型 客户类型 开始时间日期 标题 url地址 类容
      addForm:{
        msgType:"",
        clientType:"",
        startTime:"",
        title:"",
        url:"",
        classify:""
      },
      formRule:{/**表单验证 */
      },
      searchForm:{
        name:""
      }
    }
  },
  components: {
    
  },
  methods:{
    /**获取表格数据 */
    getTableData(){},
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
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    /**创建消息 */
    handleCreate(){
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
        }
      });
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    },
  }
}
</script>

<style scoped>
.informMan{
  width: 100%;
  height: 100%;
}
</style>
