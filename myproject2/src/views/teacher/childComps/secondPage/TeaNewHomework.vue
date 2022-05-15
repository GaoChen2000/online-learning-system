<template>
  <div>
    <second-page>
      <div slot="mainBody">
        <!-- 表单 -->
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
          <!-- 作业详情 -->
          <el-form-item label="作业详情" prop="detail">
            <el-input
              type="textarea"
             :autosize="{ minRows: 5, maxRows: 7}"
              placeholder="请输入内容"
              v-model="form.detail"
              class="detail">
            </el-input>
          </el-form-item>
          <!-- 截止时间 -->
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="form.stopTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <!-- 选择班级 -->
          <el-form-item label="选择班级" prop="chosenClass">
            <el-select v-model="form.chosenClass" filterable placeholder="请选择">
              <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 2个按钮 -->
        <el-button type="success" round @click="chooseQuestions">选择习题</el-button>
        <el-button type="success" round @click="submitHomework">发布作业</el-button>
        <!-- 已经选择的习题 -->
        <!-- 根据题目类型 type，显示不同的题目组件 -->
        <div v-for="(item, index) in questionArr" :key="item.qno">
          <div v-if="item.type==='1'">
            <xuanze :questionData="item" :done="done" :index="index+1" :teacher="true"></xuanze>
          </div>
          <div v-else-if="item.type==='2'">
            <tiankong :questionData="item" :done="done" :index="index+1" :teacher="true"></tiankong>
          </div>
          <div v-else-if="item.type==='3'">
            <jianda :questionData="item" :done="done" :index="index+1" :teacher="true"></jianda>
          </div>
          <div v-else-if="item.type==='4'">
            <jisuan :questionData="item" :done="done" :index="index+1" :teacher="true"></jisuan>
          </div>
        </div>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getAllClass, newHomeworkQuestionArr, newHomeworkSubmit} from '@/network/teacher.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'TeaNewHomework',
  created() {
    // 发送请求，根据 tno 获得 老师管理的所有班级的 数据结构
    this.tno=sessionStorage.getItem('no')
    getAllClass(this.tno).then(res => {
      this.classOptions=res.data
    })
    // this.classOptions=[{
    //       value: 'cno1',
    //       label: '班级名name1'
    //     }, {
    //       value: 'cno2',
    //       label: '班级名name2'
    //     }, {
    //       value: 'cno3',
    //       label: '班级名name3'
    //     }, {
    //       value: 'cno4',
    //       label: '班级名name4'
    //     }, {
    //       value: 'cno5',
    //       label: '北班级名name5'
    // }]

    // 点击 选择习题 按钮后，从习题库页面返回过来时，（或者从习题库选择习题后，点击 组成作业 按钮过来时）
    // 判断 vuex 中的 newHomeworkInfo 是否有内容，有则赋值给 data 中的 form
    if(JSON.stringify(this.$store.state.newHomeworkInfo) !== "{}") {
      this.form=this.$store.state.newHomeworkInfo
    }

    // 判断 vuex 中的 chosenQueArr 是否有内容，有则发送请求，根据 qno、type 获得 data 中 questionArr 的数据结构
    if(this.$store.state.chosenQueArr.length !== 0) {
      newHomeworkQuestionArr(this.$store.state.chosenQueArr).then(res => {
        this.questionArr=res.data
        // this.questionArr=[
        //     {qno: '1', type: '1', content: '选择题目1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1'},
        //     {qno: '2', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2'},
        //     {qno: '3', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3'},
        //     {qno: '4', type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4'},
        // ]
      })      
    }    
  },
  beforeRouteLeave(to, from, next) {
    // 如果将要跳转过去的页面不是 /teacher/questions，则清空 vuex 中的 创建作业相关内容
    // 如果跳到习题页面，或者已经提交，此时不用提示，直接跳转
    if(to.path.indexOf('questions') !== -1 || this.hasSubmit) {
       next()
    } else {
      // 如果跳转到不是习题的页面，或者返回到作业页面但是没有提交
      this.$confirm('返回将不保存当前内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 将 vuex 中的 和创建新作业相关的内容 清空
          this.$store.commit('clearNewHomeworkInfo')
          this.$store.commit('clearChosenQueArr')
          this.$store.commit('changeComeFromHomework', false)
          next()
        }).catch(() => {});
    }
  },
  data() {
    return {
      tno:0,
      // 表单内容
      form: {
        detail: '',
        stopTime: '',
        chosenClass: '',
        questions: []
      },
      // 表单验证规则
      rules: {
        detail: [
          { required: true, message: '请输入作业详情', trigger: 'blur' }
        ],
        chosenClass: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ]
      },
      // select 选择器的 班级列表
      classOptions:  [],
      // 和显示已选题目相关的数据
      questionArr: [],
      done: true,
      hasSubmit: false
    }
  },
  methods: {
    // 点击 选择习题 按钮，跳转到习题库
    chooseQuestions() {
      // 先清空 vuex 中，和创建作业相关的内容
      this.$store.commit('clearNewHomeworkInfo')
      this.$store.commit('clearChosenQueArr')
      // 将内容保存到 vuex 中
      this.$store.commit('putNewHomeworkInfo', this.form)
      this.$store.commit('changeComeFromHomework', true)
      this.$router.replace("/teacher/questions")
    },
    submitHomework() {
      this.hasSubmit = true
      // 提交之前进行表单验证
      if(this.form.detail === '' || this.form.chosenClass === '') {
        this.$message.error('请填写完必填项');
      } else {
        // 如果验证通过
        // 获得questionArr，取出其中的qno、type，并加上queNo，然后赋值给form.questions
        let arr=[]
        this.questionArr.forEach((item,index)=>{
          arr.push({qno:item.qno,type:item.type,queNo:index})
        })
        this.form.questions=arr

        // 将 vuex 中的 和创建新作业相关的内容 清空
          this.$store.commit('clearNewHomeworkInfo')
          this.$store.commit('clearChosenQueArr')
          this.$store.commit('changeComeFromHomework', false)
          
        // 发送请求给接口，提交数据
        let obj=this.classOptions.find(item=>item.value===this.form.chosenClass)
        let cname=obj.label
        newHomeworkSubmit(this.form,cname,this.tno).then(res => {
          if(res.data.status!==200) {
            this.$message.error('作业创建失败，请稍后重新提交');
          } else {
            // 返回到发布作业页面
            this.$message.success('作业已成功创建');
            this.$router.replace('/teacher/homework')
          }
        })        
      }
    }
  },
  components: {
    SecondPage,
    Xuanze,
    Tiankong,
    Jianda,
    Jisuan
  }
}
</script>

<style scoped>
.form {
  margin-top: 30px;
}
.detail {
  width: 400px;
}
</style>