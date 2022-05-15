<template>
  <div>
    <second-page>
      <div slot="mainBody">
        <!-- 根据题目类型 type，显示不同的题目组件 -->
        <div v-for="(item, index) in questionArr" :key="index" class="question">
          <div v-if="item.type==='1'">
            <div class="que-left" v-show="item.showButton" @click="clickQue(index)" :class="{'chosen':item.chosen}">
              <i class="el-icon-check"></i>
            </div>
            <xuanze :questionData="item" :done="done" :index="index+1" :teacher="true" class="que-right"></xuanze>
          </div>
          <div v-else-if="item.type==='2'">
            <div class="que-left"  v-show="item.showButton" @click="clickQue(index)" :class="{'chosen':item.chosen}">
              <i class="el-icon-check"></i>
            </div>
            <tiankong :questionData="item" :done="done" :index="index+1" :teacher="true" class="que-right"></tiankong>
          </div>
          <div v-else-if="item.type==='3'">
            <div class="que-left"  v-show="item.showButton" @click="clickQue(index)" :class="{'chosen':item.chosen}">
              <i class="el-icon-check"></i>
            </div>
            <jianda :questionData="item" :done="done" :index="index+1" :teacher="true" class="que-right"></jianda>
          </div>
          <div v-else-if="item.type==='4'">
            <div class="que-left"  v-show="item.showButton" @click="clickQue(index)" :class="{'chosen':item.chosen}">
              <i class="el-icon-check"></i>
            </div>
            <jisuan :questionData="item" :done="done" :index="index+1" :teacher="true" class="que-right"></jisuan>
          </div>
        </div>
        <div class="button">
          <div class="button-item">
            <el-button type="success" round @click="chooseButton">选择题目</el-button>
          </div>
          <div class="button-item">
            <el-button type="success" round @click="chooseAll">
              {{chooseAllButton ? '取消全选' : '全选'}}
            </el-button>
          </div>
          <div class="button-item">
            <el-button type="success" round  @click="save">保存选择</el-button>
          </div>
        </div>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getTeaQueDetail} from '@/network/teacher.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'TeaQueDetail',
  created() {
    // 发送请求，根据 bno 获得这个习题卷的所有题目的 数据结构
    this.bno=this.$route.query.bno
    getTeaQueDetail(this.bno).then(res => {
      let arr=res.data
      // 为获得的 数据结构中的每一个对象，添加 chosen、showButton 属性
      arr.forEach(item => {
        item.chosen = false
        item.showButton = false
      })
      // 赋值给 data 中的 questionArr
      this.questionArr = arr
    })
    // let arr=[
    //         {qno: '1', type: '1', content: '选择题目1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1'},
    //         {qno: '2', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2'},
    //         {qno: '3', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3', score: 10},
    //         {qno: '4', type: '4', content: '计算题目1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4', score: 10},
    // ]
  },

  // 导航守卫
  beforeRouteLeave(to, from, next) {
    // 离开当前组件之前，如果用户之前点击了 保存选择 按钮，则将选择的题目 保存到 vuex 的 chosenQueArr 中
    if(this.saveChosen) {
      let chosenArr = []
      this.questionArr.forEach(item => {
        if(item.chosen) {
          chosenArr.push({qno:item.qno,type:item.type})
        }
      })
      this.$store.commit('putChosenQueArr', chosenArr)
    }
    next()
  },
  data() {
    return {
      bno: '',
      questionArr: [],
      done: true,
      chooseAllButton: false,
      saveChosen: false
    }
  },
  methods: {
    // 点击题目前的选择按钮
    clickQue(index){
      this.questionArr[index].chosen = ! this.questionArr[index].chosen
    },

    // 点击 选择题目 按钮
    chooseButton() {
      this.questionArr.forEach(item => {
        item.showButton = true     
      })
    },

    // 点击 全选 按钮
    chooseAll() {
      this.chooseAllButton = ! this.chooseAllButton
      if(this.chooseAllButton) {
        // 若显示 全选 按钮
        this.questionArr.forEach(item => {
          item.showButton = true
          item.chosen = true
        })
      } else {
        // 若显示 取消全选 按钮
        this.questionArr.forEach(item => {
          item.chosen = false
        })
      }     
    },

    // 点击 保存选择 按钮
    save() {
      this.saveChosen = true
      this.$message({
        message: '所选题目已添加到作业中',
        type: 'success'
      });
    }
  },
  components: {
    SecondPage,
    Xuanze,
    Tiankong,
    Jianda,
    Jisuan
  }
}
</script>

<style scoped>
/* 题目 */
.question>div {
  display: flex;
}
.que-left {
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: white;
  text-align: center;
  margin-top: 1.25rem;
  margin-right: 10px;
  border-radius: 15px;
  border: 1px solid #C0C4CC;
}
.chosen {
  background-color: #67C23A;
}
.que-right {
  flex: 1;
}

/* 右侧按钮 */
.button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.button-item {
  text-align: right;
  padding-bottom: 10px;
}
</style>