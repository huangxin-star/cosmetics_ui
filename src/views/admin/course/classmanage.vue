<template>
  <div class="outside">
    <div class="title">班级列表</div>
    <div class="operation-container">
<!--      <el-button size="small" type="primary" icon="el-icon-plus" @click="toDetail">新增</el-button>-->
      <div>
        <el-select v-model="value" placeholder="请选择" @change="change">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-left: auto;">
        <el-input
            style="width: 200px;display: inline-block;"
            size="small"
            placeholder="请输入班级名"
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
<!--      <el-table-column label="编号" type="index" width="60" align="center"></el-table-column>-->
<!--      <el-table-column label="图片" align="center" width="80">-->
<!--        <template slot-scope="scope">-->
<!--          <img :src="scope.row.iamge" style="width:50px" />-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="cname" label="班级" align="center" width="100" />
<!--      <el-table-column prop="fees" label="费用" align="center" width="80" />-->
      <!--      <el-table-column prop="title" label="学制" align="center" width="80" />-->
      <el-table-column prop="sname" label="任课教师" align="center" width="80" />
      <el-table-column prop="room_name" label="上课教室" align="center" width="120" />
      <!--      <el-table-column prop="school_time" label="上课时间" align="center" width="80" />-->
      <el-table-column label="上课时间" align="center" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.school_time==1">周一上午</p>
          <p v-if="scope.row.school_time==2">周一下午</p>
          <p v-if="scope.row.school_time==3">周二上午</p>
          <p v-if="scope.row.school_time==4">周二下午</p>
          <p v-if="scope.row.school_time==5">周三上午</p>
          <p v-if="scope.row.school_time==6">周三下午</p>
          <p v-if="scope.row.school_time==7">周四上午</p>
          <p v-if="scope.row.school_time==8">周四下午</p>
          <p v-if="scope.row.school_time==9">周五上午</p>
          <p v-if="scope.row.school_time==10">周五下午</p>
        </template>
      </el-table-column>
<!--      <el-table-column prop="cdescription" label="课程描述" align="center" width="80" />-->
      <el-table-column prop="examined_content" label="考核内容" align="center" />
      <el-table-column prop="z_number" label="选课人数" align="center" width="80" />
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
          <span v-if="scope.row.cstatus==3">开课中</span>
          <span v-if="scope.row.cstatus==4&&userdata.type==2">成绩已录入，等待审核</span>
          <span v-if="scope.row.cstatus==4&&userdata.type==0">请审核发布成绩</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="时间" align="center" width="160">-->
