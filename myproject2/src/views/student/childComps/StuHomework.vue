<template>
  <div>
    <stu-homework-card 
      v-for="item in homeworkArr" 
      :key="item.hno" 
      :cardContent="item">
    </stu-homework-card>
  </div>
</template>

<script>
import StuHomeworkCard from '@/views/student/childComps/cards/StuHomeworkCard.vue'
import {getStuHomework} from '@/network/student.js'

export default {
  name:'StuHomework',
  created() {
    let sno=sessionStorage.getItem('no')
    getStuHomework(sno).then(res => {
      this.homeworkArr=res.data
      // 判断是否有新的作业
      let newHno = this.homeworkArr[0].hno
      if(newHno !== localStorage.getItem('hno')) {
        this.$bus.$emit('homeworkShowDot')
      }
      localStorage.setItem('hno',newHno)
    })
    // 发送请求获得的 数据结构
    // this.homeworkArr=[
    //     {hno: '1', cno: 1, done: false, subjectTeacher:'科目名1',time:'2022-04-10',detail:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {hno: '2', cno: 1, done: false, subjectTeacher:'科目名2',time:'2022-04-10',detail:'消息详情2哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {hno: '3', cno: 1, done: true, subjectTeacher:'科目名3',time:'2022-04-10',detail:'消息详情3哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    // ]
  },
  data() {
    return {
      pageData: [],
      homeworkArr: [],
    }
  },
  components: {
    StuHomeworkCard
  }
}
</script>

<style scoped>

</style>