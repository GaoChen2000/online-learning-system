<template>
  <div>
    <second-page>
      <div slot="mainBody" class="main-body">
        <div class="homeworkInfo">
          <div v-if="$route.query.detail">
            <div>作业详情：</div>
            <div>{{$route.query.detail}}</div>
          </div>
        </div>
        <!-- 根据题目类型 type，显示不同的题目组件 -->
        <div v-for="(item, index) in questionArr" :key="item.qno+'-'+item.type">
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
import {getTeaHomeworkDetail} from '@/network/teacher.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'TeaHomeworkDetail',
  created() {
    this.hno=Number(this.$route.query.hno)
    // 发送请求，根据 hno 获得 questionArr 的数据结构（区别在于没有stuAns）
    getTeaHomeworkDetail(this.hno).then(res => {
      this.questionArr=res.data
    })
    // this.questionArr=[
    //         {qno: '1', type: '1', content: '选择题目1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1'},
    //         {qno: '2', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2'},
    //         {qno: '3', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3', score: 10},
    //         {qno: '4', type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4', score: 10},
    // ]
  },
  data() {
    return {
      questionArr: [],
      done: true,
      hno:0
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
.homeworkInfo {
  border-bottom: 1px solid #C0C4CC;
  padding: 1.875rem 0;
}
</style>