<template>
  <div>
    <div class="title-page">
      <img src="../../assets/img/banner-2.jpg" alt />
      <div class="title-text">
        <h1>Favorite page</h1>
        <p>
          <span>首页</span> / Shop / Favorite page
        </p>
      </div>
    </div>
    <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
    <div class="toptable">
      <el-table :data="tableData" style="width: 1030;" >
        <el-table-column label width="130" >
          <template slot-scope="scope">
            <i
              class="ifont icon-aixin iconfont"
              @click="deleteRow(scope.row.id,scope.$index, tableData)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column  label="商品图片" width="150">
          <template slot-scope="scope" style="">
            <el-image style="width: 80px; height: 80px;" :src="scope.row.picture"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" width="210"></el-table-column>
        <el-table-column prop="category" label="商品类别" width="150"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
        <el-table-column prop="salesvolume" label="销售量" width="120"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="150"></el-table-column>
      </el-table>
    </div>
    <tail></tail>
  </div>
</template>

<script>
import tail from './tail'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    deleteRow(id, index, rows) {
      this.$http
        .post("reducelike", {
          likeid: 0,
          commodityid: id,
          userid: JSON.parse(localStorage.getItem("user")).id
        })
        .then(res => {
          this.$parent.liketotal = res.data.total;
          this.$message.info({
            message: "取消收藏成功！！！",
            duration: 1000
          });
        });
      rows.splice(index, 1);
    },
    
  },
  created() {
    this.$http
      .post("getlikecommoditytotal", {
        likeid: 0,
        commodityid: 0,
        userid: JSON.parse(localStorage.getItem("user")).id
      })
      .then(res => {
        this.tableData = res.data;
      });
  },
  components: {
    tail
  },
};
</script>
<style >
.el-table th.el-table__cell>.cell{
  font-size: 16px;
}
.el-table tr th.el-table__cell:nth-child(2)>.cell{
  font-size: 16px;
  padding-left: 20px;
}
</style>
<style scoped>

@font-face {
  font-family: "iconfont"; /* Project id 2909663 */
  src: url("//at.alicdn.com/t/font_2909663_eamz0tznze.woff2?t=1635840294956")
      format("woff2"),
    url("//at.alicdn.com/t/font_2909663_eamz0tznze.woff?t=1635840294956")
      format("woff"),
    url("//at.alicdn.com/t/font_2909663_eamz0tznze.ttf?t=1635840294956")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
.icon-aixin:before {
  content: "\e619";
}
.ifont {
  font-size: 29px;
  color: #ec6b81;
  padding-left: 30px;
}
.title-page {
  width: 100%;
  position: relative;
}
.title-page img {
  width: 100%;
}
.title-text {
  position: absolute;
  top: 39%;
  left: 13%;
}
.title-text h1 {
  font-size: 40px;
  font-family: "El Messiri", sans-serif;
  font-weight: 500;
}
.title-text p span {
  color: #c2c2c2;
  font-family: "Raleway", sans-serif;
  font-size: 17px;
}
.title-text p {
  font-weight: 400;
}
.toptable {
  width: 1030px;
  margin: 40px auto;
}
</style>