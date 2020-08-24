<template>
  <div class="login">
    <div class="form">
      <div class="logo"></div>
      <p class="form-tit">b2b后台管理系统</p>
      <el-form ref="form" :model="form" :rules="formRule">
        <el-form-item label="" prop="user">
          <el-input prefix-icon="el-icon-user" v-model="form.user"
            clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input prefix-icon="el-icon-key" v-model="form.pass"
            clearable show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <div class="form-code">
            <el-input class="form-code-input" v-model="form.code"></el-input>
            <el-image class="form-code-img" fit="fill" :src="imgCodeUrl"
              @click="handleImgCode"></el-image>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="form-checked">
            <el-checkbox v-model="form.checked">保持登录</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitFomr">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//网络请求
import {request} from "@/request"
//工具方法

export default {
  name: 'Login',
  data() {
    return {
      form:{
        user:"",
        pass:"",
        code:"",
        checked:true
      },
      formRule:{
        user:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      imgCodeUrl:"http://47.105.206.10:8077/Users/AdminImgCode?id="+new Date().getTime()
    }
  },
  components: {

  },
  mounted(){
   
  },
  methods:{
    /**
      切换验证码
     */
    handleImgCode(){
      this.imgCodeUrl = "http://47.105.206.10:8077/Users/AdminImgCode?id="+new Date().getTime()
    },
    /**提交*/
    submitFomr(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          request({
            method:"post",
            url:"HTUserAdmin/ManagerLogin",
            data:{
              userName:this.form.user,
              passWord:this.form.pass,
            }
          }).then((res) => {
            let {Success,Message,MsgCode,Data} = res.data.models;
            if (Success) {
              //将返回的token、机构id、用户id存放到localStroage中
              window.localStorage.setItem('b2bToken','admin-token');
              window.localStorage.setItem('organId',Data[0].entId);
              window.localStorage.setItem('adminId',Data[0].userId);
              // this.$store.commit("changeId",{userInfo:Data[0]});
              //成功后跳转
              this.$router.replace({
                path:"/home"
              })
              this.$message({
                message: '验证成功',
                type: 'success'
              });
            } else {
              this.$message({
                message:Message+MsgCode,
                type: 'error'
              });
            }
            window.console.log(res)
          }).catch((err) => {
            window.console.log(err)
          });
        } else {
          this.$message({
            message: '补全字段',
            type: 'error'
          });
        }
      });
    },
    /**重置*/
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style scoped>
.login{
  position: relative;
  width: 100%;
  height: 100%;
  background: url("https://images.pexels.com/photos/443356/pexels-photo-443356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") no-repeat center;
  /* https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 */
  /* https://images.pexels.com/photos/443356/pexels-photo-443356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 */
  background-size: 100% auto;
}
/************** 表单样式 *****************/
.form{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -135px;
  width:340px;
  height: 260px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.19);
}
.logo{
  position: absolute;
  top: -100px;
  left: 50%;
  margin-left: -50px;
  width: 100px;
  height: 100px;
  background: url("~assets/logo.png") no-repeat center;
  background-size: 100% 100%;
}
.form-tit{
  text-align: center;
  padding-bottom: 10px;
  font-size: 14px;
  color: #C0C4CC;
}
.form::before{
  content: '';
  display: inline-block;
  position: absolute;
  border: 10px solid transparent;
  border-bottom-color: rgba(255, 255, 255, 0.19);
  left: 50%;
  top: -20px;
  margin-left: -10px;
  z-index: 99;
  width: 0;
  height: 0;
}
.form-code{
  display: flex;
  align-items: center;
}
.form-code-input{
  width: 200px;
}
.form-code-img{
  width: 80px;
  height: 32px;
  margin-left: 20px;
  border-radius: 3px;
}
.form-checked{
  display: flex;
  justify-content: flex-start;
  padding-left: 3px;
  box-sizing: border-box;
}
/************** 登录框样式 *****************/
.el-input>>>.el-input__inner{
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
