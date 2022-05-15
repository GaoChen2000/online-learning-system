<template>
  <div>
    <second-page>
      <div slot="mainBody" class="main-body">
        <div class="content">
          <div>作业详情：</div>
          <div>{{$route.query.detail}}</div>
          <div>截止时间：{{endtime}}</div>
        </div>
        
        <div class="bottom">
          <el-button :type="done==='true' ? 'primary': 'success'" 
                      round 
                      @click="doHomework($route.query.hno, done,$route.query.cno,$route.query.cname)">
                      {{done==='true' ? '查看详情':'做作业'}}
          </el-button>
        </div>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {formatTime} from '@/common/utils.js'

export default {
  name: 'StuHomeworkDetail',
  created() {
    // 超过作业的截止时间，则不能作答，显示查看详情
    let now = new Date()
    this.endtime = new Date(this.$route.query.endtime)
    if(this.endtime < now) {
      this.done = true
    }
    // 格式化截止时间
    this.endtime = formatTime(this.endtime)
  },
  data() {
    return {
      done: false,
      endtime: ''
    }
  },
  methods: {
    doHomework(hno, done, cno, cname) {
      this.$router.push({
        path: '/student/homework/questions',
        query: {
          hno,
          done,
          cno,
          cname
        }
      })
    }
  },
  components: {
    SecondPage
  }
}
</script>

<style scoped>
.main-body {
  width: 31.25rem;
  margin: 0 auto;
  padding: 1.875rem 0;
}
.content {
  color: #606266;
}
.bottom {
  text-align: right;
  margin-top: 1.875rem;
}
</style>