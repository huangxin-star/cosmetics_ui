<template>
  <div class="core">
    <div class="top">
      <div>我的选课</div>
    </div>
    <div class="bottom">
      <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="cname" label="课程名" align="center" />
        <el-table-column prop="sname" label="上课教师" align="center" />

        <!--      <el-table-column prop="grade" label="成绩" align="center" width="80" />-->
        <el-table-column label="成绩" align="center" >
          <template slot-scope="scope">
            <span >{{scope.row.grade}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column prop="is_pass" label="是否通过" align="center" width="80" />-->

<!--        <el-table-column prop="school_time" label="上课时间" align="center" />-->
        <el-table-column label="上课时间" align="center">
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
        <el-table-column prop="room_name" label="上课教室" align="center" />
        <el-table-column prop="gstatus" label="选课状态" align="center" />
<!--        <el-table-column label="选课日期" style="width: 30%" align="center">-->
<!--          <template slot-scope="scope">-->

<!--            <span style="margin-left: 10px">{{ scope.row.gtime }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作"  align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="tuike(scope.row)">退课</el-button>

                </template>
        </el-table-column>
      </el-table>
        </template>
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
      <el-dialog
          title="退课原因"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
        <el-input  v-model="reason" type="textarea" placeholder="请输入退课原因"
                  :autosize="{minRows: 4, maxRows: 4}"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确定退课</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>


  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "mycourse",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      tableData: [],
      nesLoading:false,
      sid:JSON.parse(localStorage.getItem("user")).sid,
      reason:'',
      centerDialogVisible:false

    }
  },
  created() {
    this.getTableData()
  },
  methods:{
    getTableData() { //列表
      this.nesLoading = true
      // this.$http
      //     .get("user/getUserPagingCourse", {
      //       params: {sid:this.sid, input: this.input1, current: this.current, size: this.size }
      //     })
      //     .then(res => {
      //       console.log(res)
      //       if (res.data != "err") {
      //         this.tableData = res.data.list;
      //         this.count = res.data.count;
      //
      //       }
      //       this.nesLoading = false
      //     }).catch((err) => {
      //   console.error(err)
      // });
    },
    tuike(row) { //退课
      this.centerDialogVisible = true
      // let params = {sid:this.sid,gstatus:'退课中'}
      // this.$http.post("admin/upWithdrawAndRelease", params).then(res => {
      //   if (res.data == "ok") {
      //     this.$message.success({
      //       message: "发布成功 ！！！",
      //       duration: 1500
      //     });
      //   }
      //   this.getTableData()
      // });
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
  }
}
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
  position: relative;
}
.top div:nth-child(1) {
  border-left: 2px solid #ec6c82;
  padding-left: 10px;
  margin: 14px 0 14px 18px;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
