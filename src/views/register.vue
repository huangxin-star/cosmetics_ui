<template>

  <div class="box">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img class="logo" src="../assets/img/loginlogo1.png">
        <!--        <img class="go" src="img/go.png">-->

      </div>
      <div class="main-wrap">
        <div class="tab-nav">
          注册<span>REGISTER</span>
        </div>
        <div class="tab-main-box">
          <div class="tab-main">
            <div class="wrap" style="display:block">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item  label="用户账号" prop="account">
                      <el-input v-model="form.account" placeholder="请输入用户账号" maxlength="30" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item v-if="isadd==true " label="用户密码" prop="spassword">
                      <el-input v-model="form.spassword" placeholder="请输入用户密码" type="password" maxlength="20" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="用户姓名" prop="sname">
                      <el-input v-model="form.sname" placeholder="请输入用户姓名" maxlength="30" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户性别">
                      <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option
                            v-for="item in sexoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号码" prop="stel">
                      <el-input v-model="form.stel" placeholder="请输入手机号码" maxlength="11" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="紧急电话" prop="emergency_call">
                      <el-input v-model="form.emergency_call" placeholder="请输入紧急联系电话" maxlength="50" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-form-item label="出生日期">
                    <el-col :span="12">
                      <el-form-item prop="birthday" style="width: 220px;">
                        <el-date-picker
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            v-model="form.birthday"
                            style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>


                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="地址">
                      <el-input v-model="form.address" type="textarea" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "register",
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
    },
    goLogin() {
      this.$router.push({path:"userLogin"})
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

