<template>
  <div class="admin">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['权限管理','管理员管理']">
      <template slot="controls">
        <el-button type="danger" icon="el-icon-document-delete">删除</el-button>
        <el-button type="primary" icon="el-icon-document-add"
          @click="formdrawer = true">添加</el-button>
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
          align="center"
          prop="role"
          show-overflow-tooltip
          label="角色">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="住址"
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
          label="创建日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
            <el-button type="primary"  style="padding:2px 3px;" plain>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
    <!-- 添加管理员 -->
    <el-drawer
      title=""
      :visible.sync="formdrawer"
      :withHeader="false"
      direction="rtl">
      <div class="drawer-header">
        信息注册
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="formData" label-position="rigth" label-width="80px"
            :rules="formRule">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="formData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="formData.pass" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="organ">
              <el-select v-model="formData.organ" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理角色" prop="role">
              <el-select v-model="formData.role" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="formData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="formData.tel" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="formData.sex" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary">确定</el-button>
        <el-button type="info" @click="formdrawer = false">取消</el-button>
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
  name: 'admin',
  data() {
    return {
      /**表格数据 */
      tableData:[{
        user:"测试账号",
        pass:"",
        organ:"机构",
        role:"",
        name:"w",
        tel:"159",
        sex:"男",
        address:"",
        create:"2020-07-14 12:09:56",
        status:"正常"
      }],
      /**新增管理员drawer */
      formdrawer:false,
      formData:{
        user:"",
        pass:"",
        organ:"",
        role:"",
        name:"",
        tel:"",
        sex:"",
        address:""
      },
      formRule:{
        name:[
          {required:true,message:'请输入配置名称',trigger:'blur'},
        ]
      }
    }
  },
  components: {
    crumbsBar,
    Pagination,
    SearchBar
  }
}
</script>

<style scoped>
.admin{
  width: 100%;
  height: 100%;
}

</style>
