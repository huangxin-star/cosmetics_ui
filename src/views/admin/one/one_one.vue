<template>
  <div class="outside">
    <div class="title">用户管理</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="handleadd">新增</el-button>
      <div style="margin-left: auto;">
        <el-input
          style="width: 200px;display: inline-block;"
          size="small"
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
        <el-button
          @click="search"
          style="margin-left: 1rem;"
          size="small"
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%">
<!--      <el-table-column label="头像" width="100" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <img :src="scope.row.imghead" style="width:50px;border-radius: 50%;" />-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="account" label="账号" align="center" />
      <el-table-column prop="sname" label="姓名" align="center" />
      <el-table-column label="性别" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.sex ==0">男</span>
          <span v-if="scope.row.sex ==1">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stel" label="电话" align="center" width="100" />
      <el-table-column prop="emergency_call" label="紧急电话" align="center" width="100" />
<!--      <el-table-column label="状态" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <div v-if="scope.row.state==0">下线</div>-->
<!--          <div v-if="scope.row.state==1">上线中</div>-->
<!--          <div v-if="scope.row.state==2">禁用中</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
<!--          <el-button-->
<!--            v-if="scope.row.state==0"-->
<!--            size="mini"-->
<!--            @click="openModel(scope.row.id,scope.$index)"-->
<!--          >禁用</el-button>-->
<!--          <el-popconfirm-->
<!--            title="确定要强制下线吗？"-->
<!--            style="margin-left: 1rem"-->
<!--            @confirm="Offline(scope.row.id,scope.$index)"-->
<!--          >-->
<!--            <el-button v-if="scope.row.state==1" size="mini" type="danger" slot="reference">强制下线</el-button>-->
<!--          </el-popconfirm>-->
          <el-button
            size="mini"
            @click="update(scope.row)"
            type="primary"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-pagination
      class="pagination-container"
      @size-change="sizeChange"
      @current-change="currentChange"
      background
      :current-page="current"
      :page-size="size"
      :total="count"
      :page-sizes="[5, 7]"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
export default {
  name: "one_noe",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      tableData: [],
      sexoptions:[{
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form :{
        sid:'',
        account: '',
        sname: '',
        spassword: '',
        stel: '',
        sex: '',
        type: 1,
        address: '',
        birthday:'',
        emergency_call:'',
        id_card:''
      },
      isadd:true,
      // 表单校验
      rules: {
        account: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
          { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        sname: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" }
        ],
        spassword: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        stel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/g,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        emergency_call: [
          { required: true, message: "紧急联系电话不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/g,
            message: "请输入正确的紧急联系电话",
            trigger: "blur"
          }
        ],
        birthday: [
          {  required: true, message: '请选择日期', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    handleadd() {//新增
      console.log(this.form)
      if (this.$refs["form"]) {
        console.log(this.$refs["form"])
        this.reset()
      }
      this.isadd = true
      this.open = true
      this.title = '新增'
    },
    update(row) {
      this.isadd = false
      // this.reset()
      this.form = Object.assign({}, row)
      console.log(this.form)
      this.open = true
      this.title = '修改'
    },
    getList() {//列表
      this.$http
        .get("admin/getPagingUser", {
          params: { current: this.current, size: this.size ,input:this.input1}
        })
        .then(res => {
          console.log(res)
          if (res.data !='err') {
            this.tableData = res.data.list;
            this.count = res.data.count;
          }else {
            this.$message.warning('找不到该用户')
          }

        }).catch((err) => {
          console.error(err)
      });
    },
    sizeChange(size) {
      this.size = size;
      this.getList();
    },
    currentChange(current) {
      this.current = current;
      this.getList();
    },
    search() {
      this.current = 1
      this.getList()
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        sid:'',
        account: '',
        sname: '',
        spassword: '',
        stel: '',
        sex: '',
        type: 1,
        address: '',
        birthday:'',
        emergency_call:'',
        id_card:''
      }
      this.$refs["form"].resetFields();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(valid)
          console.log(this.isadd)
          if (!this.isadd) {
            this.$http.post("admin/upUserRoTeacher", this.form).then(res => {
              console.log(this.form)
              console.log(res)
              if (res.status == 200) {
                this.$message.success({
                  message: "修改用户成功！！！",
                  duration: 1500
                });
                this.open = false
              }
              this.reset()
              this.getList()
            }).catch(err => {
              console.error(err)
            });
          } else { //新增
            this.$http.post("admin/setUserRoTeacher", this.form).then(res => {
              console.log(res)
              if (res.status == 200) {
                this.$message.success({
                  message: "新增用户成功！！！",
                  duration: 1500
                });
                this.open = false
              }
              this.reset()
              this.getList()
            }).catch(err => {
              console.error(err)
            });
          }
        }
      });
    },
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "用户管理 / 用户管理";
    this.getList();
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
.operation-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 3rem;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
.describe {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
