<template>
  <div class="core">
    <div class="top">
      <div>个人订单</div>
    </div>
    <div class="bottom">
      <div class="type">
        <div :class="{iscolor:type==0}" @click="goOrder(0)">有效订单</div>
        <div :class="{iscolor:type==1}" @click="goOrder(1)">待支付</div>
        <div :class="{iscolor:type==2}" @click="goOrder(2)">待发货</div>
        <div :class="{iscolor:type==3}" @click="goOrder(3)">待收货</div>
        <div class="search">
          <el-input placeholder="请输入商品名称、订单号">
            <i slot="prefix" class="el-input__icon el-icon-search" style="line-height: 35px"></i>
          </el-input>
        </div>
      </div>
      <div class="data">
        <div class="datalist" v-for="(item, index) in orderlist" :key="index">
          <div class="list_top">
            <div>
              <div v-if="item.trade_type==1">待支付</div>
              <div v-else-if="item.trade_type==2">待发货</div>
              <div v-else-if="item.trade_type==3">待收货</div>
              <div v-else>已结束</div>
              <div class="detailed">
                <div>{{item.pay_time}}</div>
                <div>用户名：{{userdata.username}}</div>
                <div>订单号:{{item.order_number}}</div>
                <div>在线支付：{{item.pay_mode}}</div>
              </div>
            </div>
            <div class="money">
              订单金额：
              <span>{{item.pay_amount}}</span>
            </div>
          </div>
          <div class="list_bottom">
            <div>
              <div class="tu" v-for="(i, j) in item.list" :key="j">
                <img :src="i.picture" alt />
                <div>
                  <div>{{i.name}}</div>
                  <div>¥{{i.price}}×{{i.commnum}}</div>
                </div>
              </div>
            </div>
            <div>
              <button class="anniu" @click="payment(item.trade_type,item.id,item.pay_amount,index)">
                <span v-if="item.trade_type==1">付款</span>
                <span v-else-if="item.trade_type==2">提醒发货</span>
                <span v-else-if="item.trade_type==3">马上收货</span>
                <span v-else-if="item.trade_type==4">交易结束</span>
              </button>
              <br />
              <button class="anniu" @click="goDetailed(item.id)">订单详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "iorder",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      orderlist: [],
      type: 0
    };
  },
  methods: {
    goOrder(i) {
      if (i == 0) {
        this.$http
          .get("user/home/getOrderList", {
            params: { id: this.userdata.id, role: 0 }
          })
          .then(res => {
            this.orderlist = res.data;
            this.type = i;
          });
      } else {
        this.$http
          .get("user/home/getOrderListRole", {
            params: { id: this.userdata.id, role: i }
          })
          .then(res => {
            if (res.data.length == 0) {
              this.$message.info({
                message: "没有相应订单 ！！！",
                duration: 1500
              });
              return;
            }

            this.orderlist = res.data;
            this.type = i;
          });
      }
    },
    payment(i, id, money, index) {
      if (i == 1) {
        //i==1 待支付
        let is = confirm(money + "元  确定支付吗！！！！");
        if (is) {
          this.$http.get("order/isPayment", { params: { id } }).then(res => {
            this.orderlist[index].trade_type = 2;
            this.$message.success({
              message: "付款成功 感谢支持 ！！！",
              duration: 1500
            });
          });
        }
      } else if (i == 2) {
        console.log(id);
        this.$http
          .get("user/home/setOrderPay", { params: { id } })
          .then(res => {
            if (res.data == "ok") {
              this.$message.success({
                message: "提醒成功 ！！！",
                duration: 1500
              });
            }
          });
      } else if (i == 3) {
        let is = confirm("确定要收货吗！！！！");
        if (is) {
          this.$http
            .get("user/home/Receiving", { params: { id } })
            .then(res => {
              if (res.data == "ok") {
                this.orderlist[index].trade_type = 4;
                this.$message.success({
                  message: "收货成功 感谢支持 ！！！",
                  duration: 1500
                });
              }
            });
        }
      } else {
        this.$message.success({
          message: "交易结束 感谢支持 ！！！",
          duration: 1500
        });
      }
    },
    goDetailed(id) {
      this.$router.push({ path: "detailed", query: { id } });
    }
  },
  mounted() {
    this.goOrder(0);
  },
  created() {
    this.$http.post("user/home/shoppingcarttotal", this.userdata).then(res => {
      this.$parent.$parent.shoppingtotal = res.data;
    });
  }
};
</script>

<style scoped>
.iscolor {
  color: #ec6c82;
}
.core {
  height: 100%;
  background: #f8f8f8;
}
.top {
  border: 1px solid #e4e4e4;
  height: 9%;
  margin-bottom: 5px;
  background-color: rgb(255, 255, 255);
  padding-left: 15px;
  display: flex;
}
.bottom {
  border: 1px solid #e4e4e4;
  background-color: rgb(255, 255, 255);
  height: 89.5%;
  position: relative;
}
.top div:nth-child(1) {
  border-left: 2px solid #ec6c82;
  padding-left: 10px;
  margin: 14px 0 14px 18px;
}
.type {
  margin-top: 30px;
  display: flex;
  color: #757575;
  font-size: 16px;
}
.type > div {
  margin-left: 40px;
  cursor: pointer;
}
.type > div:hover {
  color: #ec6c82;
}
.search {
  position: absolute;
  right: 40px;
  top: 18px;
}
.data {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
  height: 400px;
  overflow: auto;
}
.data::-webkit-scrollbar {
  display: none;
}
.datalist {
  border: 1px solid #b0b0b0;
  height: 180px;
  margin-bottom: 23px;
}
.list_top {
  margin-top: 15px;
  margin-left: 30px;
  color: #757575;
  display: flex;
}
.detailed {
  margin-top: 15px;
  font-size: 12px;
  margin-bottom: 20px;
  display: flex;
}
.detailed > div {
  margin-right: 5px;
}
.list_bottom {
  display: flex;
  border-top: 1px solid #e0e0e0;
}
.list_bottom img {
  height: 69px;
  width: 69px;
  margin: 10px 0;
}
.money {
  font-size: 12px;
  margin-left: 31%;
  margin-top: 4%;
}
.money > span {
  font-size: 19px;
  color: #ec6c82;
}
.list_bottom > div:nth-child(1) {
  width: 700px;
  display: flex;
  overflow-x: auto;
  margin-right: 10px;
}
.list_bottom > div:nth-child(2) {
  width: 15%;
}
.tu {
  display: flex;
  width: 23%;
  font-size: 12px;
  margin-right: 2px;
}
.tu > div > div:nth-child(1) {
  color: #666666;
  margin-top: 20px;

  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tu > div > div:nth-child(2) {
  margin-top: 15px;
  color: #262626;
}
.anniu {
  width: 110px;
  margin-top: 14px;
  border: 1px solid black;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}
.anniu:hover {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}
</style>
