<template>
  <!-- 会员列表 -->
  <div class="memList">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['会员管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-delete"
          :disabled="selectedList.length==0" @click="handleDel">批量删除</el-button>
        <el-button type="warning" icon="el-icon-s-check"
          :disabled="selectedList.length==0">批量审核</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.status" placeholder="会员状态" 
          style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value="2"></el-option>
          <el-option label="未启用" value="1"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px"></el-input>
        <el-button type="primary" icon="el-icon-search"
          @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 130px)">
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
          prop="user"
          align="center"
          show-overflow-tooltip
          label="用户名">
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
          prop="status"
          label="状态"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status|formatType">{{scope.row.status|formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="warning" plain style="padding:2px 3px;"
              @click="couponDialog = true">优惠券发放</el-button>
            <el-button type="danger" plain style="padding:2px 3px;"
              v-if="scope.row.status == 2" @click="changeStatus(scope.row,1)">禁用</el-button>
            <el-button type="success" plain style="padding:2px 3px;"
              v-if="scope.row.status == 1" @click="changeStatus(scope.row,2)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加管理员 -->
    <el-drawer
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        信息注册
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="用户名" prop="user">
              <el-input v-model="addForm.user" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="addForm.pass" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="organ">
              <el-select v-model="addForm.organ" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理角色" prop="role">
              <el-select v-model="addForm.role" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="addForm.tel" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
    <!-- 优惠券发放dialog -->
    <el-dialog
      title="优惠券发放"
      :visible.sync="couponDialog"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="70%">
      <search-bar>
        <template>
          <el-input v-model="searchForm2.name" style="width:200px;margin-right:5px"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-check"
            :disabled="selectedList2.length == 0">确定</el-button>
        </template>
      </search-bar>
      <el-scrollbar style="height:300px">
        <el-table
          :data="couponList"
          stripe
          tooltip-effect="dark"
          @selection-change="selection2Change"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            fixed="left"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            show-overflow-tooltip
            label="名称">
          </el-table-column>
          <el-table-column
            prop="repertory"
            label="库存"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="设备类型"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="range"
            label="范围"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="modeRule"
            label="规则类型"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="goodsRange"
            label="商品范围"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="money"
            label="条件(金额)"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="num"
            label="条件(件数)"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sale"
            label="优惠金额"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="discount"
            label="折扣"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <pagination :allPage="allPage2" :pageSize="pageSize2" :currIndex="currPage2"
        @hanSiChange="hanSiChange2" @hanCurrChange="hanCurrChange2"></pagination>
    </el-dialog>
  </div>
</template>

<script>
//网络
import { request } from "@/request";
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";

export default {
  name: 'memList',
  mixins:[formatStatus],
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
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
        create:"创建日期",
        userId:"用户id",
        unitId:"单位id",
        province:"省",
        city:"市",
        organId:"机构id",
        birth:"出生",
        point:"点",
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**新增管理员drawer */
      addDrawer:false,
      /**表单数据 */
      addForm:{
        user:"",
        pass:"",
        organ:"",
        role:"",
        name:"",
        tel:"",
        sex:"",
        address:""
      },
      /**表单验证 */
      formRule:{
        name:[
          {required:true,message:'请输入配置名称',trigger:'blur'},
        ]
      },
      /**搜索表单 */
      searchForm:{
        status:"99",
        name:""
      },
      /**select选中项 */
      selectedList:[],

      /**优惠券发放dialog */
      couponDialog:false,
      /**优惠券数据 */
      //选择	序号	名称	库存	开始时间	结束时间	设备类型	范围
      //规则类型	商品范围	条件(金额)	条件(件数)	优惠金额	折扣
      couponList:[{
        name:"名称",
        repertory:"库存",
        startTime:"开始时间",
        endTime:"结束时间",
        deviceType:"设备类型",
        range:"范围",
        modeRule:"规则类型",
        goodsRange:"商品范围",
        money:"条件(金额)",
        num:"条件(件数)",
        sale:"优惠金额",
        discount:"折扣"
      }],
      /**优惠券搜索表单 */
      searchForm2:{
        name:""
      },
      /**选中优惠券list */
      selectedList2:[],
      /**优惠券分页数据 */
      currPage2:1,
      pageSize2:0,
      allPage2:0,
    }
  },
  components: {
    
  },
  mounted(){
    this.getTableData()
  },
  computed:{
    memListStr(){
      let idList = []; 
      for (let i = 0; i < this.selectedList.length; i++) {
        idList.push(this.selectedList[i].userId);
      }
      return idList.join();
    }
  },
  methods:{
    /**获取表格 */
    getTableData(){
      request({
        url:"HTUserAdmin/GetMemberList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:this.searchForm.status,
          sqlValue:this.searchForm.name,
          pageIndex:this.currPage,
          pageSize:this.pageSize
        },
      }).then((res) => {
        let {Success,Data,RecordCount} = res.data.models;
        this.allPage = RecordCount;
        this.tableData = [];
        if (Success) {
          for (let i = 0; i < Data.length; i++) {
            this.tableData.push({
              userId:Data[i].UserId,
              unitId:Data[i].BusinessId,
              province:Data[i].Province,
              city:Data[i].City,
              organId:Data[i].EntId,
              birth:Data[i].Birthday,
              point:Data[i].Point,

              user:Data[i].UserName,
              status:Data[i].Status,
              name:Data[i].Name,
              sex:Data[i].Sex,
              tel:Data[i].Telphone,
              unitNum:Data[i].BusinessCode,
              unitName:Data[i].BusinessName,
              clientGrade:"",
              clientType:"",
              organiza:"",
              create:Data[i].AddTime
            })
          }
        }
        window.console.log(res)
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
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

    /**会员 selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      window.console.log(section)
      this.selectedList = section;
    },
    /**编辑表格数据 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**修改会员状态 */
    changeStatus(row,status){
      request({
        url:"HTUserAdmin/UpdateMemberStatus",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          listStr:row.userId,
          status:status,
        },
      }).then((res) => {
        //提示成功，刷新数据
        let {Success,Message,MsgCode} = res.data.models;
        if (Success) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getTableData();
        } else {
          this.$message({
            message: '操作失败:'+Message+MsgCode,
            type: 'error'
          });
        }
        window.console.log(res)
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**点击批量删除 */
    handleDel(){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.changeStatus({userId:this.memListStr},0);
      }).catch(() => {});
    },
    
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    },
    
    /**---------------------------------- */
    /**获取优惠券数据 */
    getCoupon(){
    
    },
    /**分页数据改变 */
    hanSiChange2(val){
      this.pageSize2 = val;
    },
    hanCurrChange2(val){
      this.currPage2 = val;
    },
    /**优惠券 selection change触发事件 */
    selection2Change(section){
      this.selectedList2 = section;
    },
    /**搜索优惠券 */
    searchCoupon(){},
  }
}
</script>

<style scoped>
.memList{
  width: 100%;
  height: 100%;
}
</style>
