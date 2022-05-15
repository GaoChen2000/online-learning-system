<template>
  <div>
    <card 
      :topTitles="[cardContent.subject,cardContent.time]"
      :hasBottom="true">
      <div slot="middle">
        <div><span class="contentTitle">作业详情：</span>{{cardContent.detail}}</div> 
      </div>
      <div slot="bottom" class="bottom">
        <el-button type="success" round @click="seeMore(cardContent.hno)">查看更多></el-button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name:'TeaAnalysisCard',
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
    seeMore(hno) {
      this.$router.push({
        path: "/teacher/analysis/detail",
        query: {
          hno
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