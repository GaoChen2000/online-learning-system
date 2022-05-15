<template>
  <div class="stu-news">
    <!-- item 是一个对象 -->
    <stu-news-card 
      v-for="(item,index) in newsArr" 
      :key="index"
      :cardContent="item">
    </stu-news-card>
  </div>
</template>

<script>
import StuNewsCard from '@/views/student/childComps/cards/StuNewsCard.vue'
import {getStuNews} from '@/network/student.js'

export default {
  name:'StuNews',
  created() {
    let sno=sessionStorage.getItem('no')
    getStuNews(sno).then(res => {
      this.newsArr=res.data
      // 判断是否有新的消息
      let newNno = this.newsArr[0].nno
      if(newNno !== localStorage.getItem('nno')) {
        this.$bus.$emit('newsShowDot')
      }
      localStorage.setItem('nno',newNno)
    })
    // this.newsArr = [
    //     {typeName:'系统消息',time:'2022-04-10',content:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {typeName:'作业提醒',time:'2022-04-11',content:'消息详情2'},
    //     {typeName:'科目名（老师名）',time:'2022-04-12',content:'消息详情3'}
    //   ]
  },
  data() {
    return {
      newsArr: []
    }
  },
  components: {
    StuNewsCard
  }
}
</script>

<style scoped>

</style>