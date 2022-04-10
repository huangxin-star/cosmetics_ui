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
<!--      <el-row >-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="学制" prop="system">-->
<!--            <el-select v-model="formData.system" placeholder="请选择学制" clearable :style="{width: '100%'}">-->
<!--              <el-option v-for="(item, index) in systemOptions" :key="index" :label="item.label"-->
<!--                         :value="item.value" :disabled="item.disabled"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row >
        <el-col :span="12">
          <el-form-item label="任课教师" prop="tid">
            <el-select v-model="formData.tid" placeholder="请选择任课教师" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in tnameOptions" :key="index" :label="item.sname"
                         :value="item.sid" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上课教室" prop="locationid">
            <el-select v-model="formData.locationid" placeholder="请选择上课教室" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in room_nameOptions" :key="index" :label="item.room_name"
                         :value="item.id" :disabled="item.disabled"></el-option>
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
          <el-form-item label="上传图片" prop="iamge" required>
            <el-upload ref="iamge" :file-list="field115fileList" :action="field115Action" v-loading.fullscreen="loading"
                       :before-upload="field115BeforeUpload" :on-success="handleAvatarSuccess" list-type="picture" accept="image/*">
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
      loading:false,
      formData: {
        cname: '',
        fees: '',
        system: '',
        tname: '',
        tid:'',
        room_name: '',
        locationid:'',
        school_time: '',
        status: '',
        min_number: 5,
        max_number: 20,
        cdescription: '',
        examined_content: '',
        iamge: '',
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
        tid: [{
          required: true,
          message: '请选择任课教师',
          trigger: 'change'
        }],
        locationid: [{
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
      field115Action: 'http://localhost:9000/admin/productCourseIamge',
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
      tnameOptions: [],//教师
      room_nameOptions: [],//教室
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
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "课程管理 / 新增课程";
    // tnameOptions
    this.$http.get("getTeacherAndClassroom" ).then(res => {
      console.log(res)
      this.tnameOptions = res.data[0]
      this.room_nameOptions = res.data[1]
          // if (res.data != "err") {
          //   this.tableData = res.data.list;
          //   this.count = res.data.count;
          //
          // }else {
          //   this.$message.warning('找不到该新闻')
          // }

        }).catch((err) => {
      console.error(err)
    });
  },
  mounted() {},
  methods: {
    submitForm() {
      console.log(this.formData)
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          this.$http.post("admin/setCourse", this.formData).then(res => {
            if (res.data == "img") {
              this.$message.info({
                message: "请上传图片 谢谢！！！",
                duration: 1500
              });
              return;
            }else{
              this.$message.success({
                message: "新增新闻成功！！！",
                duration: 1500
              });
            }
            this.resetForm()
            this.formData.iamge=false
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    handleAvatarSuccess(res, file) {
      this.loading=false
      this.formData.iamge = URL.createObjectURL(file.raw);
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
      this.loading=true
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
