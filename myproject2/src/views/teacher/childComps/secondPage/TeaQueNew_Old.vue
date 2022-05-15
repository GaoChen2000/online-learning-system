<template>
  <second-page>
    <div slot="mainBody">
       <form 
    action="http://127.0.0.1:8081/teacher/newQue" 
    method="POST" 
    enctype="multipart/form-data">
    <input 
    multiple
    type="file" name="a">
    <input type="submit" value="提交" @click="httpRequest">
    </form>
      <div class="box">
        <div>选择题上传：</div>        
        <el-upload
          class="upload"
          ref="upload1"
          action=""
          :file-list="fileList1"
          :auto-upload="false"
          :on-change="httpRequest">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传word文件</div>
        </el-upload>
      </div>
      <div class="box">
        <div>填空题上传：</div>
        <el-upload
          class="upload"
          ref="upload2"
          action="http://127.0.0.1:8081/teacher/newQue"
          :file-list="fileList2"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传word文件</div>
        </el-upload>
      </div>
      <div class="box">
        <div>简答题上传：</div>
        <el-upload
          class="upload"
          ref="upload3"
          action="http://127.0.0.1:8081/teacher/newQue"
          :file-list="fileList3"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传word文件</div>
        </el-upload>
      </div>
      <div class="box">
        <div>计算题上传：</div>
        <el-upload
          class="upload"
          ref="upload4"
          action="http://127.0.0.1:8081/teacher/newQue"
          :file-list="fileList4"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传word文件</div>
        </el-upload>
      </div>
      <div>
        <input type="file" id="upload">
      </div>
      <div class="button">
        <el-button type="success" round @click="submit">上传</el-button>
      </div>      
    </div>
  </second-page>
</template>

<script>
import XLSX from 'xlsx'
import SecondPage from '@/components/content/SecondPage.vue'
import {newQue} from '@/network/teacher.js'

export default {
  name: 'TeaQueNew',
  mounted() {
    let input = document.getElementById('upload')
    console.log(input)
      input.onchange = function(){
        console.log('执行了这里')
        let file = this.files[0]
        let reader = new FileReader()
        reader.readAsText(file,'gbk2312')
        reader.onload = ()=>{
          console.log(reader.result)
        }
      }
  },
  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
    }
  },
  methods: {
    httpRequest(file){
      // let file = e.file
      
      if(!file) {
        return false
      } else if(!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或xlsx格式的文件')
        return false
      }
      console.log('执行了这里http')
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          console.log(workbook)
          const exlname = workbook.SheetNames[0]
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname])
          console.log(exl)
          let arr=[]
          exl.forEach(item => {
            arr.push(item.name)
          })
          console.log(arr)
        } catch(e) {
          console.log('error')
          return false
        }
        fileReader.readAsBinaryString(file)
      }
    },
    submit() {
      let input = document.getElementById('upload')
      input.onchange = ()=>{
        let file = this.files[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = ()=>{
          console.log(reader.result)
        }
      }
      // 发送请求
      // console.log(this.fileList1)
      // this.$refs.upload1.submit()
      // this.$refs.upload2.submit()
      // this.$refs.upload3.submit()
      // this.$refs.upload4.submit()
      // const formData = new FormData()
      // formData.append('fileList',file)
      // newQue(formData)
      // 文件都成功上传后，弹出消息
      // this.$message.success('文件上传成功');
    },
  },
  components: {
    SecondPage
  }
}
</script>

<style scoped>
.box {
  display: flex;
  line-height: 24px;
  padding: 30px 0;
  border-bottom: 1px solid #C0C4CC;
}
.upload {
  flex: 1;
}
.el-upload__tip {
  display: inline-block;
  padding-left: 10px;
}
.button {
  text-align: right;
  padding-top: 30px;
}
</style>