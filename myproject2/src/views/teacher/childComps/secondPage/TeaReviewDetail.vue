<template>
  <second-page>
    <div slot="mainBody">
      <card2 v-for="item in homeworkArr" :key="item.sno">
        <div slot="left">{{item.name}}({{item.sno}})</div>
        <div slot="center" :class="{'green': item.hasReview, 'red': !item.hasReview}" class="center">
          {{item.hasReview ? '已评' : '待评'}}
        </div>
        <div slot="right" class="right">
          <el-button type="success" round @click="seeMore(item.sno)" v-if=" ! item.hasReview">评分</el-button>
          <el-button type="primary" round @click="seeMore2(item.sno)" v-else>查看详情</el-button>
        </div>
      </card2>
    </div>
  </second-page>     
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import Card2 from '@/components/common/Card2.vue'

export default {
  name: 'TeaReviewDetail',
  created() {
    // 获得路由中的 hno、cno
    this.hno = Number(this.$route.query.hno)
    this.cno = this.$route.query.cno

    // 根据 hno，获得 vuex 中的 reviewArr 中的 homeworkArr
    this.homeworkArr = this.$store.state.reviewArr.find(item => item.hno === this.hno).homeworkArr
  },
  data() {
    return {
      hno: '',
      cno: -1,
      homeworkArr: []
    }
  },
  methods: {
    seeMore(sno) {
      this.$router.push({
        path: '/teacher/review/detail',
        query: {
          sno,
          hno: this.hno,
          cno: this.cno
        }
      })
    },
    seeMore2(sno) {
      this.$router.push({
        path: '/teacher/review/detail2',
        query: {
          sno,
          hno: this.hno,
          cno: this.cno
        }
      })
    }
  },
  components: {
    SecondPage,
    Card2
  }
}
</script>

<style scoped>
.green {
  color: #67C23A;
}
.red {
  color: #F56C6C;
}
.center {
  width: 250px;
  text-align: right;
}
.right {
  position: relative;
  bottom: .625rem;
}
</style>