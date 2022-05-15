<template>
  <div>
    <second-page>
      <div slot="mainBody" class="mainBody">
        <card2 v-for="(item,index) in resourceArr" :key="item.rno">
          <div slot="center">{{item.name}}</div>
          <div slot="right" class="right">
            <a href="#" class="download">
              <el-button type="success" icon="el-icon-download" circle 
                       @click="download(item.url,index)">
              </el-button>
            </a>
          </div>
        </card2> 
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import Card2 from '@/components/common/Card2.vue'
import {getStuRes} from '@/network/student.js'

export default {
  name: 'StuResDetail',
  created() {
    // 获取路由参数中的 cno（科目班级编号）
    this.cno=this.$route.query.cno

    // 根据 cno，发送请求，获得资源信息的数据结构
    getStuRes(this.cno).then(res => {
      this.resourceArr=res.data
    })
    // this.resourceArr = [
    //   {rno: '1', name: '资源名称1', url: '1'},
    //   {rno: '2', name: '资源名称2', url: '2'},
    //   {rno: '3', name: '资源名称3', url: '3'},
    // ]
  },
  data() {
    return {
      cno: '',
      resourceArr: []
    }
  },
  methods: {
    download(url,index){
      let link=document.getElementsByClassName('download')[index]
      link.target="_blank"
      link.href=url
      link.click()
    }
  },
  components: {
    SecondPage,
    Card2
  }
}
</script>

<style scoped>
.mainBody {
  border-left: 1px solid #C0C4CC;
  border-right: 1px solid #C0C4CC;
}
.download {
  font-size: 1rem;
  position: relative;
  bottom: .625rem;
}
</style>