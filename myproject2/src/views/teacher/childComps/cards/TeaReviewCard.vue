<template>
  <div>
    <card 
      :topTitles="[cardContent.subject,cardContent.hasReview]"
      :hasBottom="true"
      :changeTopColor="true"
      :topLastChild="cardContent.hasReview">
      <div slot="middle">
        <div><span class="contentTitle">作业详情：</span>{{cardContent.detail}}</div> 
      </div>
      <div slot="bottom" class="bottom">
        <el-button type="success" round @click="seeMore(cardContent.hno,cardContent.cno)">查看全部作业></el-button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name:'TeaReviewCard',
  props: {
    cardContent: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  methods: {
    seeMore(hno, cno) {
      this.$router.push({
        path: '/teacher/review/all',
        query: {
          hno,
          cno
        }
      })
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.bottom {
  text-align: right;
}
</style>