<template>
  <div>
    <card2>
      <div slot="center">{{cardContent.cname}}</div>
      <div slot="right" class="right">
        <el-button type="success" round @click="seeMore(cardContent.cno)">查看更多</el-button>
      </div>
    </card2>
  </div>
</template>

<script>
import Card2 from '@/components/common/Card2.vue'

export default {
  name:'StuMistakeCard',
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
    seeMore(cno) {
      this.$router.push({
        path: "/student/mistake/detail",
        query: {
          cno: cno
        }
      })
    }
  },
  components: {
    Card2
  }
}
</script>

<style scoped>
.right {
  position: relative;
  bottom: .5rem;
}
</style>