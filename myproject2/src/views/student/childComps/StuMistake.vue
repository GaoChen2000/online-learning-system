<template>
  <div>
    <stu-mistake-card 
      v-for="item in subjectArr" 
      :key="item.cno" 
      :cardContent="item"
    ></stu-mistake-card>
  </div>
</template>

<script>
import StuMistakeCard from '@/views/student/childComps/cards/StuMistakeCard.vue'
import {getStuMistake} from '@/network/student.js'

export default {
  name:'StuResource',
  created() {
    let sno=sessionStorage.getItem('no')
    getStuMistake(sno).then(res => {
      this.subjectArr=res.data
    })
    // 发送请求 获得的数据结构
    // this.subjectArr=[
    //   {cno: '1', cname: '科目1'},
    //   {cno: '2', cname: '科目2'},
    //   {cno: '3', cname: '科目3'},
    // ]
  },
  data() {
    return {
      subjectArr: []
    }
  },
  components: {
    StuMistakeCard
  }
}
</script>

<style scoped>

</style>