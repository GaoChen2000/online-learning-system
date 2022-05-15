<template>
  <div class="main">
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入用户名"
          v-model="form.name"
          clearable>
      </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          @blur="check">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          placeholder="请重新输入密码"
          v-model="form.password2"
          show-password
          @blur="check">
        </el-input>
        <span id="tip"></span>
      </el-form-item>
      <el-form-item label="登录角色">
        <el-radio-group v-model="form.role">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">教师</el-radio>
          <el-radio :label="3">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="submit">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>      
    </el-form>
  </div>
</template>

<script>
import {register} from '@/network/loginRegister.js'
export default {
  name:'Register',
  data() {
    return {
      form: {
        name: '',
        password: '',
        password2: '',
        role: -1
      }
    }
  },
  methods: {
    check() {
      if(this.form.password===this.form.password2) {
        let tip=document.getElementById("tip")
        tip.innerHTML="密码通过"
        tip.style.color='#67C23A'
      } else {
        let tip=document.getElementById("tip")
        tip.innerHTML="密码不正确"
        tip.style.color='#F56C6C'
      }
    },
    submit(){
      // 判断2个密码是否相同、是否不为空
      if(this.form.password!==this.form.password2) {
        this.$message.error('2次密码不相同');
      } else {
        // 发送请求，根据role创建用户
        register(this.form).then(res=>{
          if(res.data.status!==200) {
            this.$message.error('账号创建失败，请稍后创建');
          } else {
            this.$message.success(res.data.message);
            setTimeout(()=>{
              this.$router.replace('/login')
              setTimeout(()=>{
                this.$notify({
                  title: '重要提示',
                  message: '您注册的账号为：' + res.data.no + '，这是您登录的唯一账号，请妥善保存',
                  duration: 0
                },500);
              })
            },1000)            
          }
        })
      }      
    }
  }
}
</script>

<style scoped>
.main {
  width: 900px;
  margin: 0 auto;
}
.form {
  width: 500px;
  margin: 100px 0 0 100px; 
}
.submit {
  text-align: right;
}
</style>