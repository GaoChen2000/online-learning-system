<template>
<second-page>
    <div slot="mainBody">
      <el-form ref="form" :model="form" label-width="110px" class="form" id="form">
        <div class="wrap" v-for="(item,key) in form" :key="key">
          <el-form-item label="题目内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入填空题目内容"
              v-model="item.content">
            </el-input>
          </el-form-item>
          <el-form-item label="参考答案">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入参考答案"
              v-model="item.answer">
            </el-input>
          </el-form-item>
          <el-form-item label="答案解析">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入解析"
              v-model="item.analysis">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="success" round @click="save" class="save">保存</el-button>
    </div>
</second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
export default {
  name: 'TeaQueNewTk',
  data() {
    return {
      form: {
        a0: {content: '', answer: '', analysis: ''},
        a1: {content: '', answer: '', analysis: ''},
        a2: {content: '', answer: '', analysis: ''},
        a3: {content: '', answer: '', analysis: ''},
        a4: {content: '', answer: '', analysis: ''},
        a5: {content: '', answer: '', analysis: ''},
        a6: {content: '', answer: '', analysis: ''},
        a7: {content: '', answer: '', analysis: ''},
        a8: {content: '', answer: '', analysis: ''},
        a9: {content: '', answer: '', analysis: ''},
      },
      newQueIndex: this.$store.state.newQueIndex.tk
    }
  },
  methods: {
    save() {
      let obj={}
      let obj2={}
      if(this.newQueIndex > 0) {
        let i=0
        for(let key in this.form) {
          obj['a'+(this.newQueIndex*10+i)]=this.form[key]
          i++
        }
      } else {
        obj = this.form
      }
      for(let key in obj) {
        if(obj[key].content && obj[key].answer) {
          obj2[key] = obj[key]
        }
      }
      // 保存信息到vuex中
      this.$store.commit('setNewQueInfo', {data: obj2, type: 'tk'})
      // 标识第几次创建习题，增1
      this.$store.commit('setNewQueIndex', 'tk')
      // 返回上一个页面
      this.$router.replace('/teacher/questions/new')
    }
  },
  components: {
    SecondPage
  }
}
</script>

<style scoped>
.form {
  width: 700px;
}
.wrap {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #C0C4CC;
}
.save {
  position: fixed;
  right: 100px;
  bottom: 50px;
}
</style>