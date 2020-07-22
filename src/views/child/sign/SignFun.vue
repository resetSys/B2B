<template>
  <!-- 签到功能 -->
  <div class="signRule">
    <!-- 面包屑导航 -->
    <crumbs-bar :crumbsList="['签到管理','签到功能']">
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
          <quill-editor
            class="editer"
            v-model="formData.text"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
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
      /**vue-quill-editor配置选项 */
      editorOption: {},
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
      }
    };
  },
  components: {
    crumbsBar
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    onEditorReady() {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function() {
      
    },
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
