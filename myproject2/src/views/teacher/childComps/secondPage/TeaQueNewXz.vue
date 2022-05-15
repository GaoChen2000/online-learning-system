<template>
<second-page>
    <div slot="mainBody">
      <el-form ref="form" :model="form" label-width="110px" class="form" id="form">
        <div class="wrap" v-for="(item,index) in form" :key="index">
          <el-form-item label="题目内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入题目内容"
              v-model="item.content">
            </el-input>
          </el-form-item>
          <el-form-item label="选项 A 的内容">
            <el-input
              placeholder="请输入选项A的内容"
              v-model="item.radio[0]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="选项 B 的内容">
            <el-input
              placeholder="请输入选项B的内容"
              v-model="item.radio[1]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="选项 C 的内容">
            <el-input
              placeholder="请输入选项C的内容"
              v-model="item.radio[2]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="选项 D 的内容">
            <el-input
              placeholder="请输入选项D的内容"
              v-model="item.radio[3]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="选项 E 的内容">
            <el-input
              placeholder="请输入选项E的内容"
              v-model="item.radio[4]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="选项 F 的内容">
            <el-input
              placeholder="请输入选项F的内容"
              v-model="item.radio[5]"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="参考答案">
            <el-input
              placeholder="输入 A、B 等"
              v-model="item.answer"
              clearable
              class="answer">
            </el-input>
          </el-form-item>
          <el-form-item label="答案解析">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入答案解析"
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
  name: 'TeaQueNewXz',
  data() {
    return {
      form: {
        a0: {content: '', radio: [], answer: '', analysis: ''},
        a1: {content: '', radio: [], answer: '', analysis: ''},
        a2: {content: '', radio: [], answer: '', analysis: ''},
        a3: {content: '', radio: [], answer: '', analysis: ''},
        a4: {content: '', radio: [], answer: '', analysis: ''},
        a5: {content: '', radio: [], answer: '', analysis: ''},
        a6: {content: '', radio: [], answer: '', analysis: ''},
        a7: {content: '', radio: [], answer: '', analysis: ''},
        a8: {content: '', radio: [], answer: '', analysis: ''},
        a9: {content: '', radio: [], answer: '', analysis: ''},
      },
      newQueIndex: this.$store.state.newQueIndex.xz
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
        if(obj[key].content && obj[key].radio.length!==0 && obj[key].answer) {
          obj2[key] = obj[key]
        }
      }
      // 保存信息到vuex中
      this.$store.commit('setNewQueInfo', {data: obj2, type: 'xz'})
      // 标识第几次创建习题，增1
      this.$store.commit('setNewQueIndex', 'xz')
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
  padding-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #C0C4CC;
}
.answer {
  width: 150px;
}
.save {
  position: fixed;
  right: 100px;
  bottom: 50px;
}
</style>