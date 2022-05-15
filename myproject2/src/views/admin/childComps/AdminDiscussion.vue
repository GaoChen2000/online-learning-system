<template>
  <div>
    <admin-dis-card 
      v-for="item in discussionArr" 
      :key="item.time + item.subject" 
      :cardContent="item"
    ></admin-dis-card>
  </div>
</template>

<script>
import AdminDisCard from '@/views/admin/childComps/cards/AdminDisCard.vue'
import {getAllDis} from '@/network/admin.js'

export default {
  name:'AdminDiscussion',
  created() {
    // 发送请求
    getAllDis().then(res => {
      this.discussionArr=res.data
    })
    // this.discussionArr = [
    //     {dno: '1', subject:'科目名',time:'2022-04-10',content:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {dno: '2', subject:'科目名',time:'2022-04-11',content:'消息详情2'},
    //     {dno: '3', subject:'科目名',time:'2022-04-12',content:'消息详情3'}
    //   ]
  },
  data() {
    return {
      discussionArr: []
    }
  },
  components: {
    AdminDisCard
  }
}
</script>

<style scoped>

</style>