<template>
  <div class="outside">
    <div class="title">教室管理</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="openModel(null)">新增</el-button>
      <div style="margin-left: auto;">
        <el-input
            style="width: 200px;display: inline-block;"
            size="small"
            placeholder="请输入教室名字"
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
      <el-table-column label="教室" align="center" style="width: 30%">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.roomName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" style="width: 30%" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="openModel(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              style="margin-left: 1rem"
              @confirm="deleteCategory(scope.row.id)"
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
      <el-form label-width="80px" size="medium" :model="tagForm">
        <el-form-item label="类别名">
          <el-input style="width: 220px" v-model="tagForm.type" />
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
  name: "classroom",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      addOrEdit: false,
      tableData: [{
        time: '2016-05-02',
        roomName: '615',

      }],
      tagForm: {
        id: null,
        type: "",
        time: ""
      }
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
          .get("admin/SearchCategory", { params: { input: this.input1 } })
          .then(res => {
            if (res.data != "err") {
              this.tableData = res.data;
            } else {
              alert("找不到“" + this.input1 + "”类别的数据！！！");
            }
          });
    },
    sizeChange(size) {
      this.size = size;
      this.listCategories();
    },
    currentChange(current) {
      this.current = current;
      this.listCategories();
    },
    deleteCategory(id) {
      this.$http.get("admin/deCategory", { params: { id } }).then(res => {
        if (res.data == "ok") {
          this.listCategories();
          this.$message.info({
            message: "类别删除成功 ！！！",
            duration: 1500
          });
        } else {
          this.$message.error({
            message: "类别删除失败 ！！！",
            duration: 1500
          });
        }
      });
    },
    listCategories() {
      this.$http
          .get("admin/category", {
            params: { current: this.current, size: this.size }
          })
          .then(res => {
            this.tableData = res.data.list;
            this.count = res.data.count;
          });
    },
    openModel(tag) {
      if (tag != null) {
        this.tagForm = tag;
        this.$refs.tagTitle.innerHTML = "修改标签";
      } else {
        this.tagForm.id = -1;
        this.tagForm.type = "";
        this.tagForm.time = "";
        this.$refs.tagTitle.innerHTML = "添加类别";
      }
      this.addOrEdit = true;
    },
    addOrEditTag() {
      if (this.tagForm.type.trim() == "") {
        this.$message.error("请输入类别！！！");
        return false;
      }

      this.$http
          .get("admin/setCategoryData", {
            params: { id: this.tagForm.id, type: this.tagForm.type }
          })
          .then(res => {
            if (res.data == "ok") {
              this.$message.success({
                message: "添加成功 感谢支持！！！",
                duration: 1500
              });
            } else {
              this.$message.success({
                message: "修改成功 感谢支持 ！！！",
                duration: 1500
              });
            }
          });
      this.listCategories();
      this.addOrEdit = false;
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "护肤品 / 类别管理";
    this.listCategories();
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
