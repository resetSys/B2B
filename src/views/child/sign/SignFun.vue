<template>
  <!-- 签到功能 -->
  <div class="signRule">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['签到管理',$route.meta.title]">
    </crumbs-bar>
    <el-scrollbar style="height:calc(100% - 60px);margin-top:20px">
      <el-form :model="formData" ref="checkForm" :rules="formRule"
        label-position="right" label-width="120px">
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="formData.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" prop="clientType">
          <el-select v-model="formData.clientType" placeholder="请选择客户类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签到模式" prop="checkPattern">
          <el-select v-model="formData.checkPattern" placeholder="请选择签到模式">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容编辑" prop="text">
          
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
//组件
import crumbsBar from "@/components/CrumbsBar.vue";


export default {
  name: "signRule",
  data() {
    return {
      formData:{
        name:"",
        clientType:"",
        checkPattern:"",
        text:`<p>输入内容</p>`
      },
      formRule:{
        name:[
          {required:true,message:'请输入方案名称',trigger: 'blur'}
        ],
        clientType:[
          {required:true,message:'请选择客户类型',trigger: 'blur'}
        ],
        checkPattern:[
          {required:true,message:'请选择签到模式',trigger: 'blur'}
        ],
        text:[
          {required:true,message:'请编辑规则说明',trigger: 'blur'}
        ]
      },
      myConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 200,
        initialFrameWidth: 850,
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        enableAutoSave: false // 开启从草稿箱恢复功能需要手动设置固定的 editorId，否则组件会默认随机一个，如果页面刷新，下次渲染的时候 editorId 会重新随机，导致无法加载草稿箱数据
      }
    };
  },
  components: {
    crumbsBar,
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted(){
    
  },
  methods: {
    
  },
};
</script>

<style scoped>
.signRule {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.editer {
  width: 80%;
  margin-bottom: 82px;
  height: 400px;
}
</style>
