<template>
  <div class="admin">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','管理员管理']">
      <template>
        <el-button type="danger" icon="el-icon-document-delete">删除</el-button>
        <el-button type="primary" icon="el-icon-document-add"
          @click="dialogVisible = true">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-input style="width:200px;margin-right:5px"></el-input>
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
          prop="num"
          show-overflow-tooltip
          label="序号">
        </el-table-column>
        <el-table-column
          prop="user"
          align="center"
          show-overflow-tooltip
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="organ"
          label="机构名称"
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
            <el-button type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
    <!-- 添加管理员 -->
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
import SearchBar from "@/components/SearchBar.vue";
// import ControlBar from "@/components/ControlBar.vue";

export default {
  name: 'admin',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        num:"1",
        user:"测试账号",
        name:"w",
        tel:"159",
        organ:"机构",
        create:"2020-07-14 12:09:56",
        status:"正常"
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
    Pagination,
    SearchBar,
    // ControlBar
  }
}
</script>

<style scoped>
.admin{
  width: 100%;
  height: 100%;
}
</style>
