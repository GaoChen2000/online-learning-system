<template>
  <div class="studentHome">
    <main-page :asideTitles="asideTitles" :routesArr="routesArr" :role="role" :isStudent="true"></main-page>
  </div> 
</template>

<script>
import MainPage from '@/components/content/MainPage.vue'

export default {
  name:'StudentHome',
  data(){
    return {
      // asideTitles:['消息','作业','讨论区','错题集','学习分析','班级资源'],
      asideTitles:['消息','作业','讨论区','错题集','个人中心'],
      // routesArr:['/student/news','/student/homework','/student/discussion','/student/mistake',
      // '/student/analysis','/student/resource'],
      routesArr:['/student/news','/student/homework','/student/discussion','/student/mistake','/self'],
      role: 1
    }
  },
  components:{
    MainPage,
  }
}
</script>

<style scoped>
.studentHome {
  width: 100%;
  height: 100%;
}
</style>