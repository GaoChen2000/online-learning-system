<template>
  <div id="app">
    <!-- <router-link to='/student'>学生首页</router-link>
    <router-link to='/teacher'>老师首页</router-link>
    <router-link to='/admin'>管理员首页</router-link> -->
    <keep-alive :include="include">
      <router-view/>
    </keep-alive>   
  </div>
</template>

<script>
export default {
  data() {
    return {
      exclude:"StuHomeworkQuestions,StuDisDetail,StuMisDetail,StuHomeworkDetail,StuResDetail",
      include: "StudentHome,TeacherHome,AdminHome"
      // include: "StuHomework,StuAnalysis,StuDiscussion,StuMistake,StuNews,StuResource"
    }
  }
}
</script>
<style>
@import './assets/css/base.css'
</style>
