<template>
  <div>
    <div class="title-page">
      <img src="../../assets/img/banner-1.jpg" alt />
      <div class="title-text">
        <h1>Shopping_Cart</h1>
        <p>
          <span>首页</span> / Shop / Shopping_Cart
        </p>
      </div>
    </div>
    <div class="toptable">
      <el-table :data="tableData" style="width: 1150">
        <el-table-column label width="130">
          <template slot-scope="scope">
            <i class="el-icon-delete icon" @click="deleteRow(scope.row.id,scope.$index, tableData)"></i>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="150">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.picture"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名" width="210"></el-table-column>
        <el-table-column prop="category" label="商品类别" width="120"></el-table-column>
        <!-- scope.row.salesvolume -->
        <el-table-column label="商品数量" width="140">
          <template slot-scope="scope">
            <div class="num">
              <div @click="reduceNum(scope.$index,scope.row.cid)">-</div>
              <div>{{scope.row.cquantity}}</div>
              <div @click="plusNum(scope.$index,scope.row.cid)">+</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.price*scope.row.cquantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前库存" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.stock}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caddtime" label="添加时间" width="150"></el-table-column>
      </el-table>
    </div>
    <div class="order">
      <!-- {{moneyTotal}}{{quantityTotal}} -->
      <div>
        一共有
        <span>{{quantityTotal}}</span>护肤品 ，一共要
        <span>{{moneyTotal}}</span>元人民币
      </div>
      <div @click="orderpage">立即下单</div>
    </div>
    <tail></tail>
  </div>
</template>

<script>
import tail from "./tail";
export default {
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      tableData: [],
      moneyTotal: 0,
      quantityTotal: 0
    };
  },
  methods: {
    getShoppingCartList() {
      this.$http
        .post("user/home/getShoppingCartList", { id: this.userdata.id })
        .then(res => {
          this.tableData = res.data;
          this.getTotal();
        });
    },
    deleteRow(id, index, rows) {
      this.$http
        .post("user/home/deleteShoppingCartList", {
          cid: id,
          uid: this.userdata.id
        })
        .then(res => {
          this.$parent.shoppingtotal = res.data;
          this.$message.info({
            message: "删除购物车物品成功！！！",
            duration: 1500
          });
        });
      rows.splice(index, 1);
      this.getTotal();
    },
    plusNum(i, id) {
      if (this.tableData[i].cquantity == this.tableData[i].stock) {
        this.$message.error({
          message: "亲！ 库存不够了哦",
          duration: 1500
        });
        return;
      }
      this.tableData[i].cquantity++;
      this.$http.get("user/home/increaseShoppingCart", {
        params: { cid: id, uid: this.userdata.id }
      });
      this.getTotal();
    },
    reduceNum(i, id) {
      if (this.tableData[i].cquantity == 1) {
        this.$message.error({
          message: "亲！ 不喜欢可以删除",
          duration: 1500
        });
        return;
      }
      this.tableData[i].cquantity--;
      this.$http.get("user/home/reduceShoppingCart", {
        params: { cid: id, uid: this.userdata.id }
      });
      this.getTotal();
    },
    getTotal() {
      this.quantityTotal = 0;
      this.moneyTotal = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        this.moneyTotal =
          this.moneyTotal +
          this.tableData[i].price * this.tableData[i].cquantity;
        this.quantityTotal = this.quantityTotal + this.tableData[i].cquantity;
      }
    },
    orderpage() {
      let res = JSON.stringify({
        list: this.tableData,
        moneyTotal: this.moneyTotal,
        quantityTotal: this.quantityTotal
      });
      this.$router.push({ path: "/homeuser/orderpage", query: {res} });
    }
  },
  created() {
    this.getShoppingCartList();
  },

  components: {
    tail
  }
};
</script>

<style scoped>
.icon {
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
  right: 13%;
}
.title-text h1 {
  font-size: 40px;
  font-family: "El Messiri", sans-serif;
  font-weight: 500;
}
.title-text p span {
  color: #838383;
  font-family: "Raleway", sans-serif;
  font-size: 17px;
}
.title-text p {
  font-weight: 400;
}
.toptable {
  width: 1150px;
  margin: 40px auto;
}
.num {
  justify-content: space-between;
  display: flex;
  width: 95px;
  border: 1px solid rgb(0, 0, 0);
  cursor: pointer;
  height: 32px;
  text-align: center;
  line-height: 24px;
  margin-left: -10px;
}
.num div {
  width: 33.33%;
  font-size: 23px;
}
.num div:nth-child(1) {
  border-right: 1px solid rgb(0, 0, 0);
}
.num div:nth-child(2) {
  font-size: 15px;
  line-height: 30px;
}
.num div:nth-child(3) {
  border-left: 1px solid rgb(0, 0, 0);
}
.num div:nth-child(1):hover,
.num div:nth-child(3):hover {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}
.el-table .cell > span {
  margin-left: 20px;
}
.order {
  width: 75%;
  display: flex;
  background-color: #f5f7fa;
  position: fixed;
  bottom: 0;
  height: 50px;
  right: 12.5%;
  justify-content: right;
  align-items: center;
  z-index: 2;
}
.order > div:nth-child(1) {
  margin-right: 25px;
}
.order span {
  margin: 0 10px;
  font-size: 20px;
  color: #f15c75;
}
.order > div:nth-child(2) {
  cursor: pointer;
  height: 100%;
  width: 104px;
  border-radius: 10px;
  background-color: #c0c0c0;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: STSong;
}
</style>