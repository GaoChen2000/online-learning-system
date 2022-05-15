<template>
  <div>
    <tea-homework-card 
      v-for="item in homeworkArr" 
      :key="item.hno" 
      :cardContent="item">
    </tea-homework-card>
    <el-button type="primary" round class="new" @click="newHomework">创建作业</el-button>
  </div>
</template>

<script>
import TeaHomeworkCard from '@/views/teacher/childComps/cards/TeaHomeworkCard.vue'
import {getTeaHomework} from '@/network/teacher.js'

export default {
  name:'TeaHomework',
  created() {
    // 发送请求，获得 homeworkArr 数据结构
    let tno=sessionStorage.getItem('no')
    getTeaHomework(tno).then(res => {
      this.homeworkArr=res.data
    })
    // this.homeworkArr=[
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
  methods: {
    newHomework() {
      this.$router.push("/teacher/homework/new")
    }
  },
  components: {
    TeaHomeworkCard
  }
}
</script>

<style scoped>
.new {
  position: fixed;
  bottom: 50px;
  right: 60px;
}
</style>