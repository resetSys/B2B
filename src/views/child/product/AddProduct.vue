<template>
  <!-- 商品新增/编辑 -->
  <div class="addProduct">
    <!-- 页头 -->
    <page-header @back="goBack" :title="$route.meta.title"></page-header>
    <!-- 商品表单 -->
    <el-scrollbar style="height:calc(100% - 60px);padding-top:20px;box-sizing:border-box;">
      <el-form :model="goodForm" label-position="rigth" label-width="100px"
        :rules="goodFormRule" ref="addForm">
        <div class="form-item-wrap">
          <el-form-item label="商品分类" prop="classify">
            <el-cascader
              v-model="goodForm.classify"
              :options="classifyList"
              :props="{label:'label',value:'value',children:'children'}"
              style="width:200px"
              :checkStrictly="true"
              :emitPath="false"
              :show-all-levels="false">
            </el-cascader>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品楼层" prop="floor">
            <el-select v-model="goodForm.floor">
              <el-option
                v-for="item in floorList"
                :key="item.value"
                :value="item.value"
                :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="价格" prop="price">
            <el-input-number
              v-model="goodForm.price"
              :controls="false"
              :precision="3"
              style="width:200px"
              :min="0">
            </el-input-number>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="品牌" prop="brand">
            <el-input class="form-input" v-model="goodForm.brand" clearable
              style="width:200px;">></el-input>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="排序值" prop="sort">
            <el-input-number
              v-model="goodForm.sort"
              :controls="false"
              style="width:200px"
              :min="1">
            </el-input-number>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品封面图" prop="">
            <div class="imgView" v-show="coverImg!=''">
              <el-image
                class="imgView-img"
                :src="coverImg"
                fit="cover"
                :preview-src-list="[coverImg]"></el-image>
            </div>
            <upload @fileChange="uploadCallBack" 
              accept="image/jpg,image/jpeg,image/png">
            </upload>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品详情图" prop="">
            <div class="imgView" v-show="slideList.length"
              v-for="(item,index) in slideList"
              :key="index">
              <el-image
                class="imgView-img"
                :src="item.url"
                fit="cover"
                :preview-src-list="viewSlideList"></el-image>
              <span class="imgView-del el-icon-delete"
                @click="handleDelSlide(item.id)"></span>
            </div>
            <upload @fileChange="uploadCallBack2"
              accept="image/jpg,image/jpeg,image/png"
              :multiple="true"></upload>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="商品说明书" prop="des">
            <wang-editor :value="goodForm.des" @change="change"></wang-editor>
          </el-form-item>
        </div>
        <div class="form-item-wrap">
          <el-form-item label="">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
//组件
import WangEditor from "@/components/WangEditor.vue";
import Upload from "@/components/Upload.vue";
//网络
import { request } from "@/request";
import { uploadRequest } from "@/request";
//表单验证
import { mustFill } from "@/mixins/data/valid.js";

