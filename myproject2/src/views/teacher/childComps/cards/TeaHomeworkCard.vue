<template>
  <div>
    <card 
      :topTitles="[cardContent.subject,cardContent.time]"
      :hasBottom="true">
      <div slot="middle">
        <div>截止时间：{{endtime}}</div>
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
import {formatTime} from '@/common/utils.js'

export default {
  name:'TeaHomeworkCard',
  created() {
    this.endtime = new Date(this.cardContent.endtime)
    this.endtime = formatTime(this.endtime)
  },
  data() {
    return {
      endtime: ''
    }
  },
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
        path: "/teacher/homework/detail",
        query: {
          hno: hno,
          detail: this.cardContent.detail
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