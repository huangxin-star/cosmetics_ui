<template>
  <div class="outside">
    <div class="title">课程列表</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="toDetail">新增</el-button>
      <div style="margin-left: auto;">
        <el-input
            style="width: 200px;display: inline-block;"
            size="small"
            placeholder="请输入课程名"
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
    <el-table
        border
        :data="tableData"
        style="width: 100%;cursor: pointer;"
        v-loading="tableloading"
    >
      <el-table-column label="编号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="图片" align="center" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.iamge" style="width:50px" />
        </template>
      </el-table-column>
      <el-table-column prop="cname" label="课程名称" align="center" width="80" />
      <el-table-column prop="fees" label="费用" align="center" width="80" />
<!--      <el-table-column prop="title" label="学制" align="center" width="80" />-->
      <el-table-column prop="sname" label="任课教师" align="center" width="80" />
      <el-table-column prop="room_name" label="上课教室" align="center" width="80" />
      <el-table-column prop="school_time" label="上课时间" align="center" width="80" />
      <el-table-column prop="cdescription" label="课程描述" align="center" width="80" />
      <el-table-column prop="examined_content" label="考核内容" align="center" width="80" />
      <el-table-column prop="title" label="选课人数" align="center" width="80" />
<!--      <el-table-column label="内容" align="center" style="width:20%">-->
<!--        <template slot-scope="scope">-->
<!--          <div class="describe">{{scope.row.content}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="cstatus" label="课程状态" align="center" width="120" />-->
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="scope">
<!--          <span >{{ scope.row.cstatus }}</span>-->
                    <span v-if="scope.row.cstatus==1">未发布</span>
                    <span v-if="scope.row.cstatus==2">已发布</span>
                    <span v-if="scope.row.cstatus==3">已开课</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="时间" align="center" width="100" />
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="text" v-show="scope.row.cstatus ==1" @click="modifyNews(scope.row)">修改</el-button>
          <el-button size="mini" type="text" v-show="scope.row.cstatus ==1" @click="releaseNews(scope.row)">发布</el-button>

          <el-button size="mini" type="text" v-show="scope.row.cstatus ==2" @click="withdraw(scope.row)">撤回</el-button>
          <el-button size="mini" type="text" v-show="scope.row.cstatus ==2" @click="opencourse(scope.row)">开课</el-button>
          <el-button size="mini" type="text" @click="goCourseDetail(scope.row)">选课详情</el-button>
          <el-button size="mini" type="danger" v-show="scope.row.cstatus ==1" @click="deleteNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pagination-container"
        @size-change="sizeChange"
        @current-change="currentChange"
        background
        :current-page="current"
        :page-size="size"
        :total="count"
        :page-sizes="[5]"
        layout="total, sizes, prev, pager, next, jumper"
    />
<!--    修改课程弹框-->
    <el-dialog :visible.sync="modifyEdit" width="50%" style="padding:20px;">
      <div style="font-weight: 600;" slot="title">修改课程</div>
      <el-form ref="elForm" :model="formData" :rules="rules" class="form" size="medium" label-width="100px" >
        <el-row >
          <el-col :span="12">
            <el-form-item label="课程名" prop="cname">
              <el-input v-model="formData.cname" placeholder="请输入课程名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用" prop="fees">
              <el-input v-model="formData.fees" placeholder="请输入费用" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="任课教师" prop="tid">
              <el-select v-model="formData.tid" placeholder="请选择任课教师" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in tnameOptions" :key="index" :label="item.sname"
                           :value="item.sid" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上课教室" prop="locationid">
              <el-select v-model="formData.locationid" placeholder="请选择上课教室" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in room_nameOptions" :key="index" :label="item.room_name"
                           :value="item.id" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="上课时间" prop="school_time">
              <el-select v-model="formData.school_time" placeholder="请选择上课时间" clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in school_timeOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">-->
<!--            <el-form-item label="课程状态" prop="cstatus">-->
<!--              <el-select v-model="formData.cstatus" placeholder="请输入课程状态" clearable :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"-->
<!--                           :value="item.value" :disabled="item.disabled"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="开课人数" prop="min_number">
              <el-input v-model="formData.min_number" placeholder="请输入开课人数" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="满员人数" prop="max_number">
              <el-input v-model="formData.max_number" placeholder="请输入满员人数" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="课程描述" prop="cdescription">
              <el-input v-model="formData.cdescription" type="textarea" placeholder="请输入课程描述"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考核内容" prop="examined_content">
              <el-input v-model="formData.examined_content" type="textarea" placeholder="请输入考核内容"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="上传图片"  prop="iamge" required>
              <el-upload
                  v-loading.fullscreen="loading"
                  class="avatar-uploader"
                  action="http://localhost:9000/admin/productCourseIamge"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="field115BeforeUpload"
              >
                <img v-if="formData.iamge" :src="formData.iamge" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="modifyEdit = false">取 消</el-button>
        <el-button type="primary" @click="modifyForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "courseList",
  data() {
    return {
      loading:false,
      tableloading:false,
      formData: {
        cname: '',
        fees: '',
        system: '',
        tname: '',
        tid:'',
        room_name: '',
        locationid:'',
        school_time: '',
        cstatus: '',
        min_number: 5,
        max_number: 20,
        cdescription: '',
        examined_content: '',
        iamge: '',
        time:''
      },
      rules: {
        cname: [{
          required: true,
          message: '请输入课程名',
          trigger: 'blur'
        }],
        fees: [{
          required: true,
          message: '请输入费用',
          trigger: 'blur'
        }],
        system: [{
          required: true,
          message: '请至少选择一个学制',
          trigger: 'change'
        }],
        tid: [{
          required: true,
          message: '请选择任课教师',
          trigger: 'change'
        }],
        locationid: [{
          required: true,
          message: '请选择上课教室',
          trigger: 'change'
        }],
        school_time: [{
          required: true,
          message: '请选择上课时间',
          trigger: 'change'
        }],
        cstatus: [{
          required: true,
          message: '请输入课程状态',
          trigger: 'change'
        }],
        min_number: [{
          required: true,
          message: '请输入开课人数',
          trigger: 'blur'
        }],
        max_number: [{
          required: true,
          message: '请输入满员人数',
          trigger: 'blur'
        }],
        cdescription: [{
          required: true,
          message: '请输入课程描述',
          trigger: 'blur'
        }],
        examined_content: [{
          required: true,
          message: '请输入考核内容',
          trigger: 'blur'
        }],
      },
      field115Action: 'http://localhost:9000/admin/productCourseIamge',
      field115fileList: [],
      systemOptions: [{
        "label": "一学年",
        "value": 1,
        // "children": [{
        //   "label": "一学年",
        //   "value": 0,
        //   "id": 105
        // }]
      }, {
        "label": "三学年",
        "value": 2,
        // "children": [{
        //   "label": "初级",
        //   "value": 2,
        //   "id": 102
        // }, {
        //   "label": "中级",
        //   "value": 3,
        //   "id": 103
        // }, {
        //   "label": "高级",
        //   "value": 4,
        //   "id": 104
        // }]
      }],
      tnameOptions: [],//教师
      room_nameOptions: [],//教室
      school_timeOptions: [{
        "label": "周一上午",
        "value": "1"
      }, {
        "label": "周一下午",
        "value": "2"
      }, {
        "label": "周二上午",
        "value": "3"
      }, {
        "label": "周二下午",
        "value": "4"
      }, {
        "label": "周三上午",
        "value": "5"
      }, {
        "label": "周三下午",
        "value": "6"
      }, {
        "label": "周四上午",
        "value": "7"
      }, {
        "label": "周四下午",
        "value": "8"
      }, {
        "label": "周五上午",
        "value": "9"
      }, {
        "label": "周五下午",
        "value": "10"
      }],
      statusOptions: [{
        "label": "未发布",
        "value": "1"
      }, {
        "label": "已发布",
        "value":"2"
      }, {
        "label": "已撤回",
        "value": 3
      }, {
        "label": "已开课",
        "value": 4
      }],

      input1: "",
      current: 1,
      size: 5,
      count: 0,
      modifyEdit: false,
      tableData: [],
      price: 0,
      stock: 0,
      row: [],
      isnews: false
    };
  },
  methods: {
    getTableData() { //列表
      this.tableloading = true
      this.$http
          .get("admin/getPagingCourse", {
            params: { input: this.input1, current: this.current, size: this.size }
          })
          .then(res => {
            console.log(res)
            if (res.data != "err") {
              this.tableData = res.data.list;
              this.count = res.data.count;
            } else {
              this.$message.warning("找不到“" + this.input1 + "”名字的课程！！！");
            }
            this.tableloading = false
          });
    },
    resetForm() {
      this.formData = {
        cname: '',
        fees: '',
        system: '',
        tname: '',
        tid:'',
        room_name: '',
        locationid:'',
        school_time: '',
        cstatus: '',
        min_number: '',
        max_number: '',
        cdescription: '',
        examined_content: '',
        iamge: '',
      }
      this.$refs['elForm'].resetFields()
    },
    //修改
    modifyNews(row) {
      console.log(row)
      // this.reset()
      this.formData = Object.assign({}, row)
      console.log(this.formData)
      this.modifyEdit = true
    },
    modifyForm() {
      console.log(this.formData)
      this.$http.post("admin/upCourse", this.formData).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "修改成功 ！！！",
            duration: 1500
          });
          this.modifyEdit = false;
          this.resetForm()
        }
        this.getTableData()

      });
    },
    //发布
    releaseNews(row){
      console.log(row)
      let params = {course_id:row.course_id,cstatus:'2'}
      this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "发布成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    withdraw(row) { //撤回
      //如果有人已经选课，需要把选课的人踢掉才能选课
      let params = {course_id:row.course_id,cstatus:'1'}
      this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "撤回成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    opencourse(row) {
      //判断人数是否符合要求
      let params = {course_id:row.course_id,cstatus:'3'}
      this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "开课成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    goCourseDetail(row) { //选课详情
      this.$http.post("admin/getSelectionDetails", {course_id:row.course_id}).then(res => {
        console.log(res)
        if (res.data.length>0) {
          // this.$message.success({
          //   message: "发布成功 ！！！",
          //   duration: 1500
          // });
        }
        // this.getTableData()
      });
    },
    deleteNews(row) { //删除
      let params = {course_id:row.course_id}
      this.$http.post("admin/deleteCourse", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "删除成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    sizeChange(size) {
      this.size = size;
      this.getTableData();
    },
    currentChange(current) {
      this.current = current;
      this.getTableData();
    },
    toDetail() {
      this.$router.push({ path: "/adminhome/coursedetail" });
    },


    search() {
      // if (this.input1 == "") {
      //   this.$message.info({
      //     message: "请输入内容 ！！！",
      //     duration: 1500
      //   });
      //   return;
      // }
      this.current = 1;
      this.getTableData();
    },
    //图
    handleAvatarSuccess(res, file) {
      this.loading=false
      this.formData.iamge = URL.createObjectURL(file.raw);
    },
    field115BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      this.loading=true
      return isRightSize && isAccept
    },
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "课程管理 / 课程列表";
    this.getTableData();
    this.$http.get("getTeacherAndClassroom" ).then(res => {
      console.log(res)
      this.tnameOptions = res.data[0]
      this.room_nameOptions = res.data[1]
      // if (res.data != "err") {
      //   this.tableData = res.data.list;
      //   this.count = res.data.count;
      //
      // }else {
      //   this.$message.warning('找不到该新闻')
      // }

    }).catch((err) => {
      console.error(err)
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
  font-size: 13px;
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
.news {
  font-size: 17px;
  position: absolute;
  top: -30px;
  left: 200px;
}
.news > div {
  margin-bottom: 10px;
}
</style>
