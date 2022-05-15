<template>
  <div>
    <second-page>
      <div slot="mainBody">
        <!-- 讨论题内容 -->
        <div class="question">{{content}}</div>
        <!-- 我的评论部分 -->
        <div class="myCom">
          <div class="myComTitle">我的讨论：</div>
          <div v-if="myCom.length !== 0">
            <div v-for="(item,index) in myCom" :key="item.time+index" class="myCom-item">
              <div class="myCom-content">{{item.content}}</div>
              <div class="myCom-time">{{item.time}}</div>
            </div>
          </div>
        </div>
        <!-- 所有讨论部分 -->
        <div>
          <div class="allCom-title">所有讨论：</div>
          <div v-for="(item,index) in comArr" :key="index" class="allCom-item">
            <div class="allCom-top">
              <div class="allCom-top-left">
                <div class="allCom-name">{{item.sname ? item.sname : item.tname}}</div>
              </div>
              <div class="allCom-time">{{item.time}}</div>
            </div>
            <div class="allCom-bottom">{{item.content}}</div>
          </div>
        </div>
        <!-- 发布讨论 -->
        <el-popover
          placement="top"
          width="500"
          trigger="click">
          <!-- 弹框内容 -->
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 7}"
            placeholder="请输入讨论内容"
            v-model="textarea">
          </el-input>
          <div class="textarea-button">
            <el-button type="success" round @click="join">发布</el-button>
          </div>
          <!-- 按钮 -->
          <el-button slot="reference" type="success" round class="join">发布讨论</el-button>
        </el-popover>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getTeaDisDetail, submitTeaDis} from '@/network/teacher.js'

export default {
  name: 'TeaDisDetail',
  created() {
    // 获取路由参数中的 dno
    this.dno=this.$route.query.dno

    // 发送请求，获得 dno 对应的讨论题的内容（请求返回一个对象）
    this.tno=sessionStorage.getItem('no')
    getTeaDisDetail(this.dno,this.tno).then(res => {
      let obj=res.data
      // 将请求的数据，赋值给 data 数据
      this.content=obj.content
      this.myCom=obj.myCom
      this.comArr=obj.comArr
    })
    // let obj={
    //   content: '消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或',
    //   myCom: [
    //     {content: '我的评论1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',time: '2022-04-10'},
    //     {content: '我的评论2',time: '2022-04-10'},
    //     {content: '我的评论3',time: '2022-04-10'}
    //   ],
    //   comArr: [
    //     {sname: '张三', tname: '', content: '评论1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或', time: '2022-04-10', img: '1'},
    //     {sname: '', tname: '李四', content: '评论2', time: '2022-04-10',img: '2'},
    //     {sname: '王五', tname: '', content: '评论3', time: '2022-04-10',img: '2'}
    //   ]
    // }
  },
  data() {
    return {
      dno: '',
      tno:0,
      content: '',
      myCom: [],
      comArr: [],
      textarea: ''
    }
  },
  methods: {
    join() {
      // 如果输入的内容为空，或者只包含空格
      if(/^\s*$/.test(this.textarea)) {
        this.$message.error('请输入内容后再发布');
        this.textarea = ''
      } else {
        // 发送请求，提交数据
        submitTeaDis(this.dno,this.tno, this.textarea).then(res => {
          if(res.data.status===200) {
            this.$message.success('发布成功');
          } else {
            this.$message.error('发布失败，请稍后重新发送');
          }
        })
      }
    }
  },
  components: {
    SecondPage,
  }
}
</script>

<style scoped>
/* 题目部分 */
.question {
  padding: 1.875rem 0;
  border-bottom: 1px solid #C0C4CC;
}

/* 我的讨论部分 */
.myCom {
  border-bottom: 1px solid #C0C4CC;
}
.myComTitle {
  padding: 1.25rem 0;
  font-size: 1.125rem;
  color: #67C23A;
}
.myCom-item {
  display: flex;
  padding: .9375rem 0;
  color: #606266;
  border-bottom: 1px solid #C0C4CC;
}
.myCom-content {
  flex: 8;
}
.myCom-time {
  flex: 2;
  text-align: right;
  color: #909399;
}

/* 所有讨论部分 */
.allCom-title {
  padding-bottom: 1.25rem;
  padding-top: 3.125rem;
  font-size: 1.125rem;
  color: #67C23A;
}
.allCom-item {
  padding: .9375rem 0;
  color: #606266;
  border-bottom: 1px solid #C0C4CC;
}
.allCom-top {
  display: flex;
  line-height: 40px;
  padding-bottom: .625rem;
}
.allCom-top-left {
  flex: 8;
}
.allCom-name { 
  display: inline-block;
  color: #409EFF;
}
.allCom-time {
  flex: 2;
  text-align: right;
  color: #909399;
}

/* 发布讨论按钮 */
.join {
  position: fixed;
  right: 50px;
  bottom: 50px;
}
.textarea-button {
  text-align: right;
  padding-top: 10px;
}
</style>