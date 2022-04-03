<template>
  <div class="core">
    <div class="top">
      <div>个人资料</div>
      <div>
        <span @click="toisActive">修改</span>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_text">
        <div>
          <span>昵称：</span>
          <span>{{userdata.username}}</span>
        </div>
        <div>
          <span>真实姓名：</span>
          <span>{{userlist.pname}}</span>
        </div>
        <div>
          <span>性别：</span>
          <span>{{userlist.pgender}}</span>
        </div>
        <div>
          <span>生日：</span>
          <span>{{userlist.pbirth}}</span>
        </div>
        <div>
          <span>账号地区：</span>
          <span>{{userlist.pregion}}</span>
        </div>
        <div>
          <span>个人邮箱：</span>
          <span>{{userlist.mailbox}}</span>
        </div>
      </div>
    </div>

    <div class="modify" v-if="isActive">
      <div>
        <div class="elicon" @click="toisActive">
          <i class="el-icon-close"></i>
        </div>
        <div class="bianji">编辑资料</div>
        <div class="kuan">
          <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="pname">
              <el-input style="width: 220px;" v-model="ruleForm.pname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="pgender">
              <el-radio-group v-model="ruleForm.pgender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
              <el-col :span="11">
                <el-form-item prop="pbirth" style="width: 220px;">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.pbirth"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="账号地区" prop="pregion">
              <el-select v-model="ruleForm.pregion" placeholder="账号地区">
                <el-option label="中国" value="中国"></el-option>
                <el-option label="美国" value="美国"></el-option>
                <el-option label="德国" value="德国"></el-option>
                <el-option label="日本" value="日本"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="个人邮箱" prop="name">
              <el-input style="width: 220px;" v-model="ruleForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
              <el-button style="margin-left: 35px;" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personal_core",
  data() {
    return {
      value1: "",
      userlist: {},
      userdata: JSON.parse(localStorage.getItem("user")),
      isActive: false,
      ruleForm: {
        pname: "",
        pgender: "",
        pbirth: "",
        pregion: "",
        mailbox: ""
      }
    };
  },
  created() {
    this.$http
      .post("user/home/getUserPersonal", { id: this.userdata.id })
      .then(res => {
        this.userlist = res.data;
        this.ruleForm= res.data;
      });
  },
 
  methods: {
    toisActive() {
      this.isActive = !this.isActive;
    },
    onSubmit() {
      this.ruleForm.uid=this.userdata.id
      this.$http
      .post("user/home/upUserPersonal", this.ruleForm)
      .then(res => {
        this.userlist=res.data;
        this.$message.success({
            message: "个人信息修改成功 ！！！",
            duration: 1500
          });
          this.toisActive()
      });
    },
    resetForm() {
      this.ruleForm = {
        name: "",
        region: "",
        date1: "",
        resource: "",
        mailbox: ""
      };
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
  margin: 14px auto;
}
.top div:nth-child(2) {
  padding-left: 80%;
  margin: 14px auto;
  color: #ec6c82;
}
.top div:nth-child(2) > span {
  cursor: pointer;
}
.bottom_text {
  margin-top: 50px;
  margin-left: 70px;
  font-size: 14px;
}
.bottom_text > div {
  display: flex;
  margin-bottom: 40px;
}
.bottom_text > div > span:nth-child(1) {
  color: #757575;
}
.bottom_text > div > span:nth-child(2) {
  margin-left: 15px;
  font-size: 16px;
}
.modify {
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modify > div {
  border-radius: 10px;
  background-color: #fff;
  width: 31%;
  height: 62%;
  margin: 10em auto;
  color: #212529;
  position: relative;
}
.bianji {
  padding-top: 12px;
  padding-left: 20px;
  font-weight: 600;
}
.kuan {
  margin: 20px;
  border-top: 2px solid #e6e6e6;
  padding-top: 30px;
  padding-left: 28px;
}
.elicon {
  font-size: 30px;
  position: absolute;
  top: 3px;
  right: 15px;
  cursor: pointer;
  color: rgb(139, 139, 139);
  
}
</style>