<template>
  <!-- 商品分类 -->
  <div class="productClassify">
    <!-- 面包屑导航 -->
    <crumbs-bar @refresh="handleRefresh" :crumbsList="['商品管理',$route.meta.title]">
      <template slot="controls">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          @click="handleAdd(false)">新增分类</el-button>
      </template>
    </crumbs-bar>
    <!-- 数据展示 -->
    <el-scrollbar style="height:calc(100% - 90px)">
      <el-table
        :data="tableData"
        stripe
        :row-style="{color:'#303133'}"
        tooltip-effect="dark"
        @selection-change="selectionChange"
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
                prop="classifyId"
                align="center"
                show-overflow-tooltip
                label="类别id">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                show-overflow-tooltip
                label="类别名称">
              </el-table-column>
              <el-table-column
                prop="grade"
                label="等级"
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
                <template slot-scope="scope">
                  <el-button type="warning" style="padding:2px 3px;" plain
                    @click="handleAdd(scope.row)">编辑</el-button>
                  <el-button type="danger" style="padding:2px 3px;" plain
                    @click="handleDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="classifyId"
          align="center"
          show-overflow-tooltip
          label="类别id">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="类别名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="等级"
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
          <template slot-scope="scope">
            <el-button type="warning" style="padding:2px 3px;" plain
              @click="handleAdd(scope.row)">编辑</el-button>
            <el-button type="danger" style="padding:2px 3px;" plain
              @click="handleDel">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <pagination :allPage="allPage" :pageSize="pageSize" :currIndex="currPage"
      @hanSiChange="hanSiChange" @hanCurrChange="hanCurrChange"></pagination>
    <!-- 新增分类 -->
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
          <el-form :model="addForm" label-position="rigth" label-width="100px"
            :rules="addFormRule" ref="addForm">
            <el-form-item label="父类别" prop="parent">
              <el-select v-model="addForm.parent" placeholder="请选择" clearable style="width:100%">
                <el-option label="开启" value="开启"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="addForm.sort" clearable></el-input>
            </el-form-item>
            <el-form-item label="类别名称" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="分类图片" prop="img">
              <img-upload action=""></img-upload>
            </el-form-item>
            <el-form-item label="调用别名" prop="alias">
              <el-input v-model="addForm.alias" clearable></el-input>
            </el-form-item>
            <el-form-item label="seo标题" prop="seoTit">
              <el-input v-model="addForm.seoTit" clearable></el-input>
            </el-form-item>
            <el-form-item label="seo描述" prop="seoDes">
              <el-input v-model="addForm.seoDes" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="drawer-footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="info" @click="clearForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ImgUpload from "@/components/ImgUpload";
//网络
import { request } from "@/request";

export default {
  name: 'productClassify',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**表格数据 */
      //序号	编号	类别名称	级别	排序	操作
      tableData:[{
        parentId:"编号",
        name:"类别名称",
        classifyId:"类别名称",
        grade:"级别",
        sort:"排序",
        imgUrl:"图片地址",
        childs:[]
      }],
      /**分页数据 */
      currPage:1,
      pageSize:0,
      allPage:0,
      /**select选中项 */
      selectedList:[],
      /**新增drawer */
      addDrawer:false,
      /**新增分类表单 */
      //父类别 排序 类别名称 分类图片 调用别名 seo标题 seo描述
      addForm:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      },
      addFormRule:{
        parent:"",
        sort:"",
        name:"",
        img:"",
        alias:"",
        seoTit:"",
        seoDes:""
      }
      
    }
  },
  components: {
    ImgUpload
  },
  mounted(){
    this.getTableData()
  },
  methods:{
    /**获取表格 */
    getTableData(){
      request({
        url:"HTGoodsAdmin/GetGoodsCheckBox",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
        },
      }).then((res) => {
        let {Success,Data,RecordCount} = res.data.models;
        let categoryList = Data[0].CategoryList;
        this.allPage = RecordCount;
        this.tableData = [];
        if (Success) {
          this.recursion(categoryList);
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
          parentId:list[i].ParentId,
          name:list[i].Title,
          classifyId:list[i].CategoryId,
          grade:list[i].ClassLayer,
          sort:list[i].SortId,
          imgUrl:list[i].Img_Url,
          childs:[]
        })
        if (list[i].LowerList instanceof Array) {
          for (let j = 0,childs = list[i].LowerList; j < childs.length; j++) {
            this.tableData[i].childs.push({
              parentId:childs[j].ParentId,
              name:childs[j].Title,
              classifyId:childs[j].CategoryId,
              grade:childs[j].ClassLayer,
              sort:childs[j].SortId,
              imgUrl:childs[j].Img_Url,
            })
          }
        }
        
      }
    },

    /**刷新表格数据 */
    handleRefresh(){
      this.getTableData();
    },
    /**分页size改变 */
    hanSiChange(val){
      this.pageSize = val;
    },
    /**当前页改变 */
    hanCurrChange(val){
      this.currPage = val;
    },

    /**会员 selection change触发事件 */
    selectionChange(section){
      //存放选中的表格数据
      this.selectedList = section;
    },

    /**点击删除 */
    handleDel(row){
      this.$confirm('确定删除该条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        request({
          url:"HTGoodsAdmin/DltGoodsCategory",
          method:"post",
          data:{
            entId:this.organId,
            userId:this.adminId,
            CategoryId:row.classifyId
          },
        }).then((res) => {
          let {Message,MsgCode,Success} = res.data.models;
          if (Success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTableData();
          } else {
            this.$message({
              message: '删除失败'+MsgCode+Message,
              type: 'error'
            });
          }
        })
      })
    },

    /**新增/编辑分类 */
    handleAdd(row){
      //将对象转为json再通过url传递
      let prams = null;
      if (row) {
        prams = {
          classify:row.classify,
          grade: row.grade,
          name: row.name,
          number: row.number,
          sort: row.sort,
          imgUrl: row.imgUrl
        }
      } else {
        prams = row;
      }
      
      this.$router.push({
        path:"addProClassify",
        query:{
          row:encodeURIComponent(JSON.stringify(prams))
        }
      });
      prams = null;
    },
    /**关闭drawer 清空表单信息 */
    clearForm(){
      this.$refs['addForm'].resetFields();
      for (const key in this.addForm) {
        this.addForm[key] = null;
      }
      this.addDrawer = false;
    },
    /**提交新增分类 */
    submit(){
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '执行提交',
            type: 'info'
          });
        }
      });
    },
  }
}
</script>

<style scoped>
.productClassify{
  width: 100%;
  height: 100%;
}
</style>
