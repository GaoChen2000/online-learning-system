<template>
  <div>
    <tea-dis-card 
      v-for="item in discussionArr" 
      :key="item.dno" 
      :cardContent="item"
    ></tea-dis-card>
    <el-button type="primary" round @click="newDis" class="newDis">创建讨论题</el-button>
  </div>
</template>

<script>
import TeaDisCard from '@/views/teacher/childComps/cards/TeaDisCard.vue'
import {getTeaDis} from '@/network/teacher.js'

export default {
  name:'TeaDiscussion',
  created() {
    // 发送请求，获得 discussionArr 数据结构
    let tno=sessionStorage.getItem('no')
    getTeaDis(tno).then(res => {
      this.discussionArr=res.data
    })
    // this.discussionArr=[
    //   {dno: '1', subject:'科目名',time:'2022-04-10',content:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //   {dno: '2', subject:'科目名',time:'2022-04-11',content:'消息详情2'},
    //   {dno: '3', subject:'科目名',time:'2022-04-12',content:'消息详情3'}
    // ]
  },
  data() {
    return {
      discussionArr: []
    }
  },
  methods: {
    newDis(){
      this.$router.push("/teacher/discussion/new")
    }
  },
  components: {
    TeaDisCard
  }
}
</script>

<style scoped>
.newDis {
  position: fixed;
  bottom: 50px;
  right: 60px;
}
</style>