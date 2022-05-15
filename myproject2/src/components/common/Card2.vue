<template>
  <div>
    <el-card class="box-card clearfix">
      <!-- 选择按钮 -->
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>      
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Card2',
  props: {
    
  }
}
</script>

<style scoped>
.box-card {
  width: 30rem;
  margin: 1.875rem 5rem;
}
.left {
  float: left;
}
.center {
  float: left;
}
.right {
  float: right;
  text-align: right;
}
</style>