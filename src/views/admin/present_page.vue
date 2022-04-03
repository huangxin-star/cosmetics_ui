<template>
  <div class="outside">
    <div class="title">心愿单</div>
    <div class="operation-container">
      <div style="margin-left: auto;">
        <el-input
          style="width: 200px;display: inline-block;"
          size="small"
          placeholder="请输入愿望标题"
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
      <el-table-column label="用户名" prop="username" width="100" align="center"></el-table-column>
      <el-table-column prop="title" label="心愿标题" align="center" />
      <el-table-column prop="genre" label="心愿类别" align="center" />
      <el-table-column label="内容描述" align="center">
        <template slot-scope="scope">
          <div class="describe">{{scope.row.wdescribe}}</div>
        </template>
      </el-table-column>

      <el-table-column label="许愿日期" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.wtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state==1">未实现</div>
          <div v-if="scope.row.state==2">已实现</div>
          <div v-if="scope.row.state==3">拒绝实现该愿望</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button size="mini" @click="openModel(scope.row.wdescribe)">查看</el-button>
          <el-button v-if="scope.row.state!=2" size="mini" type="danger" slot="reference" @click="goTwo(scope.$index,scope.row.id)">实现</el-button>
          <el-button
            v-if="scope.row.state==1"
            size="mini"
            type="danger"
            slot="reference"
            @click="refuse(scope.$index,scope.row.id)"
          >拒绝</el-button>
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
    <el-dialog title="内容描述" :visible.sync="dialogVisible" width="30%">
      <span>{{wdescribe}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "present_page",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      tableData: [],
      dialogVisible: false,
      wdescribe: ""
    };
  },
  methods: {
    sizeChange(size) {
      this.size = size;
      this.getList();
    },
    currentChange(current) {
      this.current = current;
      this.getList();
    },
    getList() {
      this.$http
        .get("admin/getWishList", {
          params: { current: this.current, size: this.size }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.count = res.data.count;
        });
    },
    openModel(item) {
      this.wdescribe = item;
      this.dialogVisible = true;
    },
    refuse(i, id) {
      this.tableData[i].state = 3;
      this.$http.get("admin/isState", { params: { id } }).then(res => {
        if (res.data == "ok") {
          this.$message.info({
            message: "成功拒绝该愿望 ！！！",
            duration: 1500
          });
        }
      });
    },
    goTwo(i, id) {
      this.tableData[i].state = 2;
      this.$http.get("admin/isStateTwo", { params: { id } })
      this.$router.push({ path: "/adminhome/two_two" });
    },
    search() {
      if (this.input1 == "") {
        this.$message.info({
          message: "请输入内容 ！！！",
          duration: 1500
        });
        return;
      }
      this.current = 1;
      this.$http
        .get("admin/searchWishList", { params: { input: this.input1 } })
        .then(res => {
          if (res.data != "err") {
            this.tableData = res.data;
          } else {
            alert("找不到“" + this.input1 + "”标题的数据！！！");
          }
        });
    },
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "心愿单";
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