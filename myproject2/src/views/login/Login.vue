<template>
  <div id='login'>
    <el-card class="card">
      <el-input
        placeholder="请输入学号 / 工号"
        v-model="name"
        clearable
        class="name">
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
        class="password">
      </el-input>
      <div class="role">
        <span class="radio-title">请选择登录角色：</span>
        <el-radio-group v-model="role">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">教师</el-radio>
          <el-radio :label="3">管理员</el-radio>
        </el-radio-group>
      </div>      
      <el-button type="primary" class="login" @click="btnlogin">登录</el-button>
      <div class="register">
        <el-button type="text" @click="btnregister">新用户注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {login} from '@/network/loginRegister.js'
export default {
  name:'Login',
  data(){
    return {
      name: '',
      password: '',
      role: 1
    }
  },
  methods: {
    btnlogin() {
      // 发送请求，判断用户名、密码、角色是否正确，正确则返回token，并根据角色，跳转到对应页面
      login(this.name, this.password, this.role).then(res => {
        if(res.data.status===400) {
          this.$message.error(res.data.message); 
        } else if(res.data.status===1) {
          this.$message.error('登录失败，请稍后重试'); 
        } else if(res.data.status===200) {
          sessionStorage.setItem('no',res.data.no)
          sessionStorage.setItem('name',res.data.name)
          sessionStorage.setItem('img',res.data.img)
          sessionStorage.setItem('token',res.data.token)
          if(this.role===1) {
            this.$router.replace('/student')
          } else if(this.role===2) {
            this.$router.replace('/teacher')
          } else if(this.role===3) {
            this.$router.replace('/admin')
          }
        }        
      })
    },
    btnregister() {
      // 跳转到注册页面
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  #login {
    width: 100%;
    border: 1px solid black;
  }
  .card {
    width: 450px;
    margin: 150px auto;
  }
  .name,.password {
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .radio-title {
    margin-right: 15px;
  }
  .login {
    margin-top: 30px;
    width: 100%;
    font-size: 1rem;
  }
  .register {
    text-align: right;
    margin-top: 20px;
  }
</style>