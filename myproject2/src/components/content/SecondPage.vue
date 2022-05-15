<template>
  <div>
    <my-header>
      <div slot="left" class="left">
        <el-button type="success" plain round icon="el-icon-back" @click="goBack">返回</el-button>
      </div>
    </my-header>
    <div class="main-body">
      <slot name="mainBody"></slot>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/common/MyHeader.vue'

export default {
  name:'SecondPage',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  components: {
    MyHeader,
  }
}
</script>

<style scoped>
.main-body {
  width: 56.25rem;
  /* 这里要删掉 */
  /* border: 1px solid black; */
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.5rem;
  padding-bottom: 1.875rem;
}
.left {
  padding-left: 1.875rem;
}
</style>