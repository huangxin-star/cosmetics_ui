<template>
  <div class="outside">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改信息" name="first">
        <div class="info-container">
          <el-upload
            v-loading.fullscreen="loading"
            name="head"
            class="avatar-uploader"
            :action="imgaction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form label-width="70px" :model="infoForm" style="width: 320px; margin-left: 3rem;">
            <el-form-item label="姓名" prop="pname">
              <el-input size="small" v-model="infoForm.pname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="pgender">
              <el-radio-group v-model="infoForm.pgender" size="small">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
              <el-col>
                <el-form-item prop="pbirth">
                  <el-date-picker
                    style="width: 250px;"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="infoForm.pbirth"
                    size="small"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="地区" prop="pregion">
              <el-select
                style="width:250px;"
                size="small"
                v-model="infoForm.pregion"
                placeholder="账号地区"
              >
                <el-option label="中国" value="中国"></el-option>
                <el-option label="美国" value="美国"></el-option>
                <el-option label="德国" value="德国"></el-option>
                <el-option label="日本" value="日本"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="邮箱" prop="name">
              <el-input size="small" v-model="infoForm.mailbox"></el-input>
            </el-form-item>
            <el-button
              @click="updateInfo"
              type="primary"
              size="small"
              style="margin-left: 4.375rem"
            >修改</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <div style="display:flex;flex-direction:column;justify-content: center;margin-top: 3rem">
          <div style="text-align: center;">
            选择修改密码的方式：
            <el-radio v-model="isActive" :label="true">原密码修改</el-radio>
            <el-radio v-model="isActive" :label="false">邮箱验证修改</el-radio>
          </div>
          <div class="xuanz">
            <div>
              原密码：
              <el-input
                :disabled="!isActive"
                style="width: 200px;"
                v-model="pass"
                placeholder="请输入原密码"
                show-password
              ></el-input>
            </div>
            <div>
              新密码：
              <el-input
                prop="newpass"
                :disabled="!isActive"
                style="width: 200px;"
                v-model="newpass"
                placeholder="请输入六位新密码"
                show-password
              ></el-input>
            </div>
            <div style="margin-left: 16px;">
              邮箱：
              <el-input disabled style="width: 200px;" v-model="epass" placeholder="请输入邮箱"></el-input>
              <el-input
                :disabled="isActive"
                style="width: 100px;margin-left: 18px;"
                v-model="code"
                placeholder="验证码"
              ></el-input>
              <span
                v-if="!isActive"
                style="font-size:14px"
                @click="obtain"
              >&nbsp;&nbsp;&nbsp;&nbsp;获取</span>
            </div>
            <div>
              新密码：
              <el-input
                :disabled="isActive"
                style="width: 200px;"
                v-model="enewpass"
                placeholder="请输入六位新密码"
                show-password
              ></el-input>
            </div>

            <div style="margin-left: 75px;margin-top:30px">
              <el-button @click="onSubmit">修改</el-button>
              <el-button style="margin-left: 35px;" @click="resetForm">重置</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "personal_page",
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      loading: false,
      activeName: "first",
      imgaction: "",
      imageUrl: "",
      infoForm: {},
      //密码
      isActive: true,
      pass: "",
      newpass: "",
      epass: "",
      enewpass: "",
      code: "",
      ispass: false //验证
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = file.name
      // console.log(file.name);
      console.log("ssss"+this.imageUrl);
      this.$parent.$parent.$parent.$parent.imageUrl=this.imageUrl
      this.loading = false;
      this.$message.success({ message: "头像上传成功", duration: 1200 });
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
      this.loading = true;
      return isJPG && isLt2M;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    updateInfo() {
      this.$http.post("admin/setAdminData", this.infoForm).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "修改信息成功！！！",
            duration: 1500
          });
        } else {
          this.$message.error({
            message: "修改失败！！！",
            duration: 1500
          });
        }
      });
    },
    obtain() {
      if (this.epass == "") {
        this.$message.error({
          message: "请去个人中心中修改邮箱地址 ！！！",
          duration: 2000
        });
        return;
      }
      this.$http
        .get("hairEmail", { params: { email: this.epass } })
        .then(res => {
          this.$message.info({
            message: "验证码已发送 ！！！",
            duration: 2000
          });
        });
    },
    onSubmit() {
      if (this.isActive) {
        if (this.pass == "") {
          this.$message.error({
            message: "请输入原密码 ！！！",
            duration: 2000
          });
          return;
        }
        if (this.newpass.length != 6) {
          this.$message.error({
            message: "新密码长度需要六位 ！！！",
            duration: 2000
          });
          return;
        }
        this.$http
          .post("user/home/isUserPassWore", {
            id: this.admin.id,
            password: this.pass
          })
          .then(res => {
            this.ispass = res.data;
            if (this.ispass) {
              this.$http.post("user/home/setUserPassWore", {
                id: this.admin.id,
                password: this.newpass
              });
              this.$message.success({
                message: "修改成功 ！！！",
                duration: 2000
              });
            } else {
              this.$message.error({
                message: "原密码错误 ！！！",
                duration: 2000
              });
            }
          });
      } else {
        if (this.code == "") {
          this.$message.error({
            message: "请输入验证码 ！！！",
            duration: 2000
          });
          return;
        }
        if (this.enewpass.length != 6) {
          this.$message.error({
            message: "请输入六位新密码 ！！！",
            duration: 2000
          });
          return;
        }
        this.$http
          .post("hairEmail/setPassWord", {
            pass: this.enewpass,
            code: this.code,
            id: this.admin.id
          })
          .then(res => {
            if (res.data) {
              this.$message.success({
                message: "密码修改成功 ！！！",
                duration: 2000
              });
              return;
            } else {
              this.code = "";
              this.$message.error({
                message: "验证码错误请重试 ！！！",
                duration: 2000
              });
            }
          });
      }
    },
    resetForm() {
      this.pass = "";
      this.newpass = "";
      this.enewpass = "";
      this.code = "";
    }
  },
  watch: {
    isActive() {
      if (!this.isActive && this.epass == "") {
        this.$message.error({
          message: "请去个人中心修改信息 ！！！",
          duration: 2000
        });
      }
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "个人中心";
    this.imgaction =
      "http://localhost:9000/user/home/addimghead?id=" + this.admin.id;
    this.$http.post("user/home/getimghead", { id: this.admin.id }).then(res => {
      if (res.data == "") {
        return;
      }
      this.imageUrl = res.data;
    });
    this.$http
      .get("admin/getAdminData", { params: { id: this.admin.id } })
      .then(res => {
        this.infoForm = res.data.per;
        this.epass = res.data.per.mailbox;
      });
  }
};
</script>

<style scoped>
.outside {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 96.6%;
  height: 600px;
  border: 1px solid #ebeef5;
  padding: 20px;
  position: relative;
}
.info-container {
  display: flex;
  align-items: center;
  margin-left: 20%;
  margin-top: 3rem;
}
.xuanz {
  margin: 33px auto;
  font-size: 15px;
}
.xuanz > div {
  margin-bottom: 28px;
}
.xuanz > div > span:hover {
  color: #ec6c82;
  cursor: pointer;
}
</style>
<style >
.info-container .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: -100px;
}
.info-container .avatar-uploader .el-upload:hover {
  border-color: #ec6c82;
}
.info-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 118px;
  height: 118px;
  line-height: 118px;
  text-align: center;
}
.info-container .avatar {
  width: 118px;
  height: 118px;
  display: block;
}
</style>