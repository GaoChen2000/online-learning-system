<template>
  <div class="teacher-home">
    <main-page :asideTitles="asideTitles" :routesArr="routesArr" :role="role"></main-page>
  </div>  
</template>

<script>
import MainPage from '@/components/content/MainPage.vue'

export default {
  name:'TeacherHome',
  data(){
    return {
      // asideTitles:['发布作业','发布公告','作业评分','讨论区','习题库','资源库','学习情况分析'],
      asideTitles:['发布作业','发布公告','作业评分','讨论区','习题库','学习情况分析','个人中心'],
      // routesArr:['/teacher/homework','/teacher/news','/teacher/review','/teacher/discussion',
      // '/teacher/questions','/teacher/resource','/teacher/analysis'],
      routesArr:['/teacher/homework','/teacher/news','/teacher/review','/teacher/discussion',
      '/teacher/questions','/teacher/analysis','/self'],
      role: 2
    }
  },
  components:{
    MainPage
  }
}
</script>

<style scoped>
.teacher-home {
  width: 100%;
  height: 100%;
}
</style>