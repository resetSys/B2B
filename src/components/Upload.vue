<template>
  <div class="upload" @click="handleClick">
    <i class="el-icon-upload"></i>
    选择文件
    <input
      id="fileInput"
      ref="fileInput"
      type="file"
      :accept="accept"
      style="display:none;"
      @change="fileChange">
  </div>
</template>

<script>
export default {
  name: 'upload',
  props:{
    accept:{
      type:String,
      default:""
    },
    size:{
      type:Number,
      default:1024
    }
  },
  data() {
    return {

    }
  },
  methods:{
    /**触发input按钮 */
    handleClick(){
      let ie=window.navigator.appName=="Microsoft Internet Explorer" ? true : false; 
      if(!ie){ 
        this.$refs.fileInput.click();
      }else{
        //创建自定义事件
        let mouse=document.createEvent("MouseEvents");
        //定义事件名
        mouse.initEvent("click", true, true);  
        //触发事件
        this.$refs.fileInput.dispatchEvent(mouse);
      }
    },
    /**选择文件后 */
    fileChange(){
      let fileList = this.$refs.fileInput.files;
      //判断是否选择了文件
      if (fileList.length == 0) {
        this.$message({
          message: '请选择上传文件',
          type: 'warning'
        });
      } else {
        //判断文件的大小
        if (fileList[0].size > (this.size*1024)) {
          this.$message({
            message: '文件过大',
            type: 'error'
          });
        } else {
          //判断文件的类型
          //模糊匹配和比较
          //如果传过来的类型最后一个字符是※ 那么就进行字符串切割匹配
          let isStart = this.accept.indexOf('*') != -1;
          let type,isUse;
          if (isStart) {
            type = this.accept.slice(0,this.accept.lastIndexOf('*')-1);
            isUse = fileList[0].type.indexOf(type) != -1;
          }
          if (this.accept == "" || this.accept == fileList[0].type || isUse) {
            this.$emit('fileChange',fileList[0]);
          } else {
            this.$message({
              message: '选择文件类型不正确',
              type: 'error'
            });
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.upload{
  display: inline-block;
  width: 90px;
  height: 32px;
  background-color: #409EFF;
  line-height: 34px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.1s;
  cursor: pointer;
  font-size: 12px;
}
.upload:hover{
  background-color: #66b1ff;
}
</style>
