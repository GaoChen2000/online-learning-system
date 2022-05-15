<template>
  <div>
    <second-page>
      <div slot="mainBody">
        <!-- 根据题目类型 type，显示不同的题目组件 -->
        <div v-for="(item, index) in questionArr" :key="item.qno+'-'+item.type">
          <div v-if="item.type==='1'">
            <xuanze :questionData="item" :done="done" :index="index+1" :hasSave="hasSave"></xuanze>
          </div>
          <div v-else-if="item.type==='2'">
            <tiankong :questionData="item" :done="done" :index="index+1" :hasSave="hasSave">></tiankong>
          </div>
          <div v-else-if="item.type==='3'">
            <jianda :questionData="item" :done="done" :index="index+1" :hasSave="hasSave">></jianda>
          </div>
          <div v-else-if="item.type==='4'">
            <jisuan :questionData="item" :done="done" :index="index+1" :hasSave="hasSave">></jisuan>
          </div>
        </div>
        <!-- 保存和提交按钮 -->
        <div class="submit" v-if="!done">
          <!-- <el-button type="primary" round @click="save">保存</el-button> -->
          <el-button type="success" round @click="submit">提交</el-button>
        </div>        
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getStuHomeworkQue,submitStuAns} from '@/network/student.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'StuHomeworkQuestions',
  created() {
    // 获取路由参数中的 hno、done
    this.hno = this.$route.query.hno
    this.done = this.$route.query.done==="true" ? true : false
    this.cname = this.$route.query.cname
    this.cno = this.$route.query.cno

    // 获得作业提交的相关数据
    this.sname=sessionStorage.getItem('name')

    // 发送请求，根据 hno 获得对应的作业题目数据
    this.sno=sessionStorage.getItem('no')
    getStuHomeworkQue(this.hno, this.sno).then(res => {
      this.questionArr=res.data
    })
    // 判断vuex中的stuAnsArr是否为空数组，并且localStorage有值
      // 如果是，则表示刷新了页面，将localStorage解析，赋值给vuex
      // 判断vuex中的stuAnsArr是否为空数组，并且localStorage没有值
      // 如果是，则表示还没有保存答案，不作任何处理
      // 判断vuex中的stuAnsArr是否不是空数组
      // 如果不是空数组，表示没有刷新页面，并且保存了答案，不作任何处理，将vuex中的stuAnsArr中的stuAns赋值给questionArr
    //   if(this.$store.state.stuAnsArr.length===0 && localStorage.getItem('stuAnsArr')) {
    //     console.log('执行了解析local')
    //     // 解析local为brr
    //     let arr=localStorage.getItem('stuAnsArr').split('-=-')
    //     let brr=[]
    //     arr.forEach(item=>{
    //       brr.push(JSON.parse(item))
    //     })
    //     // 给vuex重新赋值brr
    //     this.$store.commit('getLocalStorageToState',brr)
    //     console.log(this.$store.state.stuAnsArr)
    //     // 将brr中的stuAns赋值给this.questionArr
    //     brr.forEach(item1=> {
    //       let obj=this.questionArr.find(item2=>item1.qno===item2.qno && item1.type===item2.type)
    //       if(obj) {
    //         obj.stuAns=item1.stuAns
    //       }    
    //     })
    //   } else if(this.$store.state.stuAnsArr.length!==0){
    //     console.log('直接从vuex拿值')
    //     console.log(this.$store.state.stuAnsArr)
    //     // 将vuex中的stuAns赋值给this.questionArr
    //     this.$store.state.stuAnsArr.forEach(item1=> {
    //       let obj=this.questionArr.find(item2=>item1.qno===item2.qno && item1.type===item2.type)
    //       if(obj) {
    //         obj.stuAns=item1.stuAns
    //       }    
    //     })
    //   }
    // this.questionArr = [
    //         {qno: 1, type: '1', content: '选择题目1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1', stuAns: 'A'},
    //         {qno: 2, type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2', stuAns: '哈哈哈，嘿嘿嘿，嘎嘎嘎'},
    //         {qno: 3, type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3', score: 10, stuAns: '诶诶诶'},
    //         {qno: 4, type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4', score: 10, stuAns: ['某个url1','某个url2','某个url3']},
    // ]
  },
  data() {
    return {
      questionArr: [],
      hno: '',
      done: false,
      hasSave: false,
      sno: -1,
      sname: '',
      cno: -1,
      cname: ''
    }
  },
  methods: {
    // 保存
    // 先清空vuex、localStorage，再保存
    // save() {
    //   this.$store.commit('clearStuAns')
    //   localStorage.clear()
    //   this.hasSave=!this.hasSave
    //   this.$message.success('保存成功');
    // },
    // 提交
    submit() {
      this.$store.commit('clearStuAns')
      this.hasSave=!this.hasSave
      let obj={
        hno:this.hno,
        sno:this.sno,
        ansArr:this.$store.state.stuAnsArr, 
        sname:this.sname, 
        cno:this.cno, 
        cname:this.cname
      }
      this.$message.success('正在提交，请勿进行其他操作');
      // 发送请求，提交数据
      setTimeout(()=>{
        submitStuAns(obj).then(res => {
          if(res.data.status!==200) {
            console.log(res.data)
            this.$message.error('提交失败，请重新提交'); 
          } else {
            this.$store.commit('clearStuAns')
            this.$message.success('提交成功');
            setTimeout(()=>{
              this.$router.replace('/student/homework')
            },1000)            
          }
        })
      },2000)
      
      // // 发送请求，提交数据
      // submitStuAns(obj).then(res => {
      //   if(res.data.status===1) {
      //     this.$message.error('提交失败')
      //     console.log(res.data)
      //     this.$store.commit('clearStuAns')
      //     localStorage.clear()
      //     this.hasSave=!this.hasSave
      //     console.log(this.$store.state.stuAnsArr)
      //   } else {
      //     this.$message.success('提交成功');
      //     this.$store.commit('clearStuAns')
      //     localStorage.clear()
      //   }
      // })      
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
.submit {
  position: fixed;
  bottom: 3.125rem;
  right: 1.875rem;
}
</style>