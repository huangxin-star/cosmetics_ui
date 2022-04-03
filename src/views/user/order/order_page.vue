<template>
  <div>
    <div class="confirm_order">
      <span>确认下单</span>
    </div>
    <div class="order">
      <div class="order_addres">
        <div>收货信息</div>
        <div class="addres">
          <div
            class="addresxx"
            v-for="(item, index) in addresList"
            :key="index"
            :class="{isborder:isaddres==item.id}"
            @click="clickAddres(item.id)"
          >
            <div>{{item.uname}}</div>
            <div>
              <div>{{item.region}}</div>
              <div>详情：{{item.detailed}}</div>
            </div>
            <div>电话：{{item.uphone}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：{{item.code}}</div>
          </div>
        </div>
        <div class="payment">
          <div>支付方式</div>
          <div>
            <div class="addresxx log" :class="{isborder:pay_mode==1}" @click="clickPaymode(1)">
              <img
                style="width: 32%;margin-top: 2px;margin-left: 7px;"
                src="../../../assets/img/log1.png"
                alt
              />

              <span style="position: absolute;">支付宝支付</span>
            </div>
            <div class="addresxx log" :class="{isborder:pay_mode==2}" @click="clickPaymode(2)">
              <img
                style="width: 20%;margin-top: 4.5px;margin-left: 20px;"
                src="../../../assets/img/log2.png"
                alt
              />
              <span style="position: absolute;margin-left: 9px;">微信支付</span>
            </div>
            <div class="addresxx log" :class="{isborder:pay_mode==3}" @click="clickPaymode(3)">
              <img
                style="width: 25%;margin-top: 2px;margin-left: 17px;"
                src="../../../assets/img/log3.png"
                alt
              />
              <span style="position: absolute;margin-left: 8px;">银联支付</span>
            </div>
            <div
              style="text-align: center;"
              class="addresxx"
              :class="{isborder:pay_mode==4}"
              @click="clickPaymode(4)"
            >货到付款</div>
          </div>
        </div>
      </div>
      <div class="order_xx">
        <div class="order_top">
          <span>订单内容</span>
          <span @click="goShop">返回购物车</span>
        </div>
        <div class="order_shop">
          <div class="shop" v-for="(item, index) in goodsdata.list" :key="index">
            <img :src="item.picture" alt />
            <div class="shop_xx">
              <div>{{item.name}}</div>
              <div>商品类别：{{item.category}}</div>
              <div>数量价格：¥{{item.price}}×{{item.cquantity}}</div>
            </div>
          </div>
        </div>
        <div class="order_money">
          <div>商品金额：</div>
          <div>{{goodsdata.moneyTotal}} 元</div>
        </div>
        <div class="order_money">
          <div>商品数量：</div>
          <div>{{goodsdata.quantityTotal}}件</div>
        </div>
        <div class="order_money">
          <div>运费：</div>
          <div>免运费</div>
        </div>
        <div class="order_money heji">
          <div>合计：</div>
          <div>{{goodsdata.moneyTotal}}.00元</div>
        </div>
        <div style="margin:0 12px">
          <el-button style="width:100%;" @click="placeOrder">确认下单</el-button>
        </div>
      </div>
    </div>
    <tail style="margin-top: 25px;"></tail>
  </div>
</template>

<script>
import tail from "../tail";
export default {
  components: {
    tail
  },
  name: "order_page",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      isaddres: 0,
      pay_mode: 1,
      addresList: 0, //地址信息
      goodsdata: {},
      ordernum: []
      // isborder:'isborder'
    };
  },
  methods: {
    clickAddres(i) {
      this.isaddres = i;
    },
    clickPaymode(i) {
      this.pay_mode = i;
    },
    goShop() {
      this.$router.push({ path: "/homeuser/shopping" });
    },
    placeOrder() {
      let alipayBean = {
        total_amount: this.goodsdata.moneyTotal,
        uid: this.userdata.id,
        dzid: this.isaddres
      };
      if (this.pay_mode == 1) {
        this.$http.post("order/alipay", alipayBean).then(resp => {
          // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
          const divForm = document.getElementsByTagName("div");
          if (divForm.length) {
            document.body.removeChild(divForm[0]);
          }
          const div = document.createElement("div");
          div.innerHTML = resp.data; // data就是接口返回的form 表单字符串
          document.body.appendChild(div);
          document.forms[0].setAttribute("target", "_top"); // 新开窗口跳转
          document.forms[0].submit();
        });
      } else {
        alipayBean.pay_mode = this.pay_mode;
        let is = confirm(this.goodsdata.moneyTotal + "元  确定支付吗！！！！");
        if (!is) {
          this.$http.post("order/alipayto", alipayBean).then(res => {
            this.$message.success({
              message: "下单成功 稍后请付款 ！！！",
              duration: 1500
            });
            this.$router.push("personal/iorder");
          });
        }else{
          this.$http.post("order/alipayGo", alipayBean).then(res => {
            this.$message.success({
              message: "下单成功 感谢支持 ！！！",
              duration: 1500
            });
            this.$router.push("personal/iorder");
          });
        }
        
      }
    }
  },
  created() {
    console.log(this.$route.query);
    this.goodsdata = JSON.parse(this.$route.query.res);
    this.$http
      .post("user/home/getUserAddress", { id: this.userdata.id })
      .then(res => {
        if (res.data[0] == undefined) {
          alert("暂无地址请去个人中心添加");
          this.$router.push({ path: "/homeuser/personal/address" });
        }
        this.addresList = res.data;
        this.isaddres = this.addresList[0].id;
      });
  }
};
</script>

