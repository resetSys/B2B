<template>
  <!-- 优惠券列表 -->
  <div class="coupons">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['优惠券',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select placeholder="领取类型" style="width:100px;margin-right:5px" 
          v-model="searchForm.getType">
          <el-option label="全部" value="99"></el-option>
          <el-option label="领券中心" value=""></el-option>
          <el-option label="新人" value=""></el-option>
          <el-option label="订单-无限制" value=""></el-option>
          <el-option label="订单-件数规则" value=""></el-option>
          <el-option label="订单-满额规则" value=""></el-option>
        </el-select>
        <el-select placeholder="设备类型" style="width:100px;margin-right:5px" 
          v-model="searchForm.deviceType">
          <el-option label="通用" value="99"></el-option>
          <el-option label="电脑端" value=""></el-option>
          <el-option label="安卓" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
        <el-select placeholder="范围规则" style="width:100px;margin-right:5px" 
          v-model="searchForm.range">
          <el-option label="全部" value="99"></el-option>
          <el-option label="全部商品" value=""></el-option>
          <el-option label="分类商品" value=""></el-option>
          <el-option label="品牌商品" value=""></el-option>
          <el-option label="独立商品" value=""></el-option>
        </el-select>
        <el-select placeholder="规则类型" style="width:100px;margin-right:5px" 
          v-model="searchForm.ruleType">
          <el-option label="全部" value="99"></el-option>
          <el-option label="无门槛" value="无门槛"></el-option>
          <el-option label="满减" value="满减"></el-option>
        </el-select>
        <el-select placeholder="状态" style="width:100px;margin-right:5px" 
          v-model="searchForm.status">
          <el-option label="全部" value="99"></el-option>
          <el-option label="上架中" value=""></el-option>
          <el-option label="未上架" value=""></el-option>
        </el-select>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="优惠券编码" v-model="searchForm.couponCode"></el-input>
        <el-input style="width:200px;margin-right:5px" clearable
          placeholder="优惠券名称" v-model="searchForm.couponName"></el-input>
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
          label="序号"
          align="center"
          width="50">
          <template scope="scope">
            <span>{{(currPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="code"
          show-overflow-tooltip
          label="编码">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="渠道类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="getType"
          label="领取类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="rangeTpe"
          label="范围类型"
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
          prop="couponType"
          label="优惠类型"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="begin"
          label="开始时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="end"
          label="结束时间"
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
            <el-button type="danger" class="my-table-button" plain>下架</el-button>
            <el-button type="success" class="my-table-button" plain>上架</el-button>
            <el-button type="danger" class="my-table-button" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 添加优惠券 -->
    <el-drawer
      title=""
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
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="formRule" ref="addForm">
            <el-form-item label="设备类型" prop="deviceType">
              <el-select placeholder="请选择设备类型" style="width:100%;" 
                clearable v-model="addForm.deviceType">
                <el-option label="通用" value="99"></el-option>
                <el-option label="电脑端" value=""></el-option>
                <el-option label="安卓" value=""></el-option>
                <el-option label="苹果" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="领取类型" prop="getType">
              <el-select placeholder="请选择领取类型" style="width:100%;" 
                clearable v-model="addForm.getType">
                <el-option label="全部" value="99"></el-option>
                <el-option label="领券中心" value=""></el-option>
                <el-option label="新人" value=""></el-option>
                <el-option label="订单-无限制" value=""></el-option>
                <el-option label="订单-件数规则" value=""></el-option>
                <el-option label="订单-满额规则" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="范围类型" prop="range">
              <el-select placeholder="请选择使用范围" style="width:100%;" 
                clearable v-model="addForm.range">
                <el-option label="全部" value="99"></el-option>
                <el-option label="全部商品" value=""></el-option>
                <el-option label="分类商品" value=""></el-option>
                <el-option label="品牌商品" value=""></el-option>
                <el-option label="独立商品" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用规则" prop="ruleType">
              <el-select placeholder="请选择使用规则" style="width:100%;" 
                clearable v-model="addForm.ruleType">
                <el-option label="全部" value="99"></el-option>
                <el-option label="无门槛" value="无门槛"></el-option>
                <el-option label="满减" value="满减"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠券名称" prop="couponName">
              <el-input clearable placeholder="优惠券名称" v-model="addForm.couponName"></el-input>
            </el-form-item>
            <el-form-item label="优惠券总数" prop="couponSum">
              <el-input-number clearable v-model="addForm.couponSum" :min="1"
                :controls="false" style="width:100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="开始时间" prop="start">
              <el-date-picker
                v-model="addForm.start"
                type="date"
                style="width:100%;"
                placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止时间" prop="end">
              <el-date-picker
                v-model="addForm.end"
                type="date"
                style="width:100%"
                placeholder="选择截至日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="info" @click="resetForm">取消</el-button>
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
  name: 'coupons',
  data() {
    return {
      /**表格数据 */
      //序号	操作	编码	名称	数量	渠道类型	领取类型	
      //范围类型	范围	优惠类型	开始时间	结束时间	状态
      tableData:[{
        code:"编码",
        name:"名称",
        num:"数量",
        deviceType:"渠道类型",
        getType:"领取类型",
        rangeTpe:"范围类型",
        range:"范围",
        couponType:"优惠类型",
        begin:"开始时间",
        end:"结束时间",
        status:"状态"
      }],
      /**搜索表单 */
      searchForm:{
        getType:"99",
        deviceType:"99",
        range:"99",
        ruleType:"99",
        status:"99",
        couponCode:"",
        couponName:""
      },
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      addDrawer:false,/**新增drawer */
      /**表单数据 */
      //设备类型 领取类型 范围类型 使用规则 优惠券名称 优惠券数量 开始时间 结束时间
      addForm:{
        deviceType:"99",
        getType:"99",
        range:"99",
        ruleType:"99",
        status:"99",
        couponName:"",
        couponSum:"",
        start:"",
        end:""
      },
      formRule:{/**表单验证 */
      },
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
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

    /**新增优惠券 */
    handleAdd(){
      this.addDrawer = true;
    },
    /**改变状态 */
    changeStatus(){},
    /**提交新增表单 */
    submitForm(){},
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
      this.addDrawer = false;
    }
  }
}
</script>

<style scoped>
.coupons{
  width:100%;
  height: 100%;
}
</style>
