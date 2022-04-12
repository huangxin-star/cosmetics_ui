<template>

  <div class="box">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img class="logo" src="../assets/img/loginlogo1.png">
<!--        <img class="go" src="img/go.png">-->

      </div>
      <div class="main-wrap">
        <div class="tab-nav">
          登录<span>LOGIN</span>
        </div>
        <div class="tab-main-box">
          <div class="tab-main">
            <div class="wrap" style="display:block">
              <el-form ref="loginFormRef" :rules="rules" label-width="80px" :model="loging">
              <div class="input-text">
                <div class="tb ren"></div>
                <el-form-item prop="account"  >
                  <el-input   style="margin-top: 22px;margin-left: -73px;width:240px;border: none" v-model="loging.account" placeholder="请输入账号" class="name"></el-input>
                </el-form-item>
              </div>
              <div class="input-text">
                <div class="tb suo"></div>
                <el-form-item  prop="spassword">
                  <el-input style="margin-top: 22px;margin-left: -73px;width:240px" type="password" v-model="loging.spassword" placeholder="请输入密码" class="name" show-password></el-input>
                </el-form-item>
              </div>
              <div class="flex">
                <el-button  class="btn" type="primary" @click.prevent="login" :loading="loading">登 录</el-button>
                <el-button class="btn" @click.prevent="post">注 册</el-button>

              </div>
              </el-form>
<!--              <a href="" class="forget">-->
<!--                忘记密码？-->
<!--              </a>-->
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "userLogin",
  data() {
    return {
      loading:false,
      loging: {
        account: "",
        spassword: "",
        type: "1"
      },
      rules: {
        account: [
          { required: true, message: "请填写账号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 ~ 20 个字符", trigger: "blur" }
        ],
        spassword: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
      localStorage.removeItem("user");
      // console.log(this.loging.category);
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        // 调用get请求
        this.loading = true
        const res = await this.$http.post("login", this.loging);
        console.log(res)
        if (res.data !== 'err') {
          this.$message.success("登录成功！！！");

          if (this.loging.type == "1") {
            localStorage.setItem("user",JSON.stringify(res.data))

            this.$router.push({ path: "/homeuser" });
          }
        } else {
          this.$message.error("账号或密码错误！！！");
        }
        this.loading = false
      });
    },
    post(){
      this.$router.push({path:"post"})
    }
  }
}
</script>

<style scoped>
.name>>>.el-input__inner {
  border: 0;
  height: 58px;
  font-size: 20px;
}
.box{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/backgrand.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  min-width: 1000px;

}

.login-wrap{
  height:420px;
  background-color:rgba(0, 0, 0, 0);
  width:58%;
  min-width: 900px;
  position: relative;
  background-image: url(../assets/img/bg.png);
  margin-bottom: 140px;

}
.main-wrap{
  margin:auto;
  width:480px;
  height: 560px;
  overflow: hidden;
  background: #fff;
  padding:50px;
  box-sizing: border-box;
  box-shadow: 0 0 10px 1px rgba(64, 94, 108, 0.3);
  position: absolute;
  right: 80px;
  top:-60px
}
.login-wrap-left{
  padding: 5.5%;
}
.login-wrap-left .logo{
  width:31%;
  max-width: 290px;

}
.go{
  margin-top:140px;
}
.tab-nav{
  padding-top:20px;
  padding-bottom: 40px;
  color: #5a67d9;
  font-size: 30px;
}
.tab-nav span{
  font-size: 22px;
  padding-left: 6px;
}
.tab-main .wrap{
  width: 100%;
  overflow: hidden;
  display: none;
}




.input-text{
  margin-top:26px;
  display: flex;
  border:#bfbfbf 1px solid;
  height: 58px;
  border-radius: 4px;
  align-items: center;

}

.input-text input{
  flex:1;
  border:none;
  height: 58px;
  line-height: 58px;
  box-sizing: border-box;
  padding-left:10px;
  padding-right: 12px;
  border-radius:0 4px 4px 0;
  font-size: 22px;
  outline: none;
  color: #999999;
}
input[type="checkbox" i] {
  margin: 3px 5px 3px 4px;

}
.input-text .tb{
  width: 34px;
  height: 34px;
  background-repeat: no-repeat;
  margin-left: 12px;
}
.input-text .ren{
  background-image: url(../assets/img/ren.png);
}
.input-text .suo{
  background-image: url(../assets/img/suo.png);
}
.input-text-another{
  border:#5a67d9 1px solid;
}
.input-text-another .ren{
  background-position: bottom;
}
.input-text-another .suo{
  background-position: bottom;
}
.input-text:hover{
  border:#5a67d9 1px solid;
}
.input-text:hover .ren{
  background-position: bottom;
}
.input-text:hover .suo{
  background-position: bottom;
}
.forget{
  width: 100%;
  font-size: 18px;
  color:#999999;
  padding-top: 25px;
  display: block;

}
.flex{
  display: flex;
  justify-content: space-between;
}

.btn{
  width: 48%;
  background-color: #5a67d9;
  text-align: center;
  /*line-height: 58px;*/
  color: #fff;
  font-size: 24px;
  margin-top:30px;
  cursor: pointer;
  height: 58px;
  border-radius: 4px;
  box-shadow: 0 0 10px 1px rgba(64, 94, 108, 0.1);
}
.btn-qs{
  background-color: #bfbfbf;
}

.btn-qs:hover{
  background-color: #b3b3b3;
}
.tab a{
  position: absolute;
  right: 25px;
  top:30px;
  font-size: 16px;
  color:#9c6b33;
}
.forget:hover{
  color: #5a67d9;
}
</style>
