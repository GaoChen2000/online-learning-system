<template>
  <div>
    <tea-news-card 
      v-for="(item,index) in newsArr" 
      :key="index" 
      :cardContent="item">
    </tea-news-card>
    <el-button type="success" round class="button" @click="makeNews">创建公告</el-button>
  </div>
</template>

<script>
import TeaNewsCard from '@/views/teacher/childComps/cards/TeaNewsCard.vue'
import {getTeaNews} from '@/network/teacher.js'

export default {
  name:'TeaNews',
  created() {
    // 发送请求，根据 tno 获得所有公告的 数据结构
    let tno=sessionStorage.getItem('no')
    getTeaNews(tno).then(res => {
      this.newsArr=res.data
    })
    // this.newsArr = [
    //     {subject:'科目名',time:'2022-04-10',content:'消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或'},
    //     {subject:'科目名',time:'2022-04-11',content:'消息详情2'},
    //     {subject:'科目名',time:'2022-04-12',content:'消息详情3'}
    //   ]
  },
  data() {
    return {
      newsArr: []
    }
  },
  methods: {
    makeNews() {
      this.$router.push('/teacher/news/new')
    }
  },
  components: {
    TeaNewsCard
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