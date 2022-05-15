<template>
  <div class="answer">
    <div v-if="showStuAns">你的答案：{{content.stuAns}}</div>
    <div>参考答案：{{content.answer}}</div>
    <div>答案解析：{{content.analysis}}</div>
  </div>
</template>

<script>
export default {
  name: "Answer",
  props: {
    content: {
      type: Object,
      required: true
    },
    showStuAns: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.answer {
  padding-bottom: 1.875rem;
  line-height: 1.5rem;
}
</style>