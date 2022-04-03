<template>
  <div>
    <div class="tobu">
      <span>许下你的愿望。。。</span>
      <div @click="goiwish">查看我的愿望</div>
    </div>
    <div class="wish">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin-bottom: 40px;" label="用户">
          <el-input style="width:200px" disabled v-model="userdata.username"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label="愿望标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label="愿望类别" prop="genre">
          <el-select v-model="ruleForm.genre" placeholder="请选择愿望类别">
            <el-option label="商品降价" value="商品降价"></el-option>
            <el-option label="添加新商品" value="添加新商品"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label="愿望描述" prop="wdescribe">
          <el-input type="textarea" v-model="ruleForm.wdescribe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即许愿</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <tail></tail>
  </div>
</template>

<script>
import tail from "./tail";
export default {
  components: {
    tail
  },
  name: "wish",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      ruleForm: {
        title: "",
        genre: "",
        wdescribe: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入愿望标题", trigger: "blur" },
          { min: 2, max: 255, message: "标题长度大于二", trigger: "blur" }
        ],
        genre: [
          { required: true, message: "请选择愿望类别", trigger: "change" }
        ],
        wdescribe: [
          { required: true, message: "请填写愿望描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.uid=this.userdata.id
          this.$http.post("user/wish/setWishData",this.ruleForm).then(res=>{
            if(res.data=="ok"){
              alert("神龙会实现你的愿望的！！！")
            }
            
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goiwish(){
      this.$http.get("user/wish/getWishTotal",{params:{id:this.userdata.id}}).then(res=>{
        if(res.data=="ok"){
          this.$router.push({ path: "/homeuser/i_wish"})
        }else{
          this.$message.info({
            message: "您的愿望表里 还没有愿望 ！！！",
            duration: 1500
          });
        }
      })
      
    }
  }
};
</script>


<style scoped>
.tobu {
  width: 100%;
  margin-top: 120px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 40px;
  position: relative;
}
.tobu > span {
  padding-left: 180px;
  font-size: 16px;
  
}
.tobu > div {
  position: absolute;
  font-size: 13px;
  right: 4%;
  cursor: pointer;
}
.tobu > div:hover{
  color:#ec6c82;
}
.wish {
  width: 500px;
  margin: 0 auto;
}
</style>