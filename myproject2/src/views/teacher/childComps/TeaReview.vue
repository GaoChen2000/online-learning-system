<template>
  <div>
    <tea-review-card 
      v-for="item in reviewArr" 
      :key="item.hno" 
      :cardContent="item">
    </tea-review-card>
  </div>
</template>

<script>
import TeaReviewCard from '@/views/teacher/childComps/cards/TeaReviewCard.vue'
import {getTeaReview} from '@/network/teacher.js'

export default {
  name:'TeaReview',
  created() {
    // 发送请求，根据 tno 获得所有作业的 数据结构
    let tno=sessionStorage.getItem('no')
    getTeaReview(tno).then(res => {
      let arr=res.data
      // 将请求到的数据，放入 vuex 中
      this.$store.commit('putReviewArr', arr)

      // 获得 reviewArr
      arr.forEach(item => {
        let hasReview = item.homeworkArr.some(x => ! x.hasReview) ? '待评' : '已评'
        this.reviewArr.push({hno: item.hno, subject: item.subject, cno: item.cno, hasReview: hasReview, detail: item.detail})
      })
    })
    // let arr = [
    //     {hno: '1', subject:'科目名', cno: 1,
    //       detail:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或',
    //       homeworkArr: [
    //         {sno: '1', name: '张三', hasReview: true},
    //         {sno: '2', name: '张三', hasReview: true},
    //         {sno: '3', name: '张三', hasReview: false},
    //       ]
    //     },
    //     {hno: '2', subject:'科目名', cno: 1,
    //       detail:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或',
    //       homeworkArr: [
    //         {sno: '1', name: '张三', hasReview: true},
    //         {sno: '2', name: '张三', hasReview: true},
    //         {sno: '3', name: '张三', hasReview: true},
    //       ]
    //     },
    //     {hno: '3', subject:'科目名', cno: 1,
    //       detail:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或',
    //       homeworkArr: [
    //         {sno: '1', name: '张三', hasReview: true},
    //         {sno: '2', name: '张三', hasReview: true},
    //         {sno: '3', name: '张三', hasReview: false},
    //       ]
    //     },
    // ]
  },
  data() {
    return {
      reviewArr: []
    }
  },
  components: {
    TeaReviewCard
  }
}
</script>

<style scoped>

</style>