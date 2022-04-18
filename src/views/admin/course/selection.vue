<template>
  <div class="outside">
    <div class="title">选课管理</div>
    <div class="operation-container">
<!--      <div>-->
<!--        <el-select v-model="value" placeholder="请选择">-->
<!--          <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </div>-->
      <div style="margin-left: auto;">
        <el-input
            style="width: 200px;display: inline-block;"
            size="small"
            placeholder="请输入类别"
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

    <el-table border :data="tableData" style="width: 100%" v-loading="nesLoading">
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
      <el-table-column prop="gstatus" label="选课状态" align="center" width="180" />
      <el-table-column prop="examined_content" label="考核内容" align="center" width="80" />
      <el-table-column label="选课日期" style="width: 30%" align="center">
        <template slot-scope="scope">

          <span style="margin-left: 10px">{{ scope.row.gtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modifyGrade(scope.row)">修改成绩</el-button>
          <el-button size="mini" type="primary" @click="tuike(scope.row)">选课失败</el-button>
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
  </div>
</template>

<script>
export default {
  name: "selection",
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
      options: [{
        value: '1',
        label: '未开课'
      }, {
        value: '2',
        label: '已开课'
      }],
      value: '1',
      rules: {
        grade: [
          { required: true, message: "请输入成绩", trigger: "blur" },
          { validator: examRule, trigger: 'blur'},

        ]
      },
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      addOrEdit: false,
      tableData: [],
      tagForm: {
        grade: "",
        course_id:'',
        sid:''
      },
      nesLoading:false
    };
  },
  methods: {
    getTableData() { //列表
      this.nesLoading = true
      this.$http
          .get("admin/getPagingGrade", {
            params: { input: this.input1, current: this.current, size: this.size }
          })
          .then(res => {
            console.log(res)
            if (res.data != "err") {
              this.tableData = res.data.list;
              this.count = res.data.count;

            }else {
              this.$message.warning('找不到该选课信息')
            }
            this.nesLoading = false
          }).catch((err) => {
        console.error(err)
      });
    },
    search() {
      this.current = 1;
      this.getTableData();
    },
    sizeChange(size) {
      this.size = size;
      this.getTableData();
    },
    currentChange(current) {
      this.current = current;
      this.getTableData();
    },
    modifyGrade(row) { //修改成绩
      this.addOrEdit = true
      this.tagForm.grade = row.grade
      this.tagForm.course_id = row.course_id
      this.tagForm.sid = row.sid
      console.log(this.tagForm)

    },
    saveUserInfo() {
      this.$http.post("admin/upAchievement", this.tagForm).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "修改成功 ！！！",
            duration: 1500
          });
          this.addOrEdit = false
        }

        this.getTableData()
      });
    },
    tuike(row) {
      let params = {sid:this.sid,gstatus:'退课中'}
      this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "发布成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "课程管理 / 选课管理";
    this.getTableData();
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
</style>
