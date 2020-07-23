<template>
  <div class="sysSetting">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['系统配置','系统设置']"></crumbs-bar>
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
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
    <!-- 规则设置 -->
    <el-dialog
      title="规则设置"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="500px">
      <el-form :model="formData" label-position="left" label-width="80px"
        :rules="formRule">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="配置状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" clearable style="width:100%">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input-number v-model="formData.money" controls-position="right"
            :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="配置" prop="config">
          <el-input v-model="formData.config" clearable></el-input>
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
      }
    }
  },
  components: {
    crumbsBar,
    Pagination
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
