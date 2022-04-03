<template>
  <div>
    <div class="wai">
      <div
        @click="setcommodity(item)"
        class="Item_block"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div>
          <img style="height: 154px;width: 154px;" :src="item.picture" alt />
        </div>
        <div class="block_name">
          <span>{{item.name}}</span>
        </div>
        <div style="margin: 6px 22px;display: flex;">
          <div class="block_price">
            <span>{{item.price}} 元</span>
          </div>
          <div style="margin-left: 46px">
            <span style="font-size: 13px;color:#999999">销量：</span>
            <span style="font-size: 14px;">{{item.salesvolume}}</span>
          </div>
        </div>
        <div style="text-align:left;font-size: 12px;margin-left:24px;margin-top:14px;color:#999999">
          <span>{{item.brand}}</span>
        </div>
      </div>
    </div>
    <ShoppingInformation :commodity="commoditydata" v-if="isActive"></ShoppingInformation>
    <tail></tail>
  </div>
</template>
 
<script>
import tail from "./tail";
import ShoppingInformation from "./Shopping_information";
export default {
  components: {
    ShoppingInformation,
    tail
  },
  name: "alone",
  data() {
    return {
      isActive: false,
      dataList: []
    };
  },
  methods: {
    setcommodity(item) {
      this.commoditydata = item;
      this.isActive = true;
    }
  },
  created() {
    this.dataList = this.$route.params.res;
    console.log(this.$route.params.res);
  }
};
</script>

<style scoped>
.wai {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 72%;
  margin:130px auto;
}
.Item_block {
  border: 1px solid rgb(255, 255, 255);
  box-sizing: border-box;
  width: 200px;
  height: 282px;
  margin: 2px 9px;
  /* background: blue; */
}
.Item_block > div > img {
  margin-left: 23px;
}
.Item_block:hover {
  border: 1px solid rgb(0, 0, 0);
}
.block_name {
  text-align: center;
  margin: 8px 20px;
  height: 43px;
}
.block_name > span {
  font-weight: 400;
  font-size: 13px;
}
.block_price {
  line-height: 24px;
  font-weight: 700;
  font-size: 16px;
  color: rgb(51, 51, 51);
}
.block {
  width: 80%;
}
</style>