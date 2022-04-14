<template>
<div>
  <div class="title">选课管理</div>
  <el-table border :data="tableData" style="width: 100%">
    <el-table-column label="编号" type="index" width="100" align="center"></el-table-column>
    <el-table-column prop="sname" label="学生姓名" align="center" width="120" />
    <el-table-column prop="cname" label="课程名" align="center" width="160" />
    <!--      <el-table-column prop="grade" label="成绩" align="center" width="80" />-->
    <el-table-column label="成绩" align="center" width="80">
      <template slot-scope="scope">
        <span v-if="!isgradde">{{scope.row.grade}}</span>
        <el-input type="text" placeholder="请输入成绩姓名" v-model="scope.row.grade" size="mini"
                  v-if="isgradde">
        </el-input>
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
<!--      <template slot-scope="scope">-->
<!--        <el-button size="mini" v-show="!isgradde" type="primary" @click="modifyGrade(scope.row)">修改成绩</el-button>-->

<!--        <el-button type="text" size="mini" v-show="isgradde" @click="saveUserInfo(scope.row)">-->
<!--          保存</el-button>-->
<!--        <el-button size="mini" v-show="!isgradde" type="primary" @click="openModel(scope.row)">选课失败</el-button>-->
<!--        &lt;!&ndash;          <el-popconfirm&ndash;&gt;-->
<!--        &lt;!&ndash;              title="确定删除吗？"&ndash;&gt;-->
<!--        &lt;!&ndash;              style="margin-left: 1rem"&ndash;&gt;-->
<!--        &lt;!&ndash;              @confirm="deleteCategory(scope.row.id)"&ndash;&gt;-->
<!--        &lt;!&ndash;          >&ndash;&gt;-->
<!--        &lt;!&ndash;            <el-button size="mini" type="danger" slot="reference">删除</el-button>&ndash;&gt;-->
<!--        &lt;!&ndash;          </el-popconfirm>&ndash;&gt;-->
<!--      </template>-->
    </el-table-column>
  </el-table>

</div>
</template>

<script>
export default {
  name: "xuankedetail",
  data() {
    return {
      tableData: [],
      isgradde:false,
    }
  },
  methods: {
    goCourseDetail() { //选课详情
      let id=this.$route.query.course_id
      this.$http.post("admin/getSelectionDetails", {course_id:id}).then(res => {
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
  },
  created() {
    this.goCourseDetail()
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
}
</style>
