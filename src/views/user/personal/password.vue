<template>
  <div class="core">
    <div class="top">
      <div>修改密码</div>
    </div>
    <div class="bottom">
      <div>
        选择修改密码的方式：
        <el-radio v-model="isActive" :label="true">原密码修改</el-radio>
        <el-radio v-model="isActive" :label="false">邮箱验证修改</el-radio>
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
            <span v-if="!isActive" style="font-size:14px" @click="obtain">&nbsp;&nbsp;&nbsp;&nbsp;获取</span>
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

          <div style="margin-left: 75px;margin-top:50px">
            <el-button @click="onSubmit">修改</el-button>
            <el-button style="margin-left: 35px;" @click="resetForm">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "password",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      isActive: true,
      pass: "",
      newpass: "",
      epass: "",
      enewpass: "",
      code: "",
      ispass: false //验证
    };
  },
  created() {
    this.$http
      .get("user/home/getUserEmail", { params: { id: this.userdata.id } })
      .then(res => {
        this.epass = res.data;
      });
  },
  methods: {
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
            id: this.userdata.id,
            password: this.pass
          })
          .then(res => {
            this.ispass = res.data;
            if (this.ispass) {
              this.$http.post("user/home/setUserPassWore", {
                id: this.userdata.id,
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
      }else{
        if(this.code==''){
          this.$message.error({
            message: "请输入验证码 ！！！",
            duration: 2000
          });
          return;
        }
        if(this.enewpass.length!=6){
          this.$message.error({
            message: "请输入六位新密码 ！！！",
            duration: 2000
          });
          return;
        }
        this.$http.post("hairEmail/setPassWord",{pass:this.enewpass,code:this.code,id:this.userdata.id}).then(res=>{
          if(res.data){
              this.$message.success({
              message: "密码修改成功 ！！！",
              duration: 2000
            });
            return;
          }else{
            this.code=""
            this.$message.error({
                message: "验证码错误请重试 ！！！",
                duration: 2000
              });
          }
          
        })
        
      }
    },
    resetForm() {
      this.pass = "";
      this.newpass = "";
      this.enewpass = "";
      this.code = "";
    },
    obtain(){
      if(this.epass==''){
          this.$message.error({
            message: "请去我的信息中添加邮箱地址 ！！！",
            duration: 2000
          });
          return;
        }
      this.$http.get("hairEmail",{params: {email:this.epass}}).then(res=>{
        this.$message.info({
                message: "验证码已发送 ！！！",
                duration: 2000
              });
      })
      
    }
  },
  watch: {
    isActive() {
      if (!this.isActive && this.epass == "") {
        this.$message.error({
          message: "请去我的信息中添加邮箱地址 ！！！",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped>
.core {
  height: 100%;
  background: #f8f8f8;
}
.top {
  border: 1px solid #e4e4e4;
  height: 9%;
  margin-bottom: 5px;
  background-color: rgb(255, 255, 255);
  padding-left: 15px;
  display: flex;
}
.bottom {
  border: 1px solid #e4e4e4;
  background-color: rgb(255, 255, 255);
  height: 89.5%;
}
.top div:nth-child(1) {
  border-left: 2px solid #ec6c82;
  padding-left: 10px;
  margin: 14px 18px;
}
.bottom > div {
  margin-top: 40px;
  margin-left: 110px;
  font-size: 17px;
}
.xuanz {
  margin-left: 45px;
  margin-top: 33px;
  font-size: 15px;
}
.xuanz > div {
  margin-bottom: 28px;
}
.xuanz > div>span:hover{
  color: #ec6c82;
  cursor: pointer;
}
</style>