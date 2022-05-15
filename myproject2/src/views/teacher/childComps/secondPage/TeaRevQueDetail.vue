<template>
  <second-page>
    <div slot="mainBody">
      <!-- 根据题目类型 type，显示不同的题目组件 -->
      <div v-for="(item, index) in questionArr" :key="item.qno+'-'+item.type" class="question">
        <div v-if="item.type==='3'">
          <jianda :questionData="item" :done="done" :index="index+1"></jianda>
          <div class="score-box">
            分数：
            <el-input v-model="scoreArr[index]" placeholder="请输入分数" class="score"></el-input>
          </div>
        </div>
        <div v-else-if="item.type==='4'">
          <jisuan :questionData="item" :done="done" :index="index+1"></jisuan>
          <div class="score-box">
            分数：
            <el-input v-model="scoreArr[index]" placeholder="请输入分数" class="score"></el-input>
          </div>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="submit"><el-button type="success" round @click="submit">提交</el-button></div>      
    </div>
  </second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import Card2 from '@/components/common/Card2.vue'
import {getTeaRevQuestionArr,submitReview} from '@/network/teacher.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'TeaRevQueDetail',
  created() {
    // 获得路由中的 sno、hno、cno
    this.sno = this.$route.query.sno
    this.hno = this.$route.query.hno
    this.cno = this.$route.query.cno

    // 发送请求，根据 sno、hno 获得题目信息 questionArr 的数据结构
    // 只获得 简答题、计算题（type为3、4）
    getTeaRevQuestionArr(this.sno, this.hno).then(res => {
      this.questionArr=res.data
    })
    // this.questionArr = [
    //         {qno: '1', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '2', type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    //         {qno: '3', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '4', type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    // ]
  },
  data() {
    return {
      sno: '',
      hno: '',
      cno: -1,
      questionArr: [],
      done: true,
      scoreArr: []
    }
  },
  methods: {
    submit() {
      let arr=[]
      this.questionArr.forEach((item,index)=>{
        let score=this.scoreArr[index]
        if(score > item.score) {
          this.$message.error('请检查已填写的分数，是否都不大于题目分数');
          return
        }
        arr.push({
          qno:item.qno,
          type:item.type,
          score: score,
          mistake: score < item.score ? 1: 0
        })
      })
      // 发送请求
      submitReview(this.sno, this.hno, this.cno, arr).then(res=>{
        if(res.data.status!==200) {
          this.$message.error('提交失败，请重新提交'); 
        } else {
          this.$message.success('提交成功'); 
          setTimeout(()=>{
            this.$router.go(-1)
          })
        }
      })
    }
  },
  components: {
    SecondPage,
    Card2,
    Xuanze,
    Tiankong,
    Jianda,
    Jisuan
  }
}
</script>

<style scoped>
.question {
  position: relative;
}
.score-box {
  position: absolute;
  top: 0;
  right: 0;
}
.score {
  display: inline-block;
  width: 100px;
}
.submit {
  text-align: right;
  padding-top: 10px;
}
</style>