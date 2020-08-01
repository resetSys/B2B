<template>
  <div class="pathMan">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['权限管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd">添加</el-button>
      </template>
    </crumbs-bar>
    <!-- 搜索框 -->
    <search-bar>
      <template>
        <el-select v-model="searchForm.isUsing" placeholder="是否启用" style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="已启用" value="2"></el-option>
          <el-option label="未启用" value="1"></el-option>
        </el-select>
        <el-select v-model="searchForm.type" placeholder="类型" style="width:100px;margin-right:5px">
          <el-option label="全部" value="99"></el-option>
          <el-option label="商城后台" value="b2b"></el-option>
          <el-option label="业务通APP" value="YWT"></el-option>
        </el-select>
        <el-input v-model="searchForm.name" style="width:200px;margin-right:5px" clearable></el-input>
        <el-button type="primary" icon="el-icon-search"
          @click="getTableData">搜索</el-button>
      </template>
    </search-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        :row-style="{color:'#303133'}"
        :row-key="getRowKeys"
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="70">
        </el-table-column>
        <el-table-column 
          type="expand"
          label="展开"
          align="center"
          width="50">
          <template slot-scope="props">
            <el-table
              :data="props.row.childs"
              stripe
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="序号"
                align="center"
                width="70">
                <template slot-scope="scope">
                  <span>{{props.$index+1}}-{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="name"
                show-overflow-tooltip
                label="名称">
              </el-table-column>
              <el-table-column
                prop="path"
                align="center"
                show-overflow-tooltip
                label="路径">
              </el-table-column>
              <el-table-column
                prop="sort"
                label="排序"
                align="center"
                width="100"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="isUsing"
                label="是否启用"
                align="center"
                width="100"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-tag :type="scope.row.isUsing|formatType">{{scope.row.isUsing|formatStatus}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button type="danger" style="padding:2px 3px;" plain
                    v-if="scope.row.isUsing == 2" @click="changeStatus(scope.row,1)">禁用</el-button>
                  <el-button type="success" style="padding:2px 3px;" plain
                    v-else @click="changeStatus(scope.row,2)">启用</el-button>
                  <el-button type="warning" style="padding:2px 3px;" plain
                    @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button v-if="scope.row.isUsing == 1" type="danger" style="padding:2px 3px;" plain
                    @click="handleDel(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="path"
          align="center"
          show-overflow-tooltip
          label="路径">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="isUsing"
          label="是否启用"
          align="center"
          width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.isUsing|formatType">{{scope.row.isUsing|formatStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="danger" style="padding:2px 3px;" plain
              v-if="scope.row.isUsing == 2" @click="changeStatus(scope.row,1)">禁用</el-button>
            <el-button type="success" style="padding:2px 3px;" plain
              v-else @click="changeStatus(scope.row,2)">启用</el-button>
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.isUsing == 1" type="danger" style="padding:2px 3px;" plain
              @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 添加 -->
    <el-drawer
      title=""
      :visible.sync="addDrawer"
      :withHeader="false"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      :wrapperClosable="$store.state.closeOnClickModal"
      direction="rtl">
      <div class="drawer-header">
        功能管理
      </div>
      <el-scrollbar style="height:calc(100% - 90px);">
        <div class="drawer-form-wrap">
          <el-form :model="addForm" label-position="rigth" label-width="80px"
            :rules="formRule" ref="addForm">
            <el-form-item label="分类" prop="type">
              <el-select v-model="addForm.type" placeholder="类型" style="width:100%;">
                <el-option label="后台" value="b2b"></el-option>
                <el-option label="业务通" value="YWT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="路径地址" prop="path">
              <el-input v-model="addForm.path" clearable></el-input>
            </el-form-item>
            <el-form-item label="父级" prop="parentId">
              <el-select v-model="addForm.parentId" placeholder="请选择" style="width:100%;">
                <el-option label="一级路径" value="0"></el-option>
                <el-option
                  v-for="(item,index) in tableData"
                  :key="index"
                  :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="addForm.sort" :controls="false" :min="0"
                style="width:100%;text-align:left;"></el-input-number>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model="addForm.icon" clearable></el-input>
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
//组件
import crumbsBar from "@/components/CrumbsBar.vue";
import SearchBar from "@/components/SearchBar.vue";
//网络
import { request } from "@/request";
//混入
import { formatStatus } from "@/mixins/filters/formatStatus.js";
import { mustFill } from "@/mixins/data/valid.js";//混入表单必填项

export default {
  name: 'pathMan',
  mixins:[formatStatus],
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      //Id	权限名称	路径名称	父级Id	排序	是否启用 类型b2b/app	操作
      tableData:[{
        id:"Id",
        name:"权限名称",
        path:"路径名称",
        parentId:"父级Id",
        sort:"排序",
        isUsing:"是否启用",
        type:"类型b2b/app"
      }],
      /**分页数据 */
      currPage:1,
      pageSize:20,
      allPage:0,
      /**新增drawer */
      addDrawer:false,
      /**新增表单 */
      //分类 权限名称 路径地址 父级 排序
      addForm:{
        id:"",
        type:"",
        name:"",
        path:"",
        parentId:"",
        sort:"",
        icon:""
      },
      /**表单规则 */
      formRule:{
        type:[mustFill],
        name:[mustFill],
        path:[mustFill],
        parentId:[mustFill],
        sort:[mustFill],
      },
      /**搜索表单 */
      searchForm:{
        isUsing:"99",
        type:"99",
        name:""
      },
      /**select选中项 */
      selectedList:[],
    }
  },
  components: {
    crumbsBar,
    SearchBar
  },
  mounted(){
    this.getTableData()
  },
  filters:{
    /**使用混入 转换tips状态 */
    /**使用混入 转换状态码 */
  },
  methods:{
    /**获取表格 */
    getTableData(){
      request({
        url:"HTSystemSetting/GetMethodList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          status:this.searchForm.isUsing,
          sqlValue:this.searchForm.name,
          Source:this.searchForm.type,
          pageIndex:this.currPage,
          pageSize:this.pageSize
        },
      }).then((res) => {
        let {Success,Data,PageCount} = res.data.models;
        this.allPage = PageCount;
        this.tableData = [];
        if (Success) {
          //一级菜单而二级菜单都加到一起
          /**递归函数 */
          this.recursion(Data);
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },
    /**递归调用函数 */
    recursion(list) {
      //先传入一个list，如果list中的Smethods是数组，再调用自身传入数组
      for (let i = 0; i < list.length; i++) {
        this.tableData.push({
          id:list[i].Id,
          name:list[i].Title,
          path:list[i].Power,
          parentId:list[i].FatherId+'',
          sort:list[i].Sort,
          isUsing:list[i].Status,
          type:list[i].Source,
          icon:list[i].IcoAddress,
          childs:[]
        })
        if (list[i].SMethod instanceof Array) {
          for (let j = 0,childs = list[i].SMethod; j < childs.length; j++) {
            this.tableData[i].childs.push({
              id:childs[j].Id,
              name:childs[j].Title,
              path:childs[j].Power,
              parentId:childs[j].FatherId+'',
              sort:childs[j].Sort,
              isUsing:childs[j].Status,
              icon:childs[j].IcoAddress,
              type:childs[j].Source,
              childs:[]
            })
          }
        }
        
      }
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
    /**删除权限路径 */
    handleDel(id){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        request({
          url:"HTSystemSetting/DltListMethod",
          method:"post",
          data:{
            entId:this.organId,
            userId:this.adminId,
            listStr:id
          },
        }).then((res) => {
          let {Success,Message,MsgCode} = res.data.models;
          if (Success) {
            //提示新增功能成功,关闭dialog,刷新数据
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.clearForm();
            this.getTableData();
          } else {
            this.$message({
              message: '删除失败'+Message+MsgCode,
              type: 'error'
            });
          }
          window.console.log("删除模块->")
          window.console.log(res)
        }).catch((err) => {
          window.console.log(err);
        });
      })
    },

    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },

    /**selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },
    /**编辑表格数据 */
    handleEdit(row){
      for (const key in this.addForm) {
        this.addForm[key] = row[key];
      }
      this.addDrawer = true;
    },
    /**新增路径 */
    handleAdd(){
      this.addDrawer = true;
      this.addForm.type = "b2b";
      this.addForm.parentId = "0";
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = ""
      }
      this.addDrawer = false;
    },
    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          request({
            url:"HTSystemSetting/AddMethodList",
            method:"post",
            data:{
              entId:this.organId,
              userId:this.adminId,
              source:this.addForm.type,
              title:this.addForm.name,
              power:this.addForm.path,
              fatherId:this.addForm.parentId,
              sort:this.addForm.sort,
              gnId:this.addForm.id,
              icoAddress:this.addForm.icon
            },
          }).then((res) => {
            let {Success,MsgCode,Message} = res.data.models;
            if (Success) {
              //提示新增功能成功,关闭dialog,刷新数据
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.clearForm();
              this.getTableData();
            } else {
              this.$message({
                message: '操作失败'+MsgCode+Message,
                type: 'error'
              });
            }
          }).catch((err) => {
            window.console.log(err);
          });
        } else {
          this.$message({
            message: '请补全信息',
            type: 'warning'
          });
        }
      })
    },
    /**修改模块状态 */
    changeStatus(row,status){
      request({
        url:"HTSystemSetting/UpdateMethod",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          gnId:row.id,
          status:status,
          fatherId:row.parentId
        },
      }).then((res) => {
        //提示成功，刷新数据
        let {Success,Message,MsgCode} = res.data.models;
        if (Success) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getTableData();
        } else {
          this.$message({
            message: '修改失败:'+Message+MsgCode,
            type: 'error'
          });
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**为表格加上唯一标识，提高渲染性能 */
    getRowKeys(row) {
      return row.id // 每条数据的唯一识别值
    },
  }
}
</script>

<style scoped>
.pathMan{
  width: 100%;
  height: 100%;
}

</style>
