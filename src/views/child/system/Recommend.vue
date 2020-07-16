<template>
  <div class="recommed">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['系统配置','推荐专区']"></crumbs-bar>
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
          prop="index"
          show-overflow-tooltip
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column
          prop="alias"
          label="别名"
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
          <template>
            <el-button type="primary" style="padding:2px 3px;" plain
              @click="dialogVisible= true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <pagination :allPage="0" :pageSize="20" :currIndex="1"></pagination>
    <!-- 修改楼层名 -->
    <el-dialog
      title="修改楼层名"
      :visible.sync="dialogVisible"
      :close-on-click-modal="$store.state.closeOnClickModal"
      :close-on-press-escape="$store.state.closeOnPresEscape"
      width="500px">
      <el-form :model="formData" label-position="left" label-width="80px"
        :rules="formRule">
        <el-form-item label="楼层名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入楼层名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img">
          <img-upload action="https://jsonplaceholder.typicode.com/posts/" @fallback="imgFallback"></img-upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="formData.url" placeholder="电脑端跳转链接地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formData.sort" controls-position="right"
            :min="1" :max="100" placeholder="请输入排列序号"></el-input-number>
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
import ImgUpload from "@/components/ImgUpload.vue";

export default {
  name: 'recommend',
  data() {
    return {
      tableData:[{
        index:"1",
        name:"专区推荐",
        alias:"Prefecture",
        sort:1
      }],
       /**dialog */
      dialogVisible:false,
      formData:{
        name:"",
        img:"",
        url:"",
        sort:null
      },
      formRule:{
        name:[
          {required:true,message:'请输入楼层名称',trigger:'blur'},
        ],
        img:[
          {required:true,message:"请选择图片",trigger:'blur'}
        ],
        url:[
          {required:true,message:"请输入链接地址",trigger:'blur'}
        ],
        sort:[
          {required:true,message:"请输入楼层顺序",trigger:'blur'}
        ]
      },
    }
  },
  components: {
    crumbsBar,
    Pagination,
    ImgUpload
  },
  methods:{
    /**图片上传成功返回url */
    imgFallback(src){
      this.formData.img = src;
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.recommed{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
