<template>
  <div>
    <second-page>
      <div slot="mainBody">
        <!-- 讨论题内容 -->
        <div class="question">{{content}}</div>
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
            <div class="allCom-delete">
              <el-button type="primary" round plain @click="deleteCom(item.comno,index)">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </second-page>
  </div>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getDisDetail, AdmDeleteCom} from '@/network/admin.js'

export default {
  name: 'AdminDisDetail',
  created() {
    // 获取路由参数中的 dno
    this.dno=this.$route.query.dno

    // 发送请求，获得 dno 对应的讨论题的内容（请求返回一个对象）
    getDisDetail(this.dno).then(res => {
      let obj=res.data
      // 将请求的数据，赋值给 data 数据
      this.content=obj.content
      this.myCom=obj.myCom
      this.comArr=obj.comArr
    })
    // let obj={
    //   content: '消息详情1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或',
    //   comArr: [
    //     {comno: '4', sname: '张三', tname: '', content: '评论1哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或', time: '2022-04-10', img: '1'},
    //     {comno: '5', sname: '', tname: '李四', content: '评论2', time: '2022-04-10',img: '2'},
    //     {comno: '6', sname: '王五', tname: '', content: '评论3', time: '2022-04-10',img: '2'}
    //   ]
    // }
  },
  data() {
    return {
      dno: '',
      content: '',
      myCom: [],
      comArr: [],
      textarea: ''
    }
  },
  methods: {
    deleteCom(comno, index) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求
        AdmDeleteCom(comno).then(res => {
          if(res.data.status!==200) {
            this.$message.error('删除失败');
          } else {
            // 修改 data 数据
            this.comArr.splice(index,1)
            this.$message.success('删除成功');
          }          
        })        
      }).catch(() => {})
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
.allCom-delete {
  text-align: right;
}
</style>