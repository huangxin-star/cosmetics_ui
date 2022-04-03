<template>
  <div class="outside">
    <div class="title">修改商品</div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input style="width:400px" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品价格" prop="price">
              <el-input disabled v-model.number="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品库存" prop="stock">
              <el-input disabled v-model.number="ruleForm.stock"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品类别" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择商品类别">
                <el-option
                  v-for="(item, index) in category"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品公司" prop="brand">
              <el-select v-model="ruleForm.brand" placeholder="请选择商品公司">
                <el-option
                  v-for="(item, index) in company"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商品图片">
          <el-upload
          v-loading.fullscreen="loading"
            class="avatar-uploader"
            action="http://localhost:9000/admin/productImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品介绍" prop="introduce">
          <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "two_one",
  data() {
    return {
      loading:false,
      ruleForm: {
        name: "", //产品名称
        category: "", //产品类别
        price: 1, //价格
        stock: 1, //库存
        brand: "",
        picture: "",
        introduce: ""
      },
      ruleForms: {},
      company: [],
      category: [],
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, message: "请输入3个字符以上的名称", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择商品类别", trigger: "change" }
        ],
        brand: [
          { required: true, message: "请选择商品公司", trigger: "change" }
        ],
        introduce: [
          { required: true, message: "请填写商品介绍", trigger: "blur" },
          { min: 10, message: "请输入10个字符以上的商品介绍", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空" },
          { type: "number", message: "价格必须为数字值" }
        ],
        stock: [
          { required: true, message: "库存不能为空" },
          { type: "number", message: "库存必须为数字值" }
        ]
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$http.post("admin/upProduct", this.ruleForm).then(res => {
            if (res.data == "ok") {
              this.$message.success({
                message: "修改成功！！！",
                duration: 1500
              });
              this.$router.push({ path: "/adminhome/two_two" });
              console.log("Sddsd");
              
            }
            
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm = JSON.parse(this.$route.query.res);
    },
    handleAvatarSuccess(res, file) {
      
      this.ruleForm.picture = URL.createObjectURL(file.raw);
      this.loading=false
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
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "护肤品 / 修改商品";
    this.ruleForm = JSON.parse(this.$route.query.res);
    console.log(this.ruleForm);
    this.$http.get("companyAndCategory").then(res => {
      this.category = res.data[0];
      this.company = res.data[1];
    });
  }
};
</script>

<style scoped>
.outside {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 96.6%;
  height: 600px;
  border: 1px solid #ebeef5;
  padding: 20px;
  position: relative;
}
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
}
.title:before {
  content: "";
  width: 24px;
  height: 16px;
  border-left: 3px solid #ec6c82;
  margin-right: 20px;
}
.outside > div:nth-child(2) {
  margin-top: 3rem;
  width: 50%;
}
</style>
<style >
.outside .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.outside .avatar-uploader .el-upload:hover {
  border-color: #ec6c82;
}
.outside .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.outside .avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>