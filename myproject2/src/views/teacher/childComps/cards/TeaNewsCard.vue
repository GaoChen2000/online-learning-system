<template>
  <div>
    <card 
      :topTitles="[cardContent.subject,cardContent.time]">
      <div slot="middle">
        {{cardContent.content}}
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name:'TeaNewsCard',
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