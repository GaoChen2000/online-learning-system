<template>
  <div class="stu-news">
    <card :topTitles="[cardContent.typeName,cardContent.time]">
      <div slot="middle" class="content">
        {{cardContent.content}}
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name:'StuNews',
  data() {
    return {     
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
  components: {
    Card
  }  
}
</script>

<style scoped>

</style>