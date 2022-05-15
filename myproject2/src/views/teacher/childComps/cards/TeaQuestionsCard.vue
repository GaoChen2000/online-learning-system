<template>
  <div>
    <card2>
      <div slot="left" v-if="showSelect" class="left">
        <i class="el-icon-check"></i>
      </div>
      <div slot="center">{{cardContent.name}}</div>
      <div slot="right" class="right">
        <el-button type="success" round @click="seeMore(cardContent.bno)">查看更多</el-button>
      </div>
    </card2>
  </div>
</template>

<script>
import Card2 from '@/components/common/Card2.vue'

export default {
  name:'TeaQuestionsCard',
  props: {
    cardContent: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    seeMore(bno) {
      this.$router.push({
        path: "/teacher/questions/detail",
        query: {
          bno
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