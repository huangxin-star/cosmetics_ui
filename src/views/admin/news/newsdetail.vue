<template>
  <div class="outside">
    <div class="title">新增新闻</div>
    <div>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input style="width:400px" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="新闻类别" prop="ntype" @change="change1">
              <el-select v-model="ruleForm.ntype" placeholder="请选择新闻类别">
                <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item label="新闻图片">
          <el-upload
              v-loading.fullscreen="loading"
              class="avatar-uploader"
              action="http://localhost:9000/admin/productNewImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.newsimg" :src="ruleForm.newsimg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <template>
            <div class="quill-wrap">
              <quill-editor ref="myQuillEditor" v-model="ruleForm.content" :options="editorOption" />
            </div>
          </template>
        </el-form-item>
<!--        <el-form-item label="新闻内容" prop="introduce">-->
<!--          <el-input type="textarea" v-model="ruleForm.introduce"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">增加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: "newsdetail",
  components: { quillEditor },
  data() {
    return {
      loading:false,
      ruleForm: {
        title: "", //标题
        ntype: '', //类别0未发布

        newsimg: "",
        content:'',
        nstatus: "未发布",
        ntime:new Date().getTime()
      },
      company: [],
      category: [{
        value: 1,
        label: '新闻动态'
      }, {
        value: 2,
        label: '作品展示'
      },
        {
          value: 3,
          label: '通知公告'
        }, {
          value: 4,
          label: '学习资料'
        }],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, message: "请输入3个字符以上的名称", trigger: "blur" }
        ],
        ntype: [
          { required: true, message: "请选择类别", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        // introduce: [
        //   { required: true, message: "请填写商品介绍", trigger: "blur" },
        // ],
      },
      editorOption: { // 富文本框参数设置
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            action: 'http://127.0.0.1:9000/admin/productImg',
            response: (res) => {
              return `http://127.0.0.1:9000/public/uploadfile/${res.data.filename}`
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    };
  },
  methods: {
    change1(val) {
      console.log(val)
    },
    submitForm(ruleForm) {
      console.log(this.ruleForm)
      this.$refs[ruleForm].validate(valid => {
        if (valid) {

          this.$http.post("admin/setNews", this.ruleForm).then(res => {
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
            this.resetForm('ruleForm')
            this.ruleForm.newsimg=false
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.loading=false
      this.ruleForm.newsimg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.loading=true
      return isJPG && isLt2M;
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "护肤品 / 发布新商品";
  }
};
</script>

<style scoped>

.outside {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 96.6%;
  height: 750px;
  border: 1px solid #ebeef5;
  padding: 20px;
  position: relative;
}
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
}
.title:before {
  content: "";
  width: 24px;
  height: 16px;
  border-left: 3px solid #ec6c82;
  margin-right: 20px;
}
.outside > div:nth-child(2) {
  margin-top: 3rem;
  width: 50%;
}
</style>
<style >
.ql-container {
  min-height: 150px;
}
.quill-editor {
  width: 650px;
}
.outside .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.outside .avatar-uploader .el-upload:hover {
  border-color: #ec6c82;
}
.outside .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.outside .avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
