<template>
  <div class="card">
    <el-card class="box-card">
      <!-- 卡片顶部 -->
      <div slot="header" class="top">
        <div class="top-item" 
          v-for="(item,index) in topTitles" 
          :key="item" 
          :class="{'green':changeTopColor && index===topTitles.length-1 && topLastChild==='已评',
                    'red':changeTopColor && index===topTitles.length-1 && topLastChild==='待评'}">{{item}}
        </div>
      </div>

      <!-- 卡片中间内容 -->
      <div class="middle">
        <slot name="middle"></slot>
      </div>
      
      <!-- 卡片底部 -->
      <div class="bottom" v-if="hasBottom">
        <slot name="bottom"></slot>
      </div>      
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Card',
  props:{
    // 顶部标题
    topTitles:{
      type: Array,
      required:true,
      default() {
        return []
      }
    },
    // 是否具有底部
    hasBottom: {
      type:Boolean,
      default: false
    },
    // 是否修改顶部标题颜色
    changeTopColor: {
      type:Boolean,
      default: false
    },
    // 顶部标题最后一个元素的内容
    topLastChild: {
      type: String,
      default: '已评'
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 30rem;
  margin: 1.875rem 5rem;
}
.top {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}
.green {
  color: #67C23A;
}
.red {
  color: #F56C6C;
}
.middle {
  font-size: .9375rem;
  line-height: 1.5625rem;
  color: #606266;
  /* border:1px solid green; */
}
.bottom {
  /* border:1px solid green; */
  padding-top: 1.25rem;
}
</style>