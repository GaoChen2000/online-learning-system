<template>
  <div>
    <second-page>
      <div slot="mainBody" class="mainBody">
        <!-- 搜索框 -->
        <div class="search-box">
          <el-autocomplete
            v-model="chosenMis"
            :fetch-suggestions="querySearch"
            @select="selectOption"
            placeholder="请输入题目"
            prefix-icon="el-icon-search"
            class="search">
          </el-autocomplete>
        </div>        
        <!-- 标签栏 -->
        <div class="tags">
          <el-button type="success" round class="tag-item" @click="getTagData('1')">选择</el-button>
          <el-button type="success" round class="tag-item" @click="getTagData('2')">填空</el-button>
          <el-button type="success" round class="tag-item" @click="getTagData('3')">简答</el-button>
          <el-button type="success" round class="tag-item" @click="getTagData('4')">计算</el-button>
        </div>
         <!-- 根据题目类型 type，显示不同的题目组件 -->
        <div v-for="(item, index) in chosenMisArr" :key="item.qno+'-'+item.type">
          <div v-if="item.type==='1'">
            <xuanze :questionData="item" :done="true" :index="index+1"></xuanze>
          </div>
          <div v-else-if="item.type==='2'">
            <tiankong :questionData="item" :done="true" :index="index+1"></tiankong>
          </div>
          <div v-else-if="item.type==='3'">
            <jianda :questionData="item" :done="true" :index="index+1"></jianda>
          </div>
          <div v-else-if="item.type==='4'">
            <jisuan :questionData="item" :done="true" :index="index+1"></jisuan>
          </div>
        </div>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getStuMis} from '@/network/student.js'

// 题目组件
import Xuanze from '@/components/content/questions/Xuanze.vue'
import Tiankong from '@/components/content/questions/Tiankong.vue'
import Jianda from '@/components/content/questions/Jianda.vue'
import Jisuan from '@/components/content/questions/Jisuan.vue'

export default {
  name: 'StuMisDetail',
  created() {
    // 获取路由参数中的 cno（科目班级编号）
    this.cno=this.$route.query.cno

    // 根据 sno、cno，发送请求，获得错题信息的数据结构
    // 点击标签后，返回的数据结构也是这样
    let sno=sessionStorage.getItem('no')
    getStuMis(sno, this.cno).then(res => {
      this.allMistakeArr=res.data
      // 让一开始显示的题目为所有题目
      this.chosenMisArr = this.allMistakeArr
    })
    // this.allMistakeArr= [
    //         {qno: '1', type: '1', content: '选择题目1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1',stuAns: 'B'},
    //         {qno: '2', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2',stuAns: '哈哈哈'},
    //         {qno: '3', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '4', type: '4', content: '计算哈哈哈1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    //         {qno: '5', type: '1', content: '哈哈哈1',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析1',stuAns: 'B'},
    //         {qno: '6', type: '1', content: '嘿嘿嘿2',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析2',stuAns: 'A'},
    //         {qno: '7', type: '1', content: '选择题目3',answer: 'A',value: ['选项A','选项B','选项C','选项D'], analysis: '解析3',stuAns: 'C'},
    //         {qno: '8', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2',stuAns: '哈哈哈'},
    //         {qno: '9', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '10', type: '4', content: '计算哈哈哈1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    //         {qno: '11', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2',stuAns: '哈哈哈'},
    //         {qno: '12', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '13', type: '4', content: '计算哈哈哈1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    //         {qno: '14', type: '2', content: '填空题目1_____这是可以说的吗？____________哦，可以可以_____',answer: '哈哈哈,呵呵呵', analysis: '解析2',stuAns: '哈哈哈'},
    //         {qno: '15', type: '3', content: '简答题目1',answer: '啦啦啦', analysis: '解析3',stuAns: '嘿嘿嘿', score: 10},
    //         {qno: '16', type: '4', content: '计算哈哈哈1',answer: ['某个图片url11','某个图片url22','某个图片url33'], analysis: '解析4',stuAns: ['某个图片url1','某个图片url2','某个图片url3'], score: 10},
    // ]
  },
  data() {
    return {
      cno: '',
      allMistakeArr: [],
      chosenMisArr: [],
      chosenMis: ''
    }
  },
  methods: {
    // 点击标签
    getTagData(type) {
      this.chosenMisArr = this.allMistakeArr.filter(item => item.type === type)
    },
    // 搜索框
    querySearch(queryString, cb) {
      this.chosenMisArr = 
        queryString ? 
          this.allMistakeArr.filter(item => item.content.indexOf(queryString) !== -1) : 
          this.allMistakeArr
      let arr = []
      this.chosenMisArr.forEach(item => {
        arr.push({value: item.content})
      })
      cb(arr)
    },
    selectOption() {
      this.chosenMisArr = this.chosenMisArr.filter(item => item.content === this.chosenMis)
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
/* 搜索框 */
.search-box {
  text-align: center;
  padding-top: 10px;
}
.search {
  width: 500px;
}
/* 标签 */
.tags {
  padding: 20px 0;
  text-align: center;
  /* border: 1px solid pink; */
}
.tag-item {
  padding: 10px;
  margin-right: 20px;
  /* border-radius: 15px; */
}
</style>