export default {
  name: 'addProduct',
  data() {
    return {
      adminId:this.$store.state.userInfo.adminId,
      organId:this.$store.state.userInfo.organId,
      /**接收到商品id */
      goodsId:null,
      /**商品表单 */
      //商品分类 商品楼层 价格 品牌 描述 排序 封面图 商品详情图
      goodForm:{
        organId:"",
        articleId:"",
        classify:"",
        floor:"",
        price:"",
        brand:"",
        des:"",
        sort:"",
        cover:"",
        slides:""
      },
      goodFormRule:{
        classify:[mustFill],
        floor:[mustFill],
        price:[mustFill],
        // brand:[mustFill],
        sort:[mustFill],
        des:[mustFill]
      },
      /**存放封面图img临时地址 */
      coverImg:"",
      /**存放商品详情图 */
      slideList:[],
      /**分类列表 */
      classifyList:[],
      /**楼层列表选项 */
      floorList:[]
    }
  },
  components: {
    WangEditor,
    Upload
  },
  mounted(){
    //接收role传递参数
    let prams = JSON.parse(decodeURIComponent(this.$route.query.prams));
    if (prams) {
      //执行编辑，没有注册
      this.goodsId = prams.goodsId;
      this.goodForm.organId = prams.organId;
      this.getGoodData();
      this.getClassify();
    }
  },
  computed:{
    /**返回详情图片地址 */
    viewSlideList(){
      return this.slideList.map((item)=>{
        return item.url
      })
    }
  },
  methods:{
    /**返回 */
    goBack() {
      this.$router.go(-1);
    },

    /**获取商品详情 */
    getGoodData(){
      request({
        url:"HTGoodsAdmin/GetGoodsDetail",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          articleId:this.goodsId
        },
      }).then((res) => {
        let {Message,Data,MsgCode,Success} = res.data.models;
        if (Success) {
          this.goodForm.articleId = Data[0].ArticleId;
          this.goodForm.classify = Data[0].CategoryId;
          this.goodForm.floor = Data[0].Attribute[0].FloorId;
          this.goodForm.price = Data[0].Price;
          this.goodForm.brand = Data[0].BrandCode;
          this.goodForm.des = Data[0].Content;
          this.goodForm.sort = Data[0].Sort;
          this.coverImg = Data[0].ImgUrl;
          Data[0].ImgList.forEach(ele => {
            this.slideList.push({
              url:ele.ImgUrl,
              id:ele.ImgId
            });
          });
        } else {
          this.$message({
            message: '获取详情失败:'+MsgCode+Message,
            type: 'error'
          });
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    /**获取商品详情图 */
    getDetailImg(){
      request({
        url:"HTGoodsAdmin/GetGoodsImgList",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
          articleId:this.goodsId
        },
      }).then((res) => {
        let {Message,Data,MsgCode,Success} = res.data.models;
        this.slideList = [];
        if (Success) {
          Data.forEach(ele => {
            this.slideList.push({
              url:ele.ImgUrl,
              id:ele.ImgId
            });
          });
        } else {
          this.$message({
            message: '获取商品详情图片失败:'+MsgCode+Message,
            type: 'error'
          });
        }
      })
    },
    /**获取商品分类数据 */
    getClassify(){
      request({
        url:"HTGoodsAdmin/GetGoodsCheckBox",
        method:"post",
        data:{
          entId:this.organId,
          userId:this.adminId,
        },
      }).then((res) => {
        let {Success,Data} = res.data.models;
        let categoryList = Data[0].CategoryList;
        let attributeList= Data[0].AttributeList;
        this.classifyList = [];
        this.floorList = [];
        if (Success) {
          categoryList.forEach((ele,index) => {
            this.classifyList.push({
              label:ele.Title,
              value:ele.CategoryId,
              children:[]
            });
            if (ele.LowerList instanceof Array) {
              ele.LowerList.forEach((ele2) => {
                this.classifyList[index].children.push({
                  label:ele2.Title,
                  value:ele2.CategoryId,
                })
              });
            }
          });
          attributeList.forEach(ele => {
            this.floorList.push({
              value:ele.AttributeId,
              label:ele.Title
            })
          });
        }
      }).catch((err) => {
        window.console.log(err);
      });
    },

    /**提交表单 */
    submitForm(){
      this.$refs['addForm'].validate((valid)=>{
        if (valid) {
          request({
            url:"HTGoodsAdmin/SaveGoodsInfo",
            method:"post",
            data:{
              entId:this.organId,
              userId:this.adminId,
              xEntId:this.goodForm.organId,
              articleId:this.goodForm.articleId,
              categoryId:this.goodForm.classify[1],
              attribute:this.goodForm.floor,
              price:this.goodForm.price,
              brandCode:this.goodForm.brand,
              content:this.goodForm.des,
              sort:this.goodForm.sort
            },
          }).then((res) => {
            let {Success,MsgCode,Message} = res.data.models;
            if (Success) {
              //提示新增功能成功,关闭dialog,刷新数据
              this.$message({
                message: '操作成功',
                type: 'success'
              });
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
    /**重置表单 */
    resetForm(){
      this.$refs['addForm'].resetFields();
    },
    /**删除详情图片 */
    handleDelSlide(id){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        request({
          url:"HTGoodsAdmin/DltGoodsImg",
          method:"post",
          data:{
            entId:this.organId,
            userId:this.adminId,
            imgId:id
          },
        }).then((res) => {
          let {Success,MsgCode,Message} = res.data.models;
            if (Success) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.getDetailImg();
            } else {
              this.$message({
                message: '操作失败'+MsgCode+Message,
                type: 'error'
              });
            }
        }).catch((err) => {
          console.log(err);
        });
      });
    },


    /**文件上传回调 */
    uploadCallBack(file){
      if (file.length) {
        //将上传的图片file对象直接转化为blob地址，无需重新获取商品详情
        this.coverImg = URL.createObjectURL(file[0])
        this.uploadImage('Goods',file);
      }
    },
    uploadCallBack2(file){
      this.uploadImage('GoodsDetail',file);
      //商品详情图片是叠加的，需要重新请求数据
      this.getDetailImg();
    },
    /**商品图片上传 */
    uploadImage(type,file){
      let data = {
        entId:this.organId,
        userId:this.adminId,
        articleId:this.goodsId,
        imgType:type
      }
      let formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data,key)) {
          formData.append(key,data[key]);
        }
      }
      //将file数组添加到formData实例中
      file.forEach((ele,index) => {
        formData.append('file'+index,ele);
      });

      uploadRequest({
        url:"HTGoodsAdmin/GoodsImgUpload",
        method:"post",
        data:formData
      }).then((res) => {
        //图片上传成功提示
        let {Message,MsgCode,Success} = res.data.models;
        if (Success) {
          this.$message({
            message: '图片上传成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: '图片上传失败:'+MsgCode+Message,
            type: 'error'
          });
        }
        //如果是详情图片上传刷新
        if (type == "GoodsDetail") {
          this.getDetailImg();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    /**富文本编辑内容改变回调 */
    change(val) {
      this.goodForm.des = val
    },
  }
}
</script>

<style scoped>
.addProduct{
  width: 100%;
  height: 100%;
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
