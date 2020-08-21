<template>
  <!-- 图片文件上传预览容器 -->
  <div class="container">
    <div class="imgView" v-show="imgList.length"
      v-for="(item,index) in imgList"
      :key="index">
      <el-image
        class="imgView-img"
        :src="item.url"
        fit="cover"
        :preview-src-list="viewList"></el-image>
      <span class="imgView-del el-icon-delete" v-if="isDelete"
        @click="handleDel(item)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgView',
  props:{
    //图片列表
    imgList:{
      type:Array,
      default(){
        return []
      }
    },
    //是否显示删除
    isDelete:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {

    }
  },
  computed:{
    /**返回开启预览地址 */
    viewList(){
      return this.imgList.map((item)=>{
        return item.url
      })
    }
  },
  methods:{
    handleDel(item){
      this.$emit("handleDel",item)
    }
  }
}
</script>

<style scoped>
.container{
  display: inline-block;
  width: auto;
  height: auto;
}
/* 商品图片上传预览 */
.imgView{
  display: inline-block;
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;
  height: 100px;
  width: 100px;
  vertical-align: middle;
}
.imgView-img{
  width: 100%;
  height: 100%;
}
.imgView-del{
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  font-size: 20px;
  color: #F56C6C;
  opacity: 0.5;
  transition: opacity 0.2s;
}
.imgView-del:hover{
  opacity: 1;
}
</style>
