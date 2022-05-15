<template>
 <second-page>
    <div slot="mainBody">
        <!-- 表单 -->
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
          <!-- 公告内容 -->
          <el-form-item label="公告内容" prop="content">
            <el-input
              type="textarea"
             :autosize="{ minRows: 5, maxRows: 7}"
              placeholder="请输入内容"
              v-model="form.content"
              class="content">
            </el-input>
          </el-form-item>
          <!-- 选择班级 -->
          <el-form-item label="选择班级" prop="chosenClass">
            <el-select v-model="form.chosenClass" filterable placeholder="请选择">
              <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button type="success" round @click="submitNews">发布公告</el-button>
    </div>
  </second-page>
</template>

<script>
import SecondPage from '@/components/content/SecondPage.vue'
import {getAllClass, newNewsSubmit} from '@/network/teacher.js'

export default {
  name: 'TeaMakeNews',
  created() {
    // 发送请求，根据 tno 获得 老师管理的所有班级的 数据结构
    this.tno=sessionStorage.getItem('no')
    getAllClass(this.tno).then(res => {
      this.classOptions=res.data
    })
    // this.classOptions=[{
    //       value: 'cno1',
    //       label: '班级名name1'
    //     }, {
    //       value: 'cno2',
    //       label: '班级名name2'
    //     }, {
    //       value: 'cno3',
    //       label: '班级名name3'
    //     }
    // }]
  },
  data() {
    return {
      tno:0,
      // 表单内容
      form: {
        content: '',
        chosenClass: ''
      },
      // 表单验证规则
      rules: {
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ],
        chosenClass: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ]
      },
      // select 选择器的 班级列表
      classOptions:  [],
    }
  },
  methods: {
    submitNews() {
      // 提交之前进行表单验证
      if(this.form.content === '' || this.form.chosenClass === '') {
        this.$message.error('请填写完必填项');
      } else {
        // 如果验证通过
        // 发送请求给接口，提交数据
        let cname=this.classOptions.filter(item=>item.value===this.form.chosenClass)[0].label
        newNewsSubmit(this.form,this.tno,cname).then(res => {
          if(res.data.status!==200) {
            this.$message.error('公告创建失败，请稍后重新提交');
          } else {
            // 返回到发布公告页面
            this.$message.success('公告已成功创建');
            setTimeout(() => {
              this.$router.replace('/teacher/news')
            }, 1500);            
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
.form {
  margin-top: 30px;
}
.content {
  width: 400px;
}
</style>