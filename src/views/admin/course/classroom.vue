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
            <el-tag size="medium">{{ scope.row.room_name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" style="width: 30%" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openModel(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              style="margin-left: 1rem"
              @confirm="deleteCategory(scope.row.Id)"
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
        <el-form-item label="教室名">
          <el-input style="width: 220px" v-model="tagForm.room_name" />
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
      tableData: [],
      tagForm: {
        Id: null,
        room_name: "",
        ctime: ""
      },
      isadd:false
    };
  },
  methods: {
    getTableData() { //列表
      this.nesLoading = true
      this.$http
          .get("admin/getPagingClassRoom", {
            params: { input: this.input1, current: this.current, size: this.size }
          })
          .then(res => {
            console.log(res)
            if (res.data != "err") {
              this.tableData = res.data.list;
              this.count = res.data.count;

            }else {
              this.$message.warning('找不到该新闻')
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
    deleteCategory(id) {
      this.$http.post("admin/deleteClassRoom", { id:id } ).then(res => {
        if (res.data == "ok") {
          this.getTableData();
          this.$message.info({
            message: "教室删除成功 ！！！",
            duration: 1500
          });
        } else {
          this.$message.error({
            message: "教室删除失败 ！！！",
            duration: 1500
          });
        }
      });
    },
    openModel(tag) {
      console.log(tag)
      if (tag != null) {
        this.isadd = false
        this.tagForm = tag;
        this.$refs.tagTitle.innerHTML = "修改教室名";
      } else {
        this.isadd = true
        this.tagForm.room_name = "";
        this.tagForm.ctime = "";
        this.$refs.tagTitle.innerHTML = "添加教室";
      }
      this.addOrEdit = true;
    },
    addOrEditTag() {
      if (this.tagForm.room_name.trim() == "") {
        this.$message.error("请输入教室名！！！");
        return false;
      }
      console.log(this.tagForm)
      if (!this.isadd) {//修改
        console.log('修改')
        this.$http
            .post("admin/upClassRoom", { id: this.tagForm.Id, room_name: this.tagForm.room_name })
            .then(res => {
              if (res.data == "ok") {
                this.$message.success({
                  message: "添加教室成功！！！",
                  duration: 1500
                });
                this.getTableData();
                this.addOrEdit = false;
              }
            });

      }else {
        console.log('新增')
        this.$http
            .post("admin/addClassRoom", { id: this.tagForm.Id, room_name: this.tagForm.room_name,ctime:new Date().getTime() })
            .then(res => {
              if (res.data == "ok") {
                this.$message.success({
                  message: "修改教室成功！！！",
                  duration: 1500
                });
                this.getTableData();
                this.addOrEdit = false;
              }
            });

      }

    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "课程管理 / 教室管理";
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
