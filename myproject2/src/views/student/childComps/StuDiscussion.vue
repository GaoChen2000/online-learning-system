<template>
  <div>
    <stu-dis-card 
      v-for="item in discussionArr" 
      :key="item.dno" 
      :cardContent="item"
    ></stu-dis-card>
  </div>
</template>

<script>
import StuDisCard from '@/views/student/childComps/cards/StuDisCard.vue'
import {getStuDiscussion} from '@/network/student.js'

export default {
  name:'StuDiscussion',
  created() {
    let sno=sessionStorage.getItem('no')
    getStuDiscussion(sno).then(res => {
      this.discussionArr=res.data
      // 判断是否有新的讨论题
      let newDno = this.discussionArr[0].dno
      if(newDno !== localStorage.getItem('dno')) {
        this.$bus.$emit('disShowDot')
      }
      localStorage.setItem('dno',newDno)
    })
    // 发送请求，获得 discussionArr 数据结构
    // this.discussionArr=[
    //   {dno: '1', subjectTeacher:'科目名（老师名）',time:'2022-04-10',content:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //   {dno: '2', subjectTeacher:'科目名（老师名）',time:'2022-04-11',content:'消息详情2'},
    //   {dno: '3', subjectTeacher:'科目名（老师名）',time:'2022-04-12',content:'消息详情3'}
    // ]
  },
  data() {
    return {
      discussionArr: []
    }
  },
  components: {
    StuDisCard
  }
}
</script>

<style scoped>

</style>