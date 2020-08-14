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
      default:10240
    },
    multiple:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {

    }
  },
  mounted(){
    //1、判断是否添加多选属性
    if (this.multiple) {
      this.$refs['fileInput'].setAttribute('multiple','multiple')
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
        //判断文件的类型
        /**
          只需要获取文件类型，进行查询即可
         */
        //1、将格式转化为小写
        let accept = this.accept.toLowerCase();
        //2、新建变量存放，file文件
        let data = [];
        //3、使用for循环判断文件是否符合格式
        fileList.forEach(ele => {
          if (accept.indexOf(ele.type)!=-1) {
            //符合格式数据被添加
            data.push(ele)
          }
        });
        //4、返回符合格式的file数据
        this.$emit('fileChange',data);
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
