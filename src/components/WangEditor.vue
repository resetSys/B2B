<template>
  <div class="wangEditor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'wangEditor',
  data() {
    return {
      //编辑器对象
      editor: null,
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {  
    value: function(value) {  
      if (value !== this.editor.txt.html()) {  
        this.editor.txt.html(this.value)  
      }  
    }  
  }, 
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.onchange = (html) => {
        this.$emit('change', html) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style scoped>
.wangEditor{
  width: auto;
  height: auto;
}
.toolbar {
  width: 100%;
  border: 1px solid #ccc;
}
.text {
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  height: 300px;
  overflow-y: initial;
}
.text>>>.w-e-text{
  overflow-y: auto;
}
</style>
