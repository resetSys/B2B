<template>
  <div class="login">
    <div class="form">
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
            <el-checkbox v-model="form.checked">记住密码</el-checkbox>
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
  methods:{
    /**
      切换验证码
     */
    handleImgCode(){
      this.imgCodeUrl = "http://47.105.206.10:8077/Users/AdminImgCode?id="+new Date().getTime()
    },
    /**
      提交
     */
    submitFomr(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$router.push({
            path:"/home"
          })
        } else {
          alert("补全字段")
          return false;
        }
      });
    },
    /**
      重置
     */
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
}
.form{
  width:500px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.form-code{
  display: flex;
  align-items: center;
}
.form-code-input{
  width: 200px;
}
.form-code-img{
  width: 90px;
  height: 40px;
  margin-left: 20px;
  border-radius: 3px;
}
.form-checked{
  display: flex;
  justify-content: flex-start;
  padding-left: 3px;
  box-sizing: border-box;
}
</style>
