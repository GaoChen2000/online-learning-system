<template>
  <div>
    <tea-questions-card 
      v-for="item in questionBags" 
      :key="item.bno" 
      :cardContent="item">
    </tea-questions-card>
    <el-button type="success" round v-if="$store.state.comeFromHomework" @click="complete" class="button">
      选好了
    </el-button>
    <div v-else class="button">
      <el-button type="success" round @click="newQuestion">创建习题</el-button>
      <el-button type="success" round @click="gotoNewHomework">组成作业</el-button>
    </div>
    
    
  </div>
</template>

<script>
import TeaQuestionsCard from '@/views/teacher/childComps/cards/TeaQuestionsCard.vue'
import {getTeaQue} from '@/network/teacher.js'

export default {
  name: 'TeaQuestions',
  created() {
    // 根据 tno 获得老师的所有习题卷的 数据结构
    let tno=sessionStorage.getItem('no')
    getTeaQue(tno).then(res => {
      this.questionBags=res.data
    })
    // this.questionBags=[
    //   {bno: '1', name: '习题卷1'},
    //   {bno: '2', name: '习题卷2'},
    //   {bno: '3', name: '习题卷3'},
    // ]
  },
  data() {
    return {
      questionBags: []
    }    
  },
  methods: {
    complete() {
      this.$router.replace("/teacher/homework/new")
    },
    gotoNewHomework() {
      if(this.$store.state.chosenQueArr.length === 0) {
        this.$message.error('请先选择习题，或者您也可以在“发布作业”页面，创建作业');
      } else {
        this.$router.replace('/teacher/homework/new')
      }     
    },
    newQuestion() {
      this.$router.push('/teacher/questions/new')
    }
  },
  components: {
    TeaQuestionsCard
  }
}
</script>

<style scoped>
.button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>