<template>
  <div class="myAside">
    <el-menu
      default-active="0"
    >
      <el-menu-item 
        class="item"
        v-for="(item,index) in titles" 
        :key="item" 
        :index="index.toString()"
        @click="clickItem(index)">
        <template slot="title">
          {{item}}
          <span :class="{'dot': isStudent && index===0 && showDotObj.news}"></span>
          <span :class="{'dot': isStudent && index===1 && showDotObj.homework}"></span>
          <span :class="{'dot': isStudent && index===2 && showDotObj.discussion}"></span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:'MyAside',
  created() {
    // 刷新时，会重新创建组件，此时，让url变为第一个导航选项的url
    let url=this.routesArr[0]
    if(this.$route.path.indexOf(url)===-1) {
        this.$router.replace(url)
      }
  },
  methods:{
    clickItem(index){
      // 路由跳转之前，先判断将要跳到的路由是否和当前路由相同，不相同才跳转
      let url=this.routesArr[index]
      if(this.$route.path.indexOf(url)===-1) {
        if(index===this.routesArr.length-1) {
          this.$router.push(url)
        } else {
          this.$router.replace(url)
        }       
      }      
    },
  },
  props:{
    titles:{
      type:Array,
      required:true,
      default(){
        return []
      }
    },
    routesArr:{
      type:Array,
      required:true,
      default() {
        return []
      }
    },
    isStudent: {
      type: Boolean,
      default: false
    },
    showDotObj: {
      type: Object,
      default(){
        return {
          news: false,
          homework: false,
          discussion: false
        }
      }
    }
  },
  
}
</script>

<style scoped>
.myAside {
  width: 12.5rem; 
}
.item {
  text-align: left;
  font-size: 1rem;
}
.dot {
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 115px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #F56C6C;
}
</style>