<template>
  <div class="outside">
    <el-form ref="elForm" :model="formData" :rules="rules" class="form" size="medium" label-width="100px" >
      <el-row >
        <el-col :span="12">
          <el-form-item label="课程名" prop="cname">
            <el-input v-model="formData.cname" placeholder="请输入课程名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用" prop="fees">
            <el-input v-model="formData.fees" placeholder="请输入费用" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="学制" prop="system">
            <el-select v-model="formData.system" placeholder="请选择学制" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in systemOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="任课教师" prop="tname">
            <el-select v-model="formData.tname" placeholder="请选择任课教师" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in tnameOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上课教室" prop="room_name">
            <el-select v-model="formData.room_name" placeholder="请选择上课教室" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in room_nameOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="上课时间" prop="school_time">
            <el-select v-model="formData.school_time" placeholder="请选择上课时间" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in school_timeOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程状态" prop="status">
            <el-select v-model="formData.status" placeholder="请输入课程状态" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="开课人数" prop="min_number">
            <el-input v-model="formData.min_number" placeholder="请输入开课人数" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="满员人数" prop="max_number">
            <el-input v-model="formData.max_number" placeholder="请输入满员人数" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="课程描述" prop="cdescription">
            <el-input v-model="formData.cdescription" type="textarea" placeholder="请输入课程描述"
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考核内容" prop="examined_content">
            <el-input v-model="formData.examined_content" type="textarea" placeholder="请输入考核内容"
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="上传图片" prop="field115" required>
            <el-upload ref="field115" :file-list="field115fileList" :action="field115Action"
                       :before-upload="field115BeforeUpload" list-type="picture" accept="image/*">
              <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  name:'coursedetail',
  data() {
    return {
      formData: {
        cname: '',
        fees: '',
        system: '',
        tname: '',
        room_name: '',
        school_time: '',
        status: '',
        min_number: 5,
        max_number: 20,
        cdescription: '',
        examined_content: '',
        field115: '',
      },
      rules: {
        cname: [{
          required: true,
          message: '请输入课程名',
          trigger: 'blur'
        }],
        fees: [{
          required: true,
          message: '请输入费用',
          trigger: 'blur'
        }],
        system: [{
          required: true,
          message: '请至少选择一个学制',
          trigger: 'change'
        }],
        tname: [{
          required: true,
          message: '请选择任课教师',
          trigger: 'change'
        }],
        room_name: [{
          required: true,
          message: '请选择上课教室',
          trigger: 'change'
        }],
        school_time: [{
          required: true,
          message: '请选择上课时间',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '请输入课程状态',
          trigger: 'change'
        }],
        min_number: [{
          required: true,
          message: '请输入开课人数',
          trigger: 'blur'
        }],
        max_number: [{
          required: true,
          message: '请输入满员人数',
          trigger: 'blur'
        }],
        cdescription: [{
          required: true,
          message: '请输入课程描述',
          trigger: 'blur'
        }],
        examined_content: [{
          required: true,
          message: '请输入考核内容',
          trigger: 'blur'
        }],
      },
      field115Action: 'https://jsonplaceholder.typicode.com/posts/',
      field115fileList: [],
      systemOptions: [{
        "label": "一学年",
        "value": 1,
        // "children": [{
        //   "label": "一学年",
        //   "value": 0,
        //   "id": 105
        // }]
      }, {
        "label": "三学年",
        "value": 2,
        // "children": [{
        //   "label": "初级",
        //   "value": 2,
        //   "id": 102
        // }, {
        //   "label": "中级",
        //   "value": 3,
        //   "id": 103
        // }, {
        //   "label": "高级",
        //   "value": 4,
        //   "id": 104
        // }]
      }],
      tnameOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      room_nameOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      school_timeOptions: [{
        "label": "周一上午",
        "value": 1
      }, {
        "label": "周一下午",
        "value": 2
      }, {
        "label": "周二上午",
        "value": 3
      }, {
        "label": "周二下午",
        "value": 4
      }, {
        "label": "周三上午",
        "value": 5
      }, {
        "label": "周三下午",
        "value": 6
      }, {
        "label": "周四上午",
        "value": 7
      }, {
        "label": "周四下午",
        "value": 8
      }, {
        "label": "周五上午",
        "value": 9
      }, {
        "label": "周五下午",
        "value": 10
      }],
      statusOptions: [{
        "label": "未发布",
        "value": 1
      }, {
        "label": "已发布",
        "value": 2
      }, {
        "label": "已撤回",
        "value": 3
      }, {
        "label": "已开课",
        "value": 4
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      console.log(this.formData)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field115BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
  }
}

</script>
<style>
.outside {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 96.6%;
  height: 750px;
  border: 1px solid #ebeef5;
  padding: 20px;
  position: relative;
}
.form {
  width: 50%;
}
.el-upload__tip {
  line-height: 1.2;
}

</style>
