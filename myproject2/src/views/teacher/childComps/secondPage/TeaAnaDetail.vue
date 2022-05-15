<template>
  <second-page>
    <div slot="mainBody" class="main">
      <div :id="hno + 'correctChar'" class="correct"></div>
      <div :id="hno + 'incorrectChar'" class="incorrect"></div>
      <el-button type="success" round @click="seeMore" class="button">查看作业内容</el-button>
    </div>
  </second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getTeaAnaDetail} from '@/network/teacher.js'

export default {
  name: 'TeaAnaDetail',
  created() {
    
    // this.correctArr = [
    //   {queNo: '1', rate: 20},
    //   {queNo: '2', rate: 95},
    //   {queNo: '3', rate: 90},
    //   {queNo: '4', rate: 65},
    //   {queNo: '5', rate: 35},
    // ]
  },
  mounted() {
    // 获取路由中的 hno
    this.hno = this.$route.query.hno

    // 发送请求，根据 hno 获得作业中每道题的正确率的 数据结构（只包含选择、填空）
    getTeaAnaDetail(this.hno).then(res => {
      this.correctArr=res.data
      // 整理成 echarts 的 data
      // 每题正确率的数据
      let correctX = []
      let correctData = []
  
      this.correctArr.forEach(item => {
        correctX.push('第' + item.queNo + '题')
        correctData.push(item.rate)
      })
  
      // 错误率前十的数据
      let arr = this.correctArr
      let incorrectX = []
      let incorrectData = []
  
      arr.sort((x,y) => (100 - y.rate) - (100 - x.rate))
      if(arr.length < 10) {
        for(let i=0; i<arr.length; i++) {
          incorrectX.push('第' + arr[i].queNo + '题')
          incorrectData.push(100 - arr[i].rate)
        } 
      } else {
        for(let i=0; i<10; i++) {
          incorrectX.push('第' + arr[i].queNo + '题')
          incorrectData.push(100 - arr[i].rate)
        } 
      }
      
      // 创建图表
      // 正确率的图表
      let correctChar = this.$echarts.init(document.getElementById(this.hno + 'correctChar'))
      let option = {
        title: {
          text: '此作业习题的正确率',
        },
        xAxis: {
          data: correctX
        },
        yAxis :{
          name: '正确率',
          max: 100,
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [
          {
            type: 'bar',
            data: correctData,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            // label: {
            //   show: true,
            //   position: 'top'
            // },
          }
        ]
      }
      correctChar.setOption(option)
  
      // 错误率前十的图表
      let incorrectChar = this.$echarts.init(document.getElementById(this.hno + 'incorrectChar'))
      let incorrectOption = {
        title: {
          text: '此作业中错误率最高的前十题',
        },
        xAxis: {
          data: incorrectX
        },
        yAxis :{
          name: '错误率',
          max: 100,
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [
          {
            type: 'bar',
            data: incorrectData,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            // label: {
            //   show: true,
            //   position: 'top'
            // },
          }
        ]
      }
      incorrectChar.setOption(incorrectOption)  
    })
  },
  data() {
    return {
      hno: '',
      correctArr: [],
      hasCorrectArr: false
    }
  },
  methods: {
    seeMore() {
      this.$router.push({
        path: '/teacher/homework/detail',
        query: {
          hno: this.hno
        }
      })
    }
  },
  components: {
    SecondPage,
  }
}
</script>

<style scoped>
.main {
  text-align: center;
}
.correct {
  width: 100%;
  height: 350px;
}
.incorrect {
  width: 100%;
  height: 350px;
}
.button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>