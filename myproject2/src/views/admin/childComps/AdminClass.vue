<template>
  <div>
    <el-autocomplete
      v-model="chosenClass"
      :fetch-suggestions="querySearch"
      @select="selectOption"
      placeholder="请输入班级名称"
      prefix-icon="el-icon-search"
      class="search">
    </el-autocomplete>
    <card2 v-for="item in chosenClassArr" :key="item.cno">
      <div slot="center">{{item.name}}</div>
      <div slot="right"><el-button type="success" round class="button" @click="update">更新</el-button></div>
    </card2>
  </div>
</template>

<script>
import Card2 from '@/components/common/Card2.vue'
import {getAllClass} from '@/network/admin.js'

export default {
  name: 'AdminClass',
  created() {
    // 发送请求，获得所有班级的 数据结构
    getAllClass().then(res => {
      // console.log(res.data)
    })
    this.allClassArr = [
      {cno: '1', name: '班级名1'},
      {cno: '2', name: '哈哈哈'},
      {cno: '3', name: '嘿嘿嘿'}
    ]

    // 让一开始显示的班级为所有班级
    this.chosenClassArr = this.allClassArr

    // 创建 classOptions 数据结构，用于搜索建议
    this.allClassArr.forEach(item => {
      this.classOptions.push({value: item.cno, label: item.name})
    }) 
  },
  data() {
    return {
      allClassArr: [],
      chosenClassArr: [],
      classOptions: [],
      chosenClass: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      this.chosenClassArr = 
        queryString ? this.allClassArr.filter(item => item.name.indexOf(queryString) !== -1) : this.allClassArr
      let arr = []
      this.chosenClassArr.forEach(item => {
        arr.push({value: item.name})
      })
      cb(arr)
    },
    selectOption() {
      this.chosenClassArr = this.chosenClassArr.filter(item => item.name === this.chosenClass)
    },
    update() {
      // 发送请求
    }
  },
  components: {
    Card2
  }
}
</script>

<style scoped>
.search {
  width: 300px;
  margin-left: 80px;
  margin-top: 30px;
}
.button {
  position: relative;
  bottom: .625rem;
}
</style>