<template>
  <div>
    <card 
      :topTitles="[cardContent.subjectTeacher,cardContent.time]"
      :hasBottom="true">
      <div slot="middle">
        <div>
          <div>截止时间：{{endtime}}</div>
          <div class="contentTitle">作业详情：</div>
          <div class="detail content-ellipsis">{{cardContent.detail}}</div>
        </div> 
      </div>
      <div slot="bottom" class="bottom">
        <el-button :type="done ? 'primary': 'success'" 
                    round 
                    @click="doHomework(cardContent.hno, done,cardContent.cno,cardContent.subjectTeacher)">
                    {{done ? '查看详情':'做作业'}}
        </el-button>
        <el-button type="success" round @click="seeMore">查看更多></el-button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import {formatTime} from '@/common/utils.js'

export default {
  name:'StuHomeworkCard',
  created() {
    // 超过作业的截止时间，则不能作答，显示查看详情
    let now = new Date()
    this.endtime = new Date(this.cardContent.endtime)
    if(this.endtime < now) {
      this.done = true
    }
    // 格式化截止时间
    this.endtime = formatTime(this.endtime)
  },
  data() {
    return {
      done: this.cardContent.done,
      endtime: ''
    }
  },
  props: {
    cardContent: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  methods: {
    seeMore() {
      this.$router.push({
        path: '/student/homework/homeworkDetail',
        query: {
          hno: this.cardContent.hno,
          done: this.cardContent.done,
          detail: this.cardContent.detail,
          cno: this.cardContent.cno,
          cname: this.cardContent.subjectTeacher,
          endtime:  this.cardContent.endtime
        }
      })
    },
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
    Card
  }
}
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
}
</style>