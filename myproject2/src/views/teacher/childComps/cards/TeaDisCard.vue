<template>
  <div>
    <card 
      :topTitles="[cardContent.subject,cardContent.time]"
      :hasBottom="true">
      <div slot="middle">
        {{cardContent.content}}
      </div>
      <div slot="bottom" class="bottom">
        <el-button type="success" round @click="enter(cardContent.dno)">进入</el-button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name:'TeaDisCard',
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
    enter(dno) {
      this.$router.push({
        path: "/teacher/discussion/detail",
        query: {
          dno
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