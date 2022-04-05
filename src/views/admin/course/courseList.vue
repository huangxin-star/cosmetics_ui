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
    >
      <el-table-column label="编号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="图片" align="center" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.picture" style="width:50px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" align="center" width="80" />
      <el-table-column prop="title" label="费用" align="center" width="80" />
      <el-table-column prop="title" label="学制" align="center" width="80" />
      <el-table-column prop="title" label="任课教师" align="center" width="80" />
      <el-table-column prop="title" label="上课教室" align="center" width="80" />
      <el-table-column prop="title" label="上课时间" align="center" width="80" />
      <el-table-column prop="title" label="课程描述" align="center" width="80" />
      <el-table-column prop="type" label="考核内容" align="center" width="80" />
      <el-table-column prop="title" label="选课人数" align="center" width="80" />
<!--      <el-table-column label="内容" align="center" style="width:20%">-->
<!--        <template slot-scope="scope">-->
<!--          <div class="describe">{{scope.row.content}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="status" label="课程状态" align="center" width="120" />
      <el-table-column prop="time" label="时间" align="center" width="100" />
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button size="mini" @click="modifyNews(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" @click="releaseNews(scope.row)">发布</el-button>

          <el-button size="mini" type="primary" @click="withdraw(scope.row)">撤回</el-button>
          <el-button size="mini" type="primary" @click="withdraw(scope.row)">开课</el-button>
          <el-button size="mini" type="primary" @click="withdraw(scope.row)">选课详情</el-button>
          <el-button size="mini" type="danger" @click="deleteNews(scope.row)">删除</el-button>
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
    <el-dialog :visible.sync="addOrEdit" width="30%" style="padding:20px;">
      <div style="font-weight: 600;" slot="title">修改价格</div>
      <el-form label-width="80px" size="medium">
        <el-form-item label="价格">
          <el-input style="width: 220px" v-model="price" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditTag">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "courseList",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      addOrEdit: false,
      tableData: [{
        time: '2016-05-02',
        title: '王小虎',
        type:"学习资料",
        status:"未发布",
        content: '上海市普陀区金沙江路 1518 弄安德鲁杰克森放假撒了点开发螺丝钉咖啡碱撒大',
        video:''
      }],
      price: 0,
      stock: 0,
      row: [],
      isnews: false
    };
  },
  methods: {
    getTableData() { //列表
      this.$http
          .get("admin/searchPerList", {
            params: { input: this.input1, current: this.current, size: this.size }
          })
          .then(res => {
            if (res.data != "err") {
              this.tableData = res.data.list;
              this.count = res.data.count;
            } else {
              alert("找不到“" + this.input1 + "”名字的商品！！！");
            }
          });
    },
    //修改
    modifyNews() {

    },
    //发布
    releaseNews(row){

    },
    withdraw(row) { //撤回

    },
    deleteNews(row) { //删除

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
    openModel(row) {
      this.price = row.price;
      this.addOrEdit = true;
      this.row = row;
    },

    addOrEditTag() {
      this.row.price = this.price;
      this.$http.post("admin/upPrice", this.row).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "修改成功 ！！！",
            duration: 1500
          });
          this.addOrEdit = false;
        }
      });
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
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "护肤品 / 商品列表";
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
