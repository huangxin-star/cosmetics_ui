<template>
  <div class="core">
    <div class="top">
      <div>订单详情</div>
    </div>
    <div class="bottom">
      <div>
        订单号：
        <span style="font-size:16px">{{orderlist.order_number}}</span>
      </div>
      <div style="display: flex;">
        <div class="imglist" v-for="(item, index) in orderlist.list" :key="index">
          <img
            :src="item.picture"
            alt
          />
          <div>
            <div class="introduce">{{item.name}}</div>
            <div>¥{{item.price}}.00×{{item.commnum}}</div>
            <div v-if="item.otype==1">待支付</div>
            <div v-if="item.otype==2">待发货</div>
            <div v-if="item.otype==3">待收货</div>
            <div v-if="item.otype==4">交易结束</div>
          </div>
        </div>
    
      </div>

      <div>
        <div style="font-size:15px;color:#262626">收货信息</div>
        <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{address.uname}}</div>
        <div>联系电话：{{address.uphone}}</div>
        <div>收货地址：{{address.region}} {{address.detailed}}</div>
      </div>
      <div>
        <div style="font-size:15px;color:#262626">支付方式及送货时间</div>
        <div>支付方式：{{orderlist.pay_mode}}支付</div>
        <div>送货时间：不限送货时间 预计三四天</div>
      </div>
      <div>
        <div>
          <div>商品总价：¥{{orderlist.pay_amount}}&nbsp;&nbsp;&nbsp;运费：¥0</div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailed",
  data() {
      return {
          orderlist:"",
          address:"",
      }
  },
  mounted(){
      console.log();
      let id=this.$route.query.id
      this.$http.get("user/home/getOrderDetailed",{params:{id}}).then(res=>{
          this.orderlist=res.data.orderInfo
          this.address=res.data.address
          console.log(this.address);
          
      })
  }
};
</script>

<style scoped>
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
.bottom > div {
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 38px;
}
.bottom > div:nth-child(1) {
  margin-top: 20px;
  font-size: 18px;
  padding-bottom: 15px;
}
.imglist {
  display: flex;
  padding: 15px 0;
}
.imglist > img {
  width: 65px;
  height: 65px;
}
.imglist > div {
  font-size: 13px;
  color: #757575;
}
.imglist > div > div {
  margin-bottom: 7px;
}
.introduce {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottom > div:nth-child(3) {
  color: #757575;
  font-size: 14px;
  padding-top: 2px;
  padding-bottom: 12px;
}
.bottom > div:nth-child(3) > div {
  margin-bottom: 7px;
}
.bottom > div:nth-child(4) {
  color: #757575;
  font-size: 14px;
  padding-top: 2px;
  padding-bottom: 12px;
}
.bottom > div:nth-child(4) > div {
  margin-bottom: 7px;
}
.bottom > div:nth-child(5) {

  font-size: 15px;
  padding-top: 12px;
  padding-bottom: 16px;
}
</style>