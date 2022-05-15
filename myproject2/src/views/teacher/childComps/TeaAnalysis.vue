<template>
  <div>
    <tea-analysis-card 
      v-for="item in homeworkArr" 
      :key="item.hno" 
      :cardContent="item">
    </tea-analysis-card>
  </div>
</template>

<script>
import TeaAnalysisCard from '@/views/teacher/childComps/cards/TeaAnalysisCard.vue'
import {getTeaAna} from '@/network/teacher.js'

export default {
  name:'TeaAnalysis',
  created() {
    // 发送请求
    let tno=sessionStorage.getItem('no')
    getTeaAna(tno).then(res => {
      this.homeworkArr=res.data
    })
    // this.homeworkArr = [
    //     {hno:'1',subject:'科目名1',time:'2022-04-10',detail:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {hno:'2',subject:'科目名2',time:'2022-04-10',detail:'消息详情2'},
    //     {hno:'3',subject:'科目名3',time:'2022-04-10',detail:'消息详情3'}
    //   ]
  },
  data() {
    return {
      homeworkArr: []
    }
  },
  components: {
    TeaAnalysisCard
  }
}
</script>

<style scoped>

</style>