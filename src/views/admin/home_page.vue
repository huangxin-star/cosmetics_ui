<template>
  <el-container style="height: 100%;">
    <el-header style="height: 70px;">
      <div class="sidebar-header">
        <img src="https://lookcartoon.oss-cn-beijing.aliyuncs.com/logo-sidebar.png" alt />
      </div>

      <div class="to">
        <div class="lyear-aside">
          <div class="lyear-aside-toggler">
            <span class="lyear-toggler-bar"></span>
            <span class="lyear-toggler-bar"></span>
            <span class="lyear-toggler-bar"></span>
          </div>
          <span style="font-size: 16px;">{{titledata}}</span>
        </div>

        <div class="tox">
          <div>
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
          </div>
          <div class="cai">
            <el-dropdown>
              <span class="el-dropdown-link" style="cursor: pointer;">
                管理员
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toPersonal">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="signout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 250px;">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/adminhome/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/adminhome/one_one">用户管理</el-menu-item>
            <el-menu-item index="/adminhome/one_two">教师管理</el-menu-item>
          </el-submenu>

<!--          <el-submenu index="two">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-goods"></i>-->
<!--              <span>护肤品</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/adminhome/two_one">发布新商品</el-menu-item>-->
<!--            <el-menu-item index="/adminhome/two_two">商品列表</el-menu-item>-->
<!--            <el-menu-item index="/adminhome/two_three">类别管理</el-menu-item>-->
<!--          </el-submenu>-->

<!--          <el-submenu index="3">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-user"></i>-->
<!--              <span>订单</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/adminhome/three_one">订单管理</el-menu-item>-->
<!--            &lt;!&ndash; <el-menu-item index="3-2">商家管理</el-menu-item> &ndash;&gt;-->
<!--          </el-submenu>-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>新闻信息管理</span>
            </template>
            <el-menu-item index="/adminhome/newsdetail">新增新闻信息</el-menu-item>
            <el-menu-item index="/adminhome/newsList">新闻信息列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>课程管理</span>
            </template>
            <el-menu-item index="/adminhome/coursedetail">新增课程</el-menu-item>
            <el-menu-item index="/adminhome/courseList">课程列表</el-menu-item>
            <el-menu-item index="/adminhome/selection">选课管理</el-menu-item>
            <el-menu-item index="/adminhome/classroom">教室管理</el-menu-item>
          </el-submenu>
<!--          <el-menu-item index="present_page">-->
<!--            <i class="el-icon-present"></i>-->
<!--            <span slot="title">心愿单</span>-->
<!--          </el-menu-item>-->
          <el-menu-item index="personal_page">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      admin: JSON.parse(localStorage.getItem("admin")),
      imageUrl: "",
      imgaction: "",
      titledata:"后台首页",
      loading:false,
    };
  },
  created() {
    this.imgaction =
      "http://localhost:9000/user/home/addimghead?id=" + this.admin.id;
    this.$http.post("user/home/getimghead", { id: this.admin.id }).then(res => {
      if (res.data == "") {
        return;
      }
      this.imageUrl = res.data;
    });
  },
  methods: {
    signout() {
      let is = confirm(
        JSON.parse(localStorage.getItem("admin")).username +
          "  管理员确认要退出吗！！！！"
      );
      if (is) {
        this.$http.post(
          "setFalseUserState",
          JSON.parse(localStorage.getItem("admin"))
        );
        localStorage.removeItem("admin");
        this.$message.success({
          message: "退出成功",
          duration: 1000
        });
        this.$router.push({ path: "/loginadmin" });
      }
    },
    handleAvatarSuccess(res, file) {
      this.loading=false
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = file.name
      console.log(file.name);
      console.log(this.imageUrl);

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
    toPersonal(){
      this.$router.push({ path: "/adminhome/personal_page" });
    }
  }
};
</script>

<style scoped>
.avatar-uploader {
  text-align: center;
  padding-top: 6px;
  padding-right: 10px;
  margin: auto auto;
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
  width: 58px;
  height: 58px;
  line-height: 58px;
  text-align: center;
}
.avatar {
  width: 58px;
  height: 58px;
  display: block;
  border-radius: 50%;
}
.el-header {
  background-color: rgb(255, 255, 255);
  display: flex;
  padding: 0;
}
.el-main {
  background-color: rgb(247,249,251);
}
.sidebar-header {
  height: 60px;
  width: 250px;
}
.sidebar-header img {
  margin: 16px;
}
.el-menu {
  border: 0;
}
.to {
  height: 63px;
  width: 100%;
  line-height: 63px;
  display: flex;
  justify-content: space-between;
}
.lyear-aside {
  display: flex;
  align-items: center;
}
.lyear-aside-toggler {
  margin-right: 0.25rem;
  padding: 0.25rem 0.95rem 0.25rem 0.25rem;
}
.lyear-toggler-bar {
  display: block;
  height: 2px;
  width: 20px;
  background-color: #4d5259;
  margin: 4px 0px;
}
.lyear-toggler-bar:nth-child(2) {
  width: 15px;
}
.tox {
  display: flex;
}
.tox>.cai {
  margin-right: 20px;
}
/* .tox > div:first-child {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: rgb(245, 245, 245);
  margin: 6px 20px;
  font-size: 15px;
} */
/* .tox > div:first-child span {
  position: absolute;
  left: 10px;
  top: -4px;
  color: rgb(98, 103, 111);
} */

</style>
