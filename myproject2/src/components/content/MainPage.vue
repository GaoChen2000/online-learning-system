<template>
  <div class="mainPage">
    <my-header>
      <div slot="right">
        <el-popover
          placement="bottom"
          trigger="hover">
          
          <div class="userCenter">
            <el-button type="text" class="userCenter-button" @click="self">个人中心</el-button>
          </div>
          
          <span slot="reference" class="hoverSpan">
            <el-button type="text">个人中心</el-button>
          </span>

        </el-popover>
        
        <span class="user">{{username}}</span>
        <span class="num">{{no}}</span>
      </div>
    </my-header>
    <!-- 版心 -->
    <div class="mainBody">
      <my-aside :titles="asideTitles" :routesArr="routesArr" :isStudent="isStudent" :showDotObj="showDotObj"></my-aside>
      <main-body></main-body>
    </div>
    
  </div>
</template>

<script>
import MyHeader from '@/components/common/MyHeader.vue'
import MyAside from '@/components/common/MyAside.vue'
import MainBody from '@/components/common/MainBody.vue'

export default {
  name:'MainPage',
  created() {
    this.username = sessionStorage.getItem('name')
    this.no = sessionStorage.getItem('no')
    this.$bus.$on('newsShowDot',()=>{
      this.showDotObj.news = true
    })
    this.$bus.$on('homeworkShowDot',()=>{
      this.showDotObj.homework = true
    })    
    this.$bus.$on('disShowDot',()=>{
      this.showDotObj.discussion = true
    })
  },
  data(){
    return {
      leaveUrl:'',
      username: '',
      no: -1,
      img: '',
      showDotObj: {}
    }  
  },
  props:{
    asideTitles:{
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    routesArr:{
      type:Array,
      required:true,
      default(){
        return []
      }
    },
    role: {
      type: Number,
      required: true
    },
    isStudent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    self() {
      this.$router.push({
        path: '/self',
        query: {
          role: this.role,
          no: this.no
        }
      })
    }
  },
  components:{
    MyHeader,
    MyAside,
    MainBody
  }
}
</script>

<style scoped>
/* 整个页面 */
  .mainPage {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

/* 头部 header 部分 */
/* 头像部分 */
  .avatar {
    vertical-align: middle;
    font-size: 1rem;
  }
  .hoverSpan {
    display: inline-block;
    font-size: 1rem;
  }
  .hoverSpan:hover {
    cursor: pointer;
  }
  .userCenter {
    text-align: center;
  }
  .userCenter-button {
    font-size: 1rem;
    padding: 0;
  }
/* 用户名、学号部分 */
  .user,.num{
    padding: 0 .9375rem;
  }
  .user {
    border-right: 1px solid #C0C4CC;
  }

/* 下方主体部分 */
  .mainBody {
    width: 68.75rem;
    margin: 0 auto;
    display: flex;
  }
</style>