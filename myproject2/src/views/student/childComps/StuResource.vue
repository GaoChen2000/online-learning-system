<template>
  <div>
    <stu-resource-card 
      v-for="item in resourceArr" 
      :key="item.cno" 
      :cardContent="item"
    ></stu-resource-card>
  </div>
</template>

<script>
import StuResourceCard from '@/views/student/childComps/cards/StuResourceCard.vue'
import {getStuResource} from '@/network/student.js'

export default {
  name:'StuResource',
  created() {
    let sno=sessionStorage.getItem('no')
    getStuResource(sno).then(res => {
      this.resourceArr=res.data
    })
    // 发送请求 获得的数据结构
    // this.resourceArr=[
    //     {cno: '1',name:'科目名1（老师名）'},
    //     {cno: '2',name:'科目名2（老师名）'},
    //     {cno: '3',name:'科目名3（老师名）'}
    //   ]
  },
  data() {
    return {
      resourceArr: []
    }
  },
  components: {
    StuResourceCard
  }
}
</script>

<style scoped>

</style>