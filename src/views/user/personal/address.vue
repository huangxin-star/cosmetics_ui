<template>
  <div class="core">
    <div class="top">
      <div>个人地址</div>
      <div>
        <span @click="toisActive('添加')">添加</span>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="address" v-for="(item, index) in list" :key="index">
          <div>
            <div>
              <span>收货人：</span>
              {{item.uname}}
            </div>
            <div>
              <span>电话：</span>
              {{item.uphone}}
            </div>
            <div>
              <span>地区：</span>
              {{item.region}}
            </div>
            <div>
              <span>详细地址：</span>
              {{item.detailed}}
            </div>
            <div>
              <span>邮编：</span>
              {{item.code}}
            </div>
            <div>
              {{item.createtime}}
              <span
                @click="upxiugai(index)"
                style="margin-left: 27%;"
                class="up"
              >修改&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="up" @click="deletedata(item.id)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modify" v-if="isActive">
      <div>
        <div class="elicon" @click="toisActive">
          <i class="el-icon-close"></i>
        </div>
        <div class="bianji">{{isSubmit}}地址</div>
        <div class="kuan">
          <el-form
            ref="FormRef"
            :rules="rules"
            :model="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="收货人名" prop="uname">
              <el-input style="width: 220px;" v-model="ruleForm.uname"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="uphone">
              <el-input style="width: 220px;" v-model="ruleForm.uphone"></el-input>
            </el-form-item>
            <div class="region">
              <div>地区</div>
              <VDistpicker @province="onChangeProvince1" @city="onChangeCity" @area="onChangeArea"></VDistpicker>
            </div>
            <el-form-item label="详细地址">
              <el-input style="width: 220px;" v-model="ruleForm.detailed"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input style="width: 220px;" v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{isSubmit}}</el-button>
              <el-button style="margin-left: 35px;" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  name: "personal_address",
  data() {
    return {
      list: "",
      userdata: JSON.parse(localStorage.getItem("user")),
      isActive: false,
      isSubmit: "添加",
      ruleForm: {
        uname: "",
        uphone: "",
        region: "",
        detailed: "",
        code: ""
      },
      //省市区
      province: "",
      city: "",
      area: "",
      rules: {
        uphone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "电话长度11位", trigger: "blur" }
        ],
        uname: [
          { required: true, message: "请输入收货人", trigger: "blur" },
          { min: 2, max: 22, message: "人名大于两个字", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$http
      .post("user/home/getUserAddress", { id: this.userdata.id })
      .then(res => {
        this.list = res.data;
      });
  },
  methods: {
    toisActive() {
      this.isActive = !this.isActive;
    },
    toisActive(i) {
      this.isSubmit = i;
      this.isActive = !this.isActive;
    },
    onSubmit() {
      let time = new Date();
      this.ruleForm.createtime =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      if (this.isSubmit == "添加") {
        this.$refs.FormRef.validate(async valid => {
          if (!valid) return;
          this.ruleForm.uid = this.userdata.id;
          this.ruleForm.region = this.province + this.city + this.area;
          let res = await this.$http.post(
            "user/home/setUserAddress",
            this.ruleForm
          );
          this.list = res.data;
          this.$message.success({
            message: "个人地址添加成功 ！！！",
            duration: 1500
          });
          this.toisActive();
        });
      } else {
        this.$refs.FormRef.validate(async valid => {
          if (!valid) return;
          this.ruleForm.region = this.province + this.city + this.area;
          let res = await this.$http.post(
            "user/home/upUserAddress",
            this.ruleForm
          );
          this.list = res.data;
          this.$message.info({
            message: "个人地址修改成功 ！！！",
            duration: 1500
          });
          this.toisActive();
        });
       console.log(this.ruleForm);
      }
    },
    resetForm() {
      this.ruleForm = {
        uname: "",
        uphone: "",
        region: [],
        detailed: "",
        code: ""
      };
    },
    onChangeProvince1(a) {
      this.province = a.value;
    },
    onChangeCity(a) {
      this.city = a.value;
    },
    onChangeArea(a) {
      this.area = a.value;
    },
    deletedata(id) {
      this.$http
        .get("user/home/deleteUserAddress", {
          params: { id, uid: this.userdata.id }
        })
        .then(res => {
          this.list = res.data;
          this.$message.info({
            message: "个人地址删除成功 ！！！",
            duration: 1500
          });
        });
    },
    upxiugai(i) {
      this.toisActive("修改");
      this.ruleForm = this.list[i];
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
.bottom > div {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;
}
.bottom > div::-webkit-scrollbar {
  display: none;
}
.address {
  margin-top: 30px;
  margin-left: 47px;
  border: 1px solid #e4e4e4;
  width: 245px;
  height: 270px;
  flex: none;
  position: relative;
}
.address > div {
  margin: 18px;
  font-size: 14px;
  color: #757575;
}
.address > div > div {
  margin-bottom: 14px;
  color: #262626;
}
.address > div > div:nth-child(1) {
  font-size: 17px;
}
.address > div span {
  font-size: 13px;
  color: #757575;
}
.address > div > div:nth-child(6) {
  position: absolute;
  left: 18px;
  bottom: 0;
  color: #757575;
  font-size: 13px;
  width: 100%;
}
.address > div .up {
  color: rgb(255, 255, 255);
}
.address:hover div > div > .up {
  color: #ec6c82;
  cursor: pointer;
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
.region {
  display: flex;
  margin-bottom: 20px;
}
.region > div:nth-child(1) {
  width: 32px;
  line-height: 38px;
  margin-right: 10px;
  margin-left: 14%;
  color: #606266;
}
</style>
<style>
.distpicker-address-wrapper select {
  font-size: 14px;
  width: 100px;
  padding: 0.2rem 0.25rem;
}
.distpicker-address-wrapper label:nth-child(2) select,
label:nth-child(3) select {
  width: 80px;
}
</style>
