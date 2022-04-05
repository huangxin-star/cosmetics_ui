<template>
  <div class="outside">
    <div class="title">用户管理</div>
    <div class="operation-container">
      <div style="margin-left: auto;">
        <el-input
          style="width: 200px;display: inline-block;"
          size="small"
          placeholder="请输入昵称"
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
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imghead" style="width:50px;border-radius: 50%;" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号" align="center" />
      <el-table-column prop="pname" label="姓名" align="center" />
      <el-table-column prop="pgender" label="性别" align="center" />

      <el-table-column prop="pregion" label="地址" align="center" />
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.pbirth }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mailbox" label="电话" align="center" width="100" />
      <el-table-column prop="mailbox" label="紧急电话" align="center" width="100" />
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
            @click="Model(scope.row.id,scope.$index)"
            type="primary"
          >修改</el-button>
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
      tableData: [{username:'中云涛'}]
    };
  },
  methods: {
    getList() {
      this.$http
        .get("admin/getUserDataTable", {
          params: { current: this.current, size: this.size }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.count = res.data.count;
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
    openModel(id, i) {
      this.$http.get("admin/isUserState", { params: { id } }).then(res => {
        if (res.data == "ok") {
          this.tableData[i].state = 2;
          this.$message.success({
            message: "禁用成功！！！",
            duration: 1500
          });
        }
      });
    },
    Model(id, i) {
      this.$http.get("admin/isUserStateTo", { params: { id } }).then(res => {
        if (res.data == "ok") {
          this.tableData[i].state = 0;
          this.$message.success({
            message: "解禁成功！！！",
            duration: 1500
          });
        }
      });
    },
    Offline(i,index) {
      console.log(i);
      this.tableData[index].state=0
      localStorage.removeItem("user");
      this.$http.get("admin/userOffline",{params:{id:i}}).then(res=>{
        if(res.data=="ok"){
          this.$message.success({
              message: "强制下线成功！！！",
              duration: 1500
            });
        }
      })
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
        .get("admin/searchUserList", { params: { input: this.input1 } })
        .then(res => {
          if (res.data != "err") {
            this.tableData = res.data;
          } else {
            alert("找不到“" + this.input1 + "”名字的用户！！！");
          }
        });
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "客户管理 / 用户管理";
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
