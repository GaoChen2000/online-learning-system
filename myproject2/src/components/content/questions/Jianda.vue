<template>
  <div class="jianda">
    <!-- 题目 -->
    <div class="timu">{{index}}.{{questionData.content}}({{questionData.score}}分)</div>
    <!-- 没有完成作业显示这个 -->
    <el-input
        v-if="!done || teacher"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea"
        class="textarea">
    </el-input>
    <!-- 完成作业后显示这个 -->
    <textarea 
        v-else
        disabled
        class="textarea"
        v-model="questionData.stuAns">
    </textarea>
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
  name: 'Jianda',
  data() {
    return {
      textarea: ''
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
      let obj={
        qno: this.questionData.qno,
        type: this.questionData.type,
        stuAns: this.textarea,
        mistake: 1
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
.jianda {
  margin-top: 1.25rem;
  border-bottom: 1px solid #C0C4CC;
}
.textarea {
  font-size: 1rem;
  line-height: 1.5rem;
  width: 100%;
  min-height: 6.25rem;
  max-height: 18.75rem;
  resize: vertical;
  padding: 5px 15px;
  margin-top: -0.625rem;
  overflow: visible;
}
.answer {
  margin-top: 1.875rem;
}

</style>