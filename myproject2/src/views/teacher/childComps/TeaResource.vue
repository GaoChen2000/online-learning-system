<template>
  <div>
    <card2 v-for="(item,index) in resourceArr" :key="item.rno">
      <div slot="center">{{item.name}}</div>
      <div slot="right" class="right">
        <a href="#" class="download">
          <el-button type="success" icon="el-icon-download" circle 
                     @click="download(item.url,index)">                    
          </el-button>
        </a>
      </div>
    </card2>
    <!-- 上传资源按钮 -->
    <el-popover
      placement="top"
      width="500">
      <!-- 弹框内容 -->
      <div class="upload-content">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          :on-error="handldError"
          :auto-upload="false"
          :file-list="fileList"
          ref="upload">
          <el-button type="success" round>选择文件</el-button>
          <div slot="tip" class="tip">可以上传多个文件</div>
        </el-upload>
        <el-button type="success" round @click="upload" class="upload-button">上传</el-button>
      </div>
      <!-- 按钮 -->
      <el-button slot="reference" type="success" round class="button">上传资源</el-button>
    </el-popover>
  </div>
</template>

<script>
import Card2 from '@/components/common/Card2.vue'
import {getTeaRes} from '@/network/teacher.js'

export default {
  name: 'TeaResource',
  created() {
    // 根据 tno，发送请求，获得资源信息的数据结构
    let tno=sessionStorage.getItem('no')
    getTeaRes(tno).then(res => {
      this.resourceArr=res.data
    })
    // this.resourceArr = [
    //   {rno: '1', name: '资源名称1', url: '1'},
    //   {rno: '2', name: '资源名称2', url: '2'},
    //   {rno: '3', name: '资源名称3', url: '3'},
    // ]
  },
  data() {
    return {
      resourceArr: [],
      // 上传资源相关数据
      fileList: []
    }
  },
  methods: {
    download(url,index) {
      let link=document.getElementsByClassName('download')[index]
      link.target="_blank"
      link.href=url
      link.click()
    },
    upload() {
      // 发送请求，进行上传
      this.$refs.upload.submit()
    },
    
    handleSuccess() {
      this.$message.success('上传成功');

      // 上传成功，则清空 data 数据中和上传信心相关的内容
      this.resourceName = ''
      this.fileList = []
    },
    handldError() {
      // 后端判断fileList是否为空，如果为空，返回errs
      this.$message.error('上传失败，请重新上传');
    }
  },
  components: {
    Card2
  }
}
</script>

<style scoped>
.download {
  font-size: 1rem;
  position: relative;
  bottom: .625rem;
}
/* 上传资源按钮 */
.button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.upload-content {
  height: 300px;
}
.upload-button {
  margin-top: 10px;
}
.tip {
  padding-top: 5px;
}
</style>