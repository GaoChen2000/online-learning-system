<template>
<second-page>
  <div slot="mainBody" class="main">
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input placeholder="请输入新密码" v-model="form.password" show-password></el-input>
        <div class="tip">不填写表示不用修改</div>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="请重新输入密码" v-model="form.password2" show-password></el-input>
        <div class="tip">不填写表示不用修改</div>
      </el-form-item>
      <div class="submit">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>        
    </el-form>
  </div>
</second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getInfo,setInfo} from '@/network/self.js'
export default {
  name: 'Self',
  created() {
    // 获取路由中的参数
    this.role=this.$route.query.role
    this.no=this.$route.query.no

    // 发送请求，获得用户信息
    getInfo(this.role, this.no).then(res=>{
      this.form.name = res.data[0].name
    })
  },
  data() {
    return {
      form: {
        name: '',
        password: '',
        password2: '',
      },
      role: -1,
      no: -1
    }
  },
  methods: {
    // 提交个人中心修改的信息
    submit() {
      // 判断2个密码是否相同
      var updatePassword = true
      if(this.form.password !== this.form.password2) {
        return this.$message.error('请确认 2 次输入的密码相同');
      }
      if(!this.form.password) {
        updatePassword = false
      }
      setInfo(this.no, this.form.name, this.form.password, this.role, updatePassword).then(res=>{
        if(res.data.status===200) {
          this.$message.success('修改成功');
          setTimeout(()=>{
            this.$router.go(-1)
          },1500)
        } else {
          this.$message.error('修改失败，请稍后重新提交');
        }
      })
    }
  },
  components: {
    SecondPage,
  }
}
</script>

<style scoped>
.form {
  width: 500px;
  margin: 30px 150px;
}
.tip {
  color: #67C23A;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .submit {
    text-align: right;
  }
</style>