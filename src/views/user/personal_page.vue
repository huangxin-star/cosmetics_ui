<template>
  <div style="background: #f8f8f8">
    <div class="personal">
      <div class="personal_left">
        <div class="personal_left_top">
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
          <div class="user">
<!--            <span>用户：{{userdata.username}}</span>-->
          </div>
        </div>
        <div class="personal_left_bottm">
          <div>个人中心</div>
          <div>
            <router-link to="/homeuser/personal/core">我的信息</router-link>
          </div>
<!--          <div>-->
<!--            <router-link to="/homeuser/personal/address">地址管理</router-link>-->
<!--          </div>-->
          <div>
            <router-link to="/homeuser/personal/iorder">我的订单</router-link>
          </div>
          <div>
            <router-link to="/homeuser/personal/iorder">我的选课</router-link>
          </div>
<!--          <div @click="tofavorite">我的收藏</div>-->
<!--          <div @click="toshopping">购物车</div>-->
          <div>
            <router-link to="/homeuser/personal/password">修改密码</router-link>
          </div>
          <div @click="signout">退出登录</div>
        </div>
      </div>
      <div class="personal_right">
        <router-view></router-view>
      </div>
    </div>
    <div class="wei"></div>
  </div>
</template>

<script>
export default {
  name: "personal_page",

  data() {
    return {
      imageUrl: "",
      imgaction: "",
      userdata: JSON.parse(localStorage.getItem("user")),
      loading:false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = file.name
      console.log(file.name);
      console.log(this.imageUrl);
      this.loading=false
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
      this.loading=true
      return isJPG && isLt2M;
    },
    signout() {
      let is = confirm(
        JSON.parse(localStorage.getItem("user")).username +
          "  用户确认要退出吗！！！！"
      );
      if (is) {
        this.$http.post(
          "setFalseUserState",
          JSON.parse(localStorage.getItem("user"))
        );
        localStorage.removeItem("user");
        this.$message.success({
          message: "退出成功",
          duration: 1000
        });
        this.$router.push({ path: "/login" });
      }
    },
    tofavorite() {
      this.$router.push({ path: "/homeuser/favorite" });
    },
    toshopping() {
      this.$router.push({ path: "/homeuser/shopping" });
    }
  },
  created() {
    this.imgaction =
      "http://localhost:9000/user/home/addimghead?id=" + this.userdata.id;
    this.$http
      .post("user/home/getimghead", { id: this.userdata.id })
      .then(res => {
        if (res.data == "") {
          return;
        }

        this.imageUrl = res.data;
      });
  }
};
</script>

<style scopde>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: #757575;
}
.router-link-active {
  color: rgb(236, 107, 129);
}
.avatar-uploader {
  text-align: center;
  padding-top: 10px;
}
.user {
  margin-top: 10px;
  text-align: center;
  font-size: 17px;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
}
.user span {
  padding-bottom: 10px;
}
.user:hover span {
  border-bottom: 1px solid #ec6c82;
  color: #ec6c82;
}
.avatar-uploader .el-upload {
  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
.avatar-uploader .el-upload:hover {
  border-color: #ec6c82;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 68px;
  height: 68px;
  line-height: 68px;
  text-align: center;
}
.avatar {
  width: 68px;
  height: 68px;
  display: block;
  border-radius: 50%;
}
.personal {
  display: flex;
  width: 75%;
  height: 600px;
  font-family: "微软雅黑", "arial";
  color: #262626;
  margin: 0 auto;
  box-sizing: border-box;
}
.personal_left {
  width: 23%;
  margin-right: 10px;
  margin-top: 3%;
}
.personal_left_top {
  border: 1px solid #e4e4e4;
  height: 25%;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
}
.personal_left_bottm {
  border: 1px solid #e4e4e4;
  height: 400px;
  background-color: rgb(255, 255, 255);
  text-align: left;
  padding-left: 35%;
}
.personal_left_bottm div {
  cursor: pointer;
  margin-top: 25px;
  font-size: 14px;
  color: #757575;
}
.personal_left_bottm > div:nth-child(1) {
  font-weight: 600;
  font-size: 16px;
  color: #262626;
}

.personal_right {
  margin-top: 3%;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 553px;
}
.wei {
  width: 100%;
  height: 150px;
}
</style>
