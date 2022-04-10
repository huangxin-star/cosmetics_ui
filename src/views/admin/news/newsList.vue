<template>
  <div class="outside">
    <div class="title">新闻列表</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="toDetail">新增</el-button>
      <div style="margin-left: auto;">
        <el-input
            style="width: 200px;display: inline-block;"
            size="small"
            placeholder="请输入商品名"
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
        v-loading="nesLoading"
    >
      <el-table-column label="图片" align="center" width="80" >
        <template slot-scope="scope">
          <img :src="scope.row.newsimg" style="width:50px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" width="180" />
      <el-table-column label="类别" >
        <template slot-scope="scope">
          <span v-if="scope.row.ntype==1">新闻动态</span>
          <span v-if="scope.row.ntype==2">作品展示</span>
          <span v-if="scope.row.ntype==3">通知公告</span>
          <span v-if="scope.row.ntype==4">学习资料</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center" style="width:20%">
        <template slot-scope="scope">
          <div class="describe" v-html="scope.row.content"></div>
        </template>
      </el-table-column>
<!--      <el-table-column prop="video" label="视频" align="center" width="60" />-->
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <span >{{ scope.row.nstatus }}</span>
<!--          <span v-if="scope.row.nstatus==0">未发布</span>-->
<!--          <span v-if="scope.row.nstatus==1">已发布</span>-->
<!--          <span v-if="scope.row.nstatus==2">已撤回</span>-->
        </template>
      </el-table-column>
<!--      <el-table-column prop="nstatus" label="状态" align="center" width="120" />-->
      <el-table-column label="创建时间" >
        <template slot-scope="scope">
          <span>{{new Date(+new Date(Number(scope.row.ntime)) + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ")}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="ntime" label="时间" align="center" width="100" />-->
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button size="mini"  @click="modifyNews(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.nstatus!='已发布'" @click="releaseNews(scope.row)">发布</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.nstatus=='已发布'" @click="withdraw(scope.row)">撤回</el-button>
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
    <el-dialog :visible.sync="addOrEdit" width="600px" style="padding:20px;">
      <div style="font-weight: 600;" slot="title">修改新闻</div>
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
  name: "newsList",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      addOrEdit: false,
      tableData: [],
      price: 0,
      stock: 0,
      row: [],
      isnews: false,
      ids:[],
      nesLoading:false
    };
  },
  methods: {
    getTableData() { //列表
      this.nesLoading = true
      this.$http
          .get("admin/getPagingNews", {
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
    //修改
    modifyNews(row) {
      console.log(row)

    },
    //发布
    releaseNews(row){
      let params = {nid:row.nid}
      this.$http.post("admin/upNstatus", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "发布成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    withdraw(row) { //撤回
      let params = {nid:row.nid}
      this.$http.post("admin/upWithdraw", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "撤回成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
      });
    },
    deleteNews(row) { //删除
      let params = {nid:row.nid}
      this.$http.post("admin/deleteNews", params).then(res => {
        if (res.data == "ok") {
          this.$message.success({
            message: "删除成功 ！！！",
            duration: 1500
          });
        }
        this.getTableData()
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
    toDetail() {
      this.$router.push({ path: "/adminhome/newsdetail" });
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