<style scoped>
div {
  color: #262626;
}
.confirm_order {
  margin-top: 110px;
  font-size: 16px;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 20px;
}
.confirm_order > span {
  margin-left: 13%;
}
.order {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.order_addres {
  width: 40%;
  height: 500px;
  margin-right: 20px;
}
.order_addres > div:nth-child(1) {
  border-bottom: 1px solid #dbdbdb;
  padding-top: 10px;
  padding-bottom: 17px;
}
.addres {
  padding: 15px 0;
  height: 297px;
  width: 100%;
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
  overflow: auto;
}
.addres::-webkit-scrollbar {
  display: none;
}
.addres > div {
  height: 120px;
  width: 265px;
  margin: 12px 9px 12px 15px;
  cursor: pointer;
}
.addresxx > div {
  margin: 10px 0 15px 14px;
}
.addresxx {
  border: 2px solid #dbdbdb;
}
.isborder {
  border: 2px solid #ec6c82;
}
.order_xx {
  width: 24%;
  height: 600px;
  /* background: #ec6c82; */
  margin-left: 70px;
}
.order_top {
  padding: 10px;
}
.order_top > span:nth-child(1) {
  font-size: 16px;
}
.order_top > span:nth-child(2) {
  margin-left: 63%;
  font-size: 12px;
  cursor: pointer;
}
.order_top > span:nth-child(2):hover {
  color: #ec6c82;
}
.order_shop {
  height: 300px;
  /* background: blanchedalmond; */
  overflow-y: auto;
  cursor: pointer;
}
.order_shop::-webkit-scrollbar {
  display: none;
}
.shop {
  display: flex;
  font-size: 12px;
  padding: 10px;
  border-top: 1px solid #dbdbdb;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 7px;
}
.shop > img {
  width: 69px;
  height: 69px;
}
.shop_xx > div {
  color: #777777;
  line-height: 22px;
  margin-left: 10px;
}
.shop_xx > div:nth-child(1) {
  color: #262626;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order_money {
  display: flex;
  justify-content: space-between;
  /* margin-top: 15px; */
  font-size: 12px;
  color: #262626;
  margin: 13px;
}
.heji {
  border-top: 1px solid #dbdbdb;
  font-size: 17px;
  padding: 18px 0;
}
.heji > div:nth-child(2) {
  color: #ec6c82;
}
.payment {
  margin-top: 30px;
}

.payment > div:nth-child(1) {
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 14px;
}
.payment > div:nth-child(2) {
  padding-top: 22px;
  display: flex;
  font-size: 13px;
}
.payment > div:nth-child(2) > div {
  line-height: 34px;
  height: 35px;
  width: 130px;
  margin-right: 22px;
  cursor: pointer;
  position: relative;
}
</style>