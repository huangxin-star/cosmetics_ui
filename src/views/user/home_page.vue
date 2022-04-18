<template>
  <div>
    <div class="to">
      <div class="log">
        <img src="../../assets/img/laonian.jpg" alt />
      </div>
      <div class="to_shoye">
        <div>
          <router-link to="/homeuser/home">首&nbsp;&nbsp; 页</router-link>
        </div>
        <div>
          <router-link to="/homeuser/course">课程中心</router-link>
        </div>
        <div>
          <router-link to="/homeuser/news">新闻中心</router-link>
        </div>
        <div>
          <router-link to="/homeuser/personal/mycourse">我的选课</router-link>
        </div>
      </div>
      <div class="to_ssk">
        <div>
          <!-- v-model="input" @keyup.enter.native="inputclick" -->
<!--          <el-input v-model="input" @keyup.enter.native="inputclick" placeholder="请输入内容">-->
<!--            <i slot="prefix" class="el-input__icon el-icon-search" style="line-height: 35px"></i>-->
<!--          </el-input>-->
        </div>
<!--        <div class="shop-button-item">-->
<!--          <a class="shop-button" @click="tofavorite">-->
<!--            <i class="icon-aixin iconfont"></i>-->
<!--            <sup class="shop-count">{{liketotal}}</sup>-->
<!--            &lt;!&ndash; <router-link to="/homeuser/favorite">-->
<!--              <i class="icon-aixin iconfont"></i>-->
<!--              <sup class="shop-count">{{liketotal}}</sup>-->
<!--            </router-link>&ndash;&gt;-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="shop-button-item">-->
<!--          <a class="shop-button" @click="toshopping">-->
<!--            <i class="el-icon-shopping-bag-1" style="font-size: 29px;"></i>-->
<!--            <sup class="shop-count">{{shoppingtotal}}</sup>-->
<!--          </a>-->
<!--        </div>-->
        <div class="toxiang">
          <el-dropdown>
            <span class="el-dropdown-link">{{toxiangdata}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="personal "
                class="grzx"
                style="width: 100px;text-align: center;"
              >个人中心</el-dropdown-item>
              <el-dropdown-item
                @click.native="signout"
                style="width: 100px;text-align: center;"
              >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="rou">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toxiangdata: "",
      liketotal: 0,
      shoppingtotal:0,
      input:""
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));    //获得user用户信息
    this.toxiangdata = user.sname;
  //   this.$http.post("likecollectiontotal", user).then(res => {
  //     this.liketotal = res.data;
  //   });
  //   this.$http.post("user/home/shoppingcarttotal", user).then(res => {
  //     this.shoppingtotal=res.data;
  //   });
  },
  methods: {
    inputclick(){
      this.$http.get("getHomeSearch",{params: { input:this.input }}).then(res=>{
        if(res.data=="err"){
          this.$message.info("找不到“"+this.input+"”改名字的商品！！！");
          this.input=""
          return;
        }else{
          this.input=""
          this.$router.push({ name: 'alone',params: {res:res.data}})
        }

      })

    },
    // tofavorite() {
    //   this.$router.push({ path: "/homeuser/favorite" });
    // },
    // toshopping() {
    //   this.$router.push({ path: "/homeuser/shopping" });
    // },
    signout() {
      let is = confirm(
        JSON.parse(localStorage.getItem("user")).account +
          "  用户确认要退出吗！！！！"
      );
      if (is) {
        // this.$http.post(
        //   "setFalseUserState",
        //   JSON.parse(localStorage.getItem("user"))
        // );
        localStorage.removeItem("user");
        this.$message.success({
          message: "退出成功",
          duration: 1000
        });
        this.$router.push({ path: "/userlogin" });
      }
    },
    personal() {
      this.$router.push({path:"/homeuser/personal"})
    }
  }
};
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
a{
  color: #1d1d1d;
  text-decoration: none;
}
.log {
  margin: 10px;
}
.log img{
  width: 135px;
}
.to {
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 5;
  left: 0;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #ebebeb;
  position: fixed;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
}
.rou {
  margin-top: 88px;
}
.to_shoye {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -40%;
}
.to_shoye div a {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.1;
  padding: 0 55px 0 0;
  text-transform: capitalize;
}
.router-link-active {
  color: rgb(236, 107, 129);
}
.to_ssk {
  display: flex;
  align-items: center;
}
@font-face {
  font-family: "iconfont"; /* Project id 2909663 */
  src: url("//at.alicdn.com/t/font_2909663_eamz0tznze.woff2?t=1635840294956")
      format("woff2"),
    url("//at.alicdn.com/t/font_2909663_eamz0tznze.woff?t=1635840294956")
      format("woff"),
    url("//at.alicdn.com/t/font_2909663_eamz0tznze.ttf?t=1635840294956")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-aixin:before {
  content: "\e619";
}
.shop-button i {
  color: #0f0f0f;
  font-size: 28px;
  transition: 0.5s;
}
.shop-button i:hover {
  color: #ec6b81;
}
.shop-button-item .shop-button .shop-count {
  background-color: #ec6b81;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  width: 22px;
  height: 22px;
  padding-top: 0;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
  position: relative;
  left: -9px;
  top: 10px;
  box-sizing: border-box;
}
.el-input {
  margin-right: 50px;
}
.toxiang {
  margin-right: 20px;
}
.el-dropdown-link {
  margin-left: 10px;
  font-size: 23px;
  cursor: pointer;
  color: #1d1d1d;
}
ul .el-dropdown-menu__item:hover {
  color: #ffffff;
  background-color: #ec6b81;
}
</style>
