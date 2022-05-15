<template>
  <second-page>
    <div slot="mainBody">
      <div class="wrapname">
        <span>习题卷名称：</span>
        <el-input
          placeholder="请输入习题卷名称"
          v-model="bagname"
          clearable
          class="bagname">
        </el-input>
      </div>
      
      <div class="wrapbutton">
        <el-button type="success" round @click="zx">上传选择题</el-button>
        <el-button type="success" round @click="tk">上传填空题</el-button>
        <el-button type="success" round @click="jd">上传简答题</el-button>
        <el-button type="success" round @click="js">上传计算题</el-button>
        <el-button type="success" round @click="submit">提交</el-button>
      </div>
    </div>
  </second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {newQue} from '@/network/teacher.js'

export default {
  name: 'TeaQueNew',
  data() {
    return {
      bagname: '',
      tno: sessionStorage.getItem('no')
    }
  },
  methods: {
    zx(){
      this.$router.push('/teacher/questions/xz')
    },
    tk(){
      this.$router.push('/teacher/questions/tk')
    },
    jd(){
      this.$router.push('/teacher/questions/jd')
    },
    js(){
      this.$router.push('/teacher/questions/js')
    },
    submit() {
      newQue(this.tno, this.bagname, this.$store.state.newQueInfo).then(res=>{
        if(res.data.status===200) {
          this.$message.success('习题创建成功');
          this.$store.commit('clearNewQueInfoNewQueIndex')
          setTimeout(() => {
            this.$router.replace('/teacher/questions')
          }, 1500);
        } else {
          this.$message.error('习题创建失败，请稍后重新提交');
        }
      })
    }
  },
  components: {
    SecondPage
  }
}
</script>

<style scoped>
.box {
  display: flex;
  line-height: 24px;
  padding: 30px 0;
  border-bottom: 1px solid #C0C4CC;
}
.upload {
  flex: 1;
}
.el-upload__tip {
  display: inline-block;
  padding-left: 10px;
}
.button {
  text-align: right;
  padding-top: 30px;
}
.wrapbutton {
  padding-top: 1.875rem;
}
.bagname {
  width: 500px;
  display: inline-block;
}
.wrapname {
  padding-top: 30px;
}
</style>