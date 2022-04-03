<template>
  <div class="outside">
    <div class="title">商家管理</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="toTwo">新增</el-button>
      <div style="margin-left: auto;">
        <el-input
          style="width: 200px;display: inline-block;"
          size="small"
          placeholder="请输入商家名"
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
      <el-table-column label="编号" type="index" width="100" align="center"></el-table-column>
      <el-table-column prop="username" label="品牌名" align="center" />
      <el-table-column prop="state" label="卖出数量" align="center" />
      <el-table-column label="总共收益" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.money}}元</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 1rem"
            @confirm="deleteData(scope.row.id,scope.$index,tableData)"
          >
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
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
    <el-dialog :visible.sync="addOrEdit" width="30%">
      <div style="font-weight: 600;" slot="title" ref="tagTitle" />
      <el-form label-width="80px" size="medium">
        <el-form-item label="品牌名">
          <el-input style="width: 220px" v-model="name" />
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
  name: "one_two",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      tableData: [],
      addOrEdit: false,
      name: ""
    };
  },
  methods: {
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
        .get("admin/searchStoreList", { params: { input: this.input1 } })
        .then(res => {
          if (res.data != "err") {
            this.tableData = res.data;
          } else {
            alert("找不到“" + this.input1 + "”品牌的商家！！！");
          }
        });
    },
    toTwo() {
      this.$refs.tagTitle.innerHTML = "添加商家";
      this.addOrEdit = true;
    },
    addOrEditTag() {
      this.$http
        .get("admin/addStore", {
          params: { name:this.name }
        })
        .then(res => {
          if(res.data=="ok"){
            this.$message.success({
              message: "添加成功！！！",
              duration: 1500
            });
          }else{
            this.$message.info({
              message: "已经存在该品牌！！！",
              duration: 1500
            });
          }
          this.name=""
          this.getList()
          this.addOrEdit=false
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
    getList() {
      this.$http
        .get("admin/getStoreDataTable", {
          params: { current: this.current, size: this.size }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.count = res.data.count;
        });
    },
    deleteData(id, index, rows) {
      this.$http
        .get("admin/deleteDataStore", {
          params: { id }
        })
        .then(res => {
          if (res.data == "ok") {
            rows.splice(index, 1);
            this.$message.success({
              message: "删除成功！！！",
              duration: 1500
            });
          }
        });
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "客户管理 / 商家管理";
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
</style>
