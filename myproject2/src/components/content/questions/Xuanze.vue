<template>
  <div class="xuanze">
    <!-- 题目 -->
    <div>{{index}}.{{questionData.content}}</div>
    <!-- 选项 -->
    <div class="clearfix allOption">
      <el-radio-group v-model="radio" v-if="!done || teacher">
        <el-radio v-for="(item,index) in questionData.value" 
                  :key="index" 
                  :label="index"
                  class="option"
                  :style="{'font-size':'1rem'}">
                  {{item}}</el-radio>
      </el-radio-group>
      <el-radio-group :value="questionData.stuAns.charCodeAt(0)-'A'.charCodeAt(0)" v-else>
        <el-radio v-for="(item,index) in questionData.value" 
                  :key="index"
                  :label="index"
                  class="option">
                  {{item}}</el-radio>
      </el-radio-group>
    </div>
    <!-- 学生答案、标准答案、解析，只有学生完成作业后 done 为 true 才显示 -->
    <div v-if="done" class="answer">
      <answer
        :content="{stuAns:questionData.stuAns, answer:questionData.answer, analysis:questionData.analysis}"
        :showStuAns="false">
      </answer>
    </div>
  </div>
</template>

<script>
import Answer from '@/components/content/questions/Answer.vue'

export default {
  name: 'Xuanze',
  data() {
    return {
      radio: -1
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
      let ans=''
      if(this.radio===0) {
        ans="A"
      } else if(this.radio===1) {
        ans="B"
      } else if(this.radio===2) {
        ans="C"
      }else if(this.radio===3) {
        ans="D"
      }else if(this.radio===4) {
        ans="E"
      }else if(this.radio===5) {
        ans="F"
      }
      let obj={
        qno: this.questionData.qno,
        type: this.questionData.type,
        stuAns: this.radio,
        mistake: this.questionData.answer === ans ? 0 : 1
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
.allOption {
  padding-top: 1.25rem;
  padding-bottom: 1.875rem;
}
.option {
  float: left;
  font-size: 1rem !important;
  line-height: 1.5rem;
  color: black;
}

.xuanze {
  margin-top: 1.25rem;
  border-bottom: 1px solid #C0C4CC;
}
</style>