<!--        <template slot-scope="scope">-->
<!--          <span >{{scope.row.time?new Date(+new Date(Number(scope.row.time)) + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " "):'无'  }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
<!--          <el-button size="mini" type="text" v-show="scope.row.cstatus ==1" @click="modifyNews(scope.row)">修改</el-button>-->
<!--          <el-button size="mini" type="text" v-show="scope.row.cstatus ==1" @click="releaseNews(scope.row)">发布</el-button>-->

<!--          <el-button size="mini" type="text" v-show="scope.row.cstatus ==2" @click="withdraw(scope.row)">撤回</el-button>-->
<!--          <el-button size="mini" type="text" v-show="scope.row.cstatus ==2" @click="opencourse(scope.row)">开课</el-button>-->
          <el-button size="mini" type="text" @click="goCourseDetail(scope.row)">选课详情</el-button>
<!--          <el-button size="mini" type="danger" v-show="scope.row.cstatus ==1" @click="deleteNews(scope.row)">删除</el-button>-->
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
<!--    <el-dialog :visible.sync="modifyEdit" width="50%" style="padding:20px;">-->
<!--      <div style="font-weight: 600;" slot="title">修改课程</div>-->
<!--      <el-form ref="elForm" :model="formData" :rules="rules" class="form" size="medium"  label-width="100px" >-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="课程名" prop="cname">-->
<!--              <el-input v-model="formData.cname" placeholder="请输入课程名" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="费用" prop="fees">-->
<!--              <el-input v-model="formData.fees" placeholder="请输入费用" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="任课教师" prop="tid">-->
<!--              <el-select v-model="formData.tid" placeholder="请选择任课教师" clearable :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in tnameOptions" :key="index" :label="item.sname"-->
<!--                           :value="item.sid" :disabled="item.disabled"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="上课教室" prop="locationid">-->
<!--              <el-select v-model="formData.locationid" placeholder="请选择上课教室" clearable :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in room_nameOptions" :key="index" :label="item.room_name"-->
<!--                           :value="item.id" :disabled="item.disabled"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="上课时间" prop="school_time">-->
<!--              <el-select v-model="formData.school_time" placeholder="请选择上课时间" clearable-->
<!--                         :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in school_timeOptions" :key="index" :label="item.label"-->
<!--                           :value="item.value" :disabled="item.disabled"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          &lt;!&ndash;          <el-col :span="12">&ndash;&gt;-->
<!--          &lt;!&ndash;            <el-form-item label="课程状态" prop="cstatus">&ndash;&gt;-->
<!--          &lt;!&ndash;              <el-select v-model="formData.cstatus" placeholder="请输入课程状态" clearable :style="{width: '100%'}">&ndash;&gt;-->
<!--          &lt;!&ndash;                <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"&ndash;&gt;-->
<!--          &lt;!&ndash;                           :value="item.value" :disabled="item.disabled"></el-option>&ndash;&gt;-->
<!--          &lt;!&ndash;              </el-select>&ndash;&gt;-->
<!--          &lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-col>&ndash;&gt;-->
<!--        </el-row>-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="开课人数" prop="min_number">-->
<!--              <el-input v-model="formData.min_number" placeholder="请输入开课人数" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="满员人数" prop="max_number">-->
<!--              <el-input v-model="formData.max_number" placeholder="请输入满员人数" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="课程描述" prop="cdescription">-->
<!--              <el-input v-model="formData.cdescription" type="textarea" placeholder="请输入课程描述"-->
<!--                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="考核内容" prop="examined_content">-->
<!--              <el-input v-model="formData.examined_content" type="textarea" placeholder="请输入考核内容"-->
<!--                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row >-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="上传图片"  prop="iamge" required>-->
<!--              <el-upload-->
<!--                  v-loading.fullscreen="loading"-->
<!--                  class="avatar-uploader"-->
<!--                  action="http://localhost:9000/admin/productCourseIamge"-->
<!--                  :show-file-list="false"-->
<!--                  :on-success="handleAvatarSuccess"-->
<!--                  :before-upload="field115BeforeUpload"-->
<!--              >-->
<!--                <img v-if="formData.iamge" :src="formData.iamge" class="avatar" />-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--      <div slot="footer">-->
<!--        <el-button @click="modifyEdit = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="modifyForm">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <el-dialog
        :title="'选择'+courseTitle+'课程的人员信息'"
        :visible.sync="dialogVisible"
        width="75%"
        custom-class="xuankeDialog"
        :fullscreen="true"
        center
    >
      <div class="operation">
        <!--      <el-button size="small" type="primary" icon="el-icon-plus" @click="toDetail">新增</el-button>-->
        <div>
          <el-button size="small" type="primary" v-if="userdata.type==0&&value==2" @click="gradeshenhe">成绩审核发布</el-button>
          <el-button size="small" type="primary" v-if="userdata.type==0&&value==2" @click="gradeshenhe">结课</el-button>
          <el-button size="small" type="primary" v-if="userdata.type==2" @click="notificationAudit">通知管理员审核</el-button>
        </div>
<!--        <div style="margin-left: auto;">-->
<!--          <el-input-->
<!--              style="width: 200px;display: inline-block;"-->
<!--              size="small"-->
<!--              placeholder="请输入班级名"-->
<!--              prefix-icon="el-icon-search"-->
<!--              v-model="input1"-->
<!--          ></el-input>-->
<!--          <el-button-->
<!--              @click="search"-->
<!--              style="margin-left: 1rem;"-->
<!--              size="small"-->
<!--              type="primary"-->
<!--              icon="el-icon-search"-->
<!--          >搜索</el-button>-->
<!--        </div>-->
      </div>
      <el-table border :data="xuankelist" style="width: 100%" v-loading="tableloading">
        <el-table-column label="编号" type="index" width="100" align="center"></el-table-column>
        <el-table-column prop="sname" label="学生姓名" align="center" width="120" />
        <el-table-column prop="cname" label="课程名" align="center" width="160" />
        <!--      <el-table-column prop="grade" label="成绩" align="center" width="80" />-->
        <el-table-column label="成绩" align="center" width="80">
          <template slot-scope="scope">
            <span >{{scope.row.grade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_pass" label="是否通过" align="center" width="80" />
        <el-table-column prop="gstatus" label="选课状态" align="center" width="40" />
        <el-table-column label="选课状态" align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.gstatus==1">选课成功，等待开课</span>
            <span v-if="scope.row.gstatus==2" style="color: red">申请退课中，请处理</span>
            <span v-if="scope.row.gstatus==3" >已同意退课</span>
            <span v-if="scope.row.gstatus==4" >不同意退课</span>
            <span v-if="scope.row.gstatus==5" >开课成功</span>
          </template>
        </el-table-column>
        <el-table-column prop="examined_content" label="考核内容" align="center" width="80" />
        <el-table-column label="选课日期" style="width: 30%" align="center">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.gtime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-if="userdata.type==2" @click="modifyGrade(scope.row)">成绩录入</el-button>
            <el-button size="mini" type="text" v-if="userdata.type==0&&scope.row.gstatus==2" @click="withdrawal(scope.row)">退课审核</el-button>
            <!--          <el-button size="mini" v-show="!isgradde" type="primary" @click="tuike(scope.row)">同意退课</el-button>-->
            <!--          <el-popconfirm-->
            <!--              title="确定删除吗？"-->
            <!--              style="margin-left: 1rem"-->
            <!--              @confirm="deleteCategory(scope.row.id)"-->
            <!--          >-->
            <!--            <el-button size="mini" type="danger" slot="reference">删除</el-button>-->
            <!--          </el-popconfirm>-->
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
<!--            <el-button type="primary" @click="getCourse">选课</el-button>-->
        <!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
          </span>
    </el-dialog>

    <el-dialog :visible.sync="addOrEdit" width="30%" title="成绩">
      <div style="font-weight: 600;" slot="title" ref="tagTitle" />
      <el-form label-width="80px" size="medium" :rules="rules" :model="tagForm">
        <el-form-item label="成绩" prop="grade">
          <el-input style="width: 220px" v-model="tagForm.grade" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="退课原因"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
      <el-input  v-model="reason" type="textarea" placeholder="请输入退课原因"
                 :autosize="{minRows: 4, maxRows: 4}" disabled></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dropOut">同意退课</el-button>
        <el-button @click="disagree">不同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "classmanage",
  data() {
    var examRule = function(rule, value, callback) {  //手机号 通用正则
      if(value != '' && value != null){
        let examScore = parseInt(value);
        if(examScore < 0 || examScore > 100){
          callback(new Error('请输入正确的考试成绩'));
        }else{
          callback();
        }
      }else{
        callback();
      }
    };
    return {
      centerDialogVisible:false,
      reason:'',
      rules: {
        grade: [
          { required: true, message: "请输入成绩", trigger: "blur" },
          { validator: examRule, trigger: 'blur'},

        ]
      },
      options: [],
      value: 1,
      userdata: JSON.parse(localStorage.getItem("admin")),
      courseTitle:'',
      isgradde:false,
      xuankelist:[],
      dialogVisible:false,
      loading:false,
      tableloading:false,
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
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      modifyEdit: false,
      tableData: [],
      price: 0,
      stock: 0,
      row: [],
      isnews: false,
      tagForm: {
        grade: "",
        course_id:'',
        sid:''
      },
      addOrEdit:false,
      courserow:''
    };
  },
  methods: {
    change() {
      console.log(this.value)
      this.getTableData()
    },
    getTableData() { //列表
      this.tableloading = true
      let type = this.userdata.type
      if(type ==0) {
        this.$http
            .get("admin/noCourseList", {
              params: { input: this.input1, current: this.current, size: this.size,value: this.value }
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
      }else if(type == 2){//教师已开课的课程
        this.$http
            .get("admin/teacherCourseList", {
              params: { input: this.input1, current: this.current, size: this.size,sid:this.userdata.sid }
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
      }

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
        rowdetail:''
      }
      this.$refs['elForm'].resetFields()
    },
    // opencourse(row) { //开课
    //   //判断人数是否符合要求
    //   let params = {course_id:row.course_id,cstatus:'3'}
    //   this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
    //     if (res.data == "ok") {
    //       this.$message.success({
    //         message: "开课成功 ！！！",
    //         duration: 1500
    //       });
    //     }
    //     this.getTableData()
    //   });
    // },
    withdrawal(row) { //退课审核
      this.centerDialogVisible = true
      this.reason = row.reason
      this.rowdetail = row
    },
    dropOut() {//同意退课
      let params = {sid:this.rowdetail.sid,gstatus:'3',course_id:this.rowdetail.course_id}
      this.$http.post("/admin/agreeDropOut", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "同意退课 ！！！",
            duration: 1500
          });
        }
        this.centerDialogVisible = false
        this.courseDeatil()
        this.getTableData()
      });
    },
    disagree() { //不同意退课
      let params = {sid:this.rowdetail.sid,gstatus:'4',course_id:this.rowdetail.course_id}
      this.$http.post("/admin/disagreeDropOut", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "不同意退课 ！！！",
            duration: 1500
          });
        }
        this.centerDialogVisible = false
        this.courseDeatil()
        this.getTableData()
      });
    },
    goCourseDetail(row) { //选课详情
      this.courserow = row;
      console.log(this.courserow)
      this.courseTitle =row.cname
      this.dialogVisible = true
      // this.$router.push({path:'/adminhome/courseList/xuankedetail',query: {course_id:row.course_id}})

      this.courseDeatil()
    },
    courseDeatil() {
      if (this.value ==1) {//显示所有状态的选课记录
        this.$http.post("admin/getSelectionDetails", {course_id:this.courserow.course_id}).then(res => {
          console.log(res)
          if (res.data.length>0) {
            this.xuankelist = res.data
            // this.$message.success({
            //   message: "发布成功 ！！！",
            //   duration: 1500
            // });
          }else{
            this.xuankelist = []
          }
          // this.getTableData()
        });
      }else if (this.value==2) {
        this.$http.post("/admin/getOpenSelectionDetails", {course_id:this.courserow.course_id}).then(res => {
          console.log(res)
          if (res.data.length>0) {
            this.xuankelist = res.data
            // this.$message.success({
            //   message: "发布成功 ！！！",
            //   duration: 1500
            // });
          }else{
            this.xuankelist = []
          }
          // this.getTableData()
        });
      }

    },
    modifyGrade(row) { //修改成绩
      this.addOrEdit = true
      this.tagForm.grade = row.grade
      this.tagForm.course_id = row.course_id
      this.tagForm.sid = row.sid
      console.log(this.tagForm)

    },
    saveUserInfo() { //修改成绩
      this.$http.post("admin/upAchievement", this.tagForm).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "修改成功 ！！！",
            duration: 1500
          });
          this.addOrEdit = false
        }
        this.courseDeatil()
        this.getTableData()
      });
    },
    gradeshenhe() { //对班级,审核通过学生才能看到成绩
      if (this.courserow.cstatus!=4) {
        this.$message.info('请等待通知，才能审核')
      }else {
        this.$confirm('请确认成绩正确，再发布，若有问题请联系任课教师修改即可', '提示', {
          confirmButtonText: '发布',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {course_id:this.courserow.course_id,cstatus:'5'}
          this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
            if (res.data == "ok") {
              this.$message.success({
                message: "通知成功 ！！！",
                duration: 2500
              });
            }
            this.getTableData()
          });
        }).catch(() => {

        });
      }
    },
    notificationAudit() {//通知管理员审核，改变课程状态，达到知道该课程需要审核的目的
      this.$confirm('请确认成绩全部录入，是否通知管理员审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        let params = {course_id:this.courserow.course_id,cstatus:'4'}
        this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
          if (res.data == "ok") {
            this.$message.success({
              message: "通知成功 ！！！",
              duration: 2500
            });
          }
          this.getTableData()
        });
      }).catch(() => {

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
    // toDetail() {
    //   this.$router.push({ path: "/adminhome/coursedetail" });
    // },


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
    }
  },
  created() {
    let type = JSON.parse(localStorage.getItem("admin")).type
    if (type == 0) {
      this.options = [{
        value: 1,
        label: '未开课'
      }, {
        value: 2,
        label: '已开课'
      }]
    }else {
      this.value = 2
      this.options = [{
          value: 2,
          label: '已开课'
      }]

    }
    this.$parent.$parent.$parent.$parent.titledata = "课程管理 / 班级列表";
    this.getTableData();
    // this.$http.get("getTeacherAndClassroom" ).then(res => {
    //   console.log(res)
    //   this.tnameOptions = res.data[0]
    //   this.room_nameOptions = res.data[1]
    //   // if (res.data != "err") {
    //   //   this.tableData = res.data.list;
    //   //   this.count = res.data.count;
    //   //
    //   // }else {
    //   //   this.$message.warning('找不到该新闻')
    //   // }
    //
    // }).catch((err) => {
    //   console.error(err)
    // });
  }
};
</script>
<style lang="less">
.xuankeDialog {
  border-radius: 10px;
  .el-dialog__header {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    overflow: hidden;
    //border-radius: 2px 2px 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666666 !important;
    //border-color: #dcdcdc !important;
    background-color: #f1f1f1 !important;
    border-radius: 10px 10px 0 0;
    .el-dialog__title {
      font-size: 18px;
    }
    .el-dialog__headerbtn {
      top: 10px;
      i {
        font-size: 18px !important;
        font-weight: bold !important;
      }
    }
  }
  .el-dialog__body {
    overflow: hidden;
    border-radius: 0 0 10px 10px;
    //box-shadow: 0 5px 5px #777;
  }
}
</style>
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
.operation {
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
