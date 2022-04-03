<template>
  <div class="zuiwai">
    <section>
      <form action>
        <p>后&nbsp;&nbsp;台&nbsp;&nbsp;登&nbsp;&nbsp;录</p>
        <input v-model="user" type="text" placeholder="账号" />
        <input v-model="pass" type="password" placeholder="密码" />
        <button @click.prevent="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
        user: "",
        pass: "",
    }
  },
  methods: {
     login() {
       this.$http.post("login",{username:this.user,password:this.pass,role:"管理员"}).then(res=>{
          if (res.data.flag == "ok") {
            this.$message.success("登录成功！！！");
              localStorage.setItem("admin",JSON.stringify(res.data.user))
              this.$http.post("setTrueUserState",JSON.parse(localStorage.getItem("admin")))
              this.$router.push({ path: "/adminhome" });
          } else {
            this.$message.error("账号或密码错误！！！");
          }
       })
        
        
    
    }
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.zuiwai {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  height: 100%;
  font-family: sans-serif;
  overflow-x: hidden;
}
section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    94.3deg,
    rgba(26, 33, 64, 1) 10.9%,
    rgba(81, 84, 115, 1) 87.1%
  );

}
section::before{
  position: absolute;
  content: "";
  z-index: 2;
  width: 450px;
  height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-100%,-80%);
  background-color: #FFE53B;
  background-image: linear-gradient(147deg,#FFE53B 0%,#FF2525 74%);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255,255,255,0.2);
  animation: pulse 1.5s infinite;
}
section::after{
  position: absolute;
  content: "";
  z-index: 2;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(10%,20%);
  background-color: #FA8BFF;
  background-image: linear-gradient(45deg,#FA8BFF 0%,#2BD2FF 52%,#2BFF88 90%);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255,255,255,0.2);
  animation: pulse 1.6s infinite;
}
@keyframes pulse{
  50%{
    box-shadow: 0 0 0 50px rgba(255,255,255,0);

  }
  100%{
    box-shadow: 0 0 0 0 rgba(255,255,255,0);
  }
}
form{
  top:-30px;
  position: relative;
  z-index: 3;
  width: 320px;
  background-color: rgba(255,255,255,.1);
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
  border: 1px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(20px);
}
form p{
  color: #fff;
  display: block;
  text-align: center;
  margin: 0 0 30px 0;
  font-size: 23px;
}
input{
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid rgba(255,255,255,.5);
  margin-bottom: 15px;
  padding-left: 15px;
  color: #fff;
  outline: none;
}
input::placeholder{
  color: #fff;
}
button{
  width: 100%;
  height: 50px;
  border: 0;
  /* background: aquamarine; */
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  /* background-image: linear-gradient(to right,#02AAB0 0%,#00CDAC 51%，#02AAB0 100%); */
  background-size: 200% auto;
  border-radius: 8px;
  color: #fff;
  outline: none;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0,0,0,.1);
  transition: ease .4s;
  font-size: 17px;
}
button:hover{
  background-position: right center;
  color:#fff;
  text-decoration: none;
}
</style>






 
