<template>
  <div class="admin-home">
    <main-page :asideTitles="asideTitles" :routesArr="routesArr" :role="role"></main-page>
  </div> 
</template>

<script>
import MainPage from '@/components/content/MainPage.vue'

export default {
  name:'StudentHome',
  data(){
    return {
      // asideTitles:['管理班级','讨论区'],
      asideTitles:['讨论区','个人中心'],
      // routesArr:['/admin/class','/admin/discussion'],
      routesArr:['/admin/discussion','/self'],
      role: 3
    }
  },
  components:{
    MainPage,
  }
}
</script>

<style scoped>
.admin-home {
  width: 100%;
  height: 100%;
}
</style>