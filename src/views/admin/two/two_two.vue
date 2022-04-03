<template>
  <div class="outside">
    <div class="title">商品列表</div>
    <div class="operation-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="toTwo">新增</el-button>
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
      @row-dblclick="clickTable"
    >
      <el-table-column label="编号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="图片" align="center" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.picture" style="width:50px" />
        </template>
      </el-table-column>
      <el-table-column label="商品名" width="180" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>该商品被：{{scope.row.preference}}人喜欢</p>
            <el-button type="danger" size="mini" @click="goTwoo(scope.row)">修改信息</el-button>
            <el-button
              v-if="scope.row.isxiajia==0"
              type="danger"
              size="mini"
              @click="xia(scope.row.id,scope.$index,tableData)"
            >下架</el-button>
            <el-button
              v-else
              type="danger"
              size="mini"
              @click="shang(scope.row.id,scope.$index,tableData)"
            >上架</el-button>
            <div slot="reference" class="name-wrapper">
              <div class="describe">{{scope.row.name}}</div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类别" align="center" width="80" />
      <el-table-column label="商品介绍" align="center" style="width:20%">
        <template slot-scope="scope">
          <div class="describe">{{scope.row.introduce}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="brand" label="品牌" align="center" width="120" />
      <el-table-column sortable prop="salesvolume" label="销量" align="center" width="80" />
      <el-table-column label="价格" align="center" width="60">
        <template slot-scope="scope">
          <div>{{scope.row.price}}元</div>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" align="center" width="60" />
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button size="mini" @click="openModel(scope.row)">降价</el-button>
          <el-button size="mini" @click="openStock(scope.row)" type="danger" slot="reference">增货</el-button>
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
    <el-dialog :visible.sync="addOrEditk" width="30%">
      <div style="font-weight: 600;" slot="title">增加存货</div>
      <el-form label-width="80px" size="medium">
        <el-form-item label="存货">
          <el-input-number style="width: 150px" v-model="stock" :min="1" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEditk = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditTagk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isnews" width="55%">
      <div style="font-weight: 600;" slot="title">商品信息</div>
      <div style="display: flex;position: relative;">
        <img style="width:200px" :src="row.picture" alt />
        <div class="news">
          <div>
            <span style="font-size: 18px;">商品名：</span>
            {{row.name}}
          </div>
          <div>
            类 型：
            {{row.category}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            品 牌：{{row.brand}}
          </div>
          <div style="width:600px">
            介绍：
            {{row.introduce}}
          </div>
        </div>
      </div>

      <div slot="footer">
        <el-button @click="isnews = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "two_two",
  data() {
    return {
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      addOrEdit: false,
      addOrEditk: false,
      tableData: [],
      price: 0,
      stock: 0,
      row: [],
      isnews: false
    };
  },
  methods: {
    getTableData() {
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
    clickTable(row, column, event) {
      // this.addOrEdit = true;
      // this.tagForm = row;
      console.log(row);
      this.row = row;
      this.isnews = true;
    },
    sizeChange(size) {
      this.size = size;
      this.getTableData();
    },
    currentChange(current) {
      this.current = current;
      this.getTableData();
    },
    toTwo() {
      this.$router.push({ path: "/adminhome/two_one" });
    },
    goTwoo(row) {
      console.log(row);
      let res = JSON.stringify(row);
      this.$router.push({ path: "/adminhome/two_twoo", query: { res } });
    },
    openModel(row) {
      this.price = row.price;
      this.addOrEdit = true;
      this.row = row;
    },
    openStock(row) {
      this.addOrEditk = true;
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
    addOrEditTagk() {
      let id = this.row.id;
      let index = this.row.$index;
      this.$http
        .get("admin/upStock", { params: { id, stock: this.stock } })
        .then(res => {
          if (res.data == "ok") {
            this.$message.success({
              message: "增加成功 ！！！",
              duration: 1500
            });
            this.addOrEditk = false;
            this.getTableData();
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
    xia(id, index, table) {
      table[index].isxiajia = 1;
      this.$http.get("xiajia", { params: { id } }).then(res => {
        if ((res.data == "ok")) {
          this.$message.info({
            message: "下架成功 ！！！",
            duration: 1500
          });
        }
      });
    },
    shang(id, index, table) {
      table[index].isxiajia = 0;
      this.$http.get("shangjia", { params: { id } }).then(res => {
       if ((res.data == "ok")) {
          this.$message.success({
            message: "上架成功 ！！！",
            duration: 1500
          });
        }
        
      });
    }
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