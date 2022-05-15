<template>
  <div class="tiankong">
    <!-- 题目 -->
    <!-- 没有完成作业显示这个题目 -->
    <div class="timu clearfix" v-if="!done || teacher">
      <div class="index">{{index}}.</div>
      <div v-for="(item, index) in contentArr" :key="index" class="content">
          {{item}}
          <input type="text" 
                 v-if="index !== contentArr.length-1"
                 v-model="input[index]"
                 class="input">
      </div>      
    </div>
    <!-- 完成作业显示这个题目 -->
    <div class="timu clearfix" v-else>
      <div class="index">{{index}}.</div>
      <div v-for="(item, index) in contentArr" :key="index" class="content">
          {{item}}
          <input type="text" 
                 v-if="index !== contentArr.length-1"
                 class="input"
                 :value="stuAns[index]"
                 disabled>
      </div>      
    </div>
    <!-- 学生答案、标准答案、解析，只有学生完成作业后 done 为 true 才显示 -->
    <div v-if="done" class="answer">
      <answer
        :content="{answer:questionData.answer, analysis:questionData.analysis}"
        :showStuAns="false">
      </answer>
    </div>
  </div>
</template>

<script>
import Answer from '@/components/content/questions/Answer.vue'

export default {
  name: 'Tiankong',
  created() {
    // 将填空题的题目按 下划线 切分为数组
    let str=this.questionData.content.replace(/_+/g,',')
    this.contentArr=str.split(',')

    // 当完成作业后
    if(this.done && !this.teacher) {
      this.stuAns=this.questionData.stuAns.split(',')
    }
  },
  data() {
    return {
      contentArr: [],
      input: [],
      stuAns: []
    }
  },
  props: {
    questionData: {
      type:Object,
      required: true,
      default() {
        return {}
      }
    },
    done: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    teacher: {
      type: Boolean,
      default: false
    },
    hasSave: {
      type: Boolean,
      default:false
    }
  },
  watch: {
    hasSave(newVal, oldVal) {
      // 将填空题答案数组input，转换成字符串     
      let ans=""
      if(this.input.length===0) {
        ans=""
      } else {
        let arr=[]
        this.input.forEach(item=>arr.push(item.trim()))
        ans=arr.join(",")
      }
      let obj={
        qno: this.questionData.qno,
        type: this.questionData.type,
        stuAns: ans,
        mistake: ans===this.questionData.answer ? 0 : 1
      }
      this.$store.commit('submitStuAns', obj)
    }
  },
  components: {
    Answer
  }
}
</script>

<style scoped>
.timu {
  padding-bottom: 1.875rem;
}
.tiankong {
  margin-top: 1.25rem;
  border-bottom: 1px solid #C0C4CC;
  line-height: 2.5rem;
}
/* 题目相关样式 */
.index, .content {
  float: left;
}
.input {
  border: 1px solid #dcdfe6;
  color: #606266;
  font-size: 1rem;
  border-radius: 4px;
  height: 2em;
  line-height: 2rem;
  outline: none;
  padding: 0 15px;
  margin: 0 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.input:focus {
    outline: none;
    border-color: #409eff;
}

</style>