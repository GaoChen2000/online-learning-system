<template>
  <div class="header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>    
  </div>
</template>

<script>
export default {
  name:'MyHeader'
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #67C23A;
  /* background-color: #67C23A; */
  /* opacity: 0.3; */
}
</style>