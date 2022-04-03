<template>
  <div>
    <div class="title-page">
      <img src="../../assets/img/blog.jpg" alt />
      <div class="title-text">
        <h1>Go shopping</h1>
        <p>
          <span>首页</span> / Shop / Go shopping
        </p>
      </div>
    </div>
    <div class="to">
      <div class="left">
        <div>
          <div class="sidebar-title">Brand</div>
          <div @click="Brand('全部')" class="left_to" :class="{isColor:options=='全部'}">
            <div>全部</div>
            <div>{{closeDate.optionsTo}}</div>
          </div>
          <div
            :class="{isColor:options==item.username}"
            @click="Brand(item.username)"
            class="left_to"
            v-for="(item, index) in closeDate.options"
            :key="index"
          >
            <div>{{item.username}}</div>
            <div>{{item.sum}}</div>
          </div>
        </div>
        <div>
          <div style="margin-top:35px;margin-bottom:25px;" class="sidebar-title">Type</div>
          <el-radio-group v-model="radio" style="flex-direction:column;display: flex;">
            <el-radio style="margin-bottom: 1.35rem;" label="1">全部</el-radio>
            <el-radio
              v-for="(item, index) in closeDate.type"
              :key="index"
              style="margin-bottom: 1.35rem;"
              :label="item.type"
            >{{item.type}}</el-radio>
          </el-radio-group>
        </div>
        <div class="block">
          <div style="margin-top:15px;margin-bottom:6px;" class="sidebar-title">Price</div>
          <el-slider @change="slider" v-model="value" range :max="1000"></el-slider>
        </div>
        <div>
          <img style="width:200px;margin-top:25px;" src="../../assets/bj.png" alt />
        </div>
      </div>
      <div class="right">
        <div class="right_one">
          <div>随便选购！！！ 欢迎下单</div>
          <div>
            <el-select size="small" v-model="options" placeholder="品牌选择！">
              <el-option
                v-for="item in closeDate.options"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="right_two">
          <!-- @click="setcommodity(item)" -->

          <div
            @click="setcommodity(item)"
            class="Item_block"
            v-for="(item, index) in list"
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
            <div
              style="text-align:left;font-size: 12px;margin-left:24px;margin-top:14px;color:#999999"
            >
              <span>{{item.brand}}</span>
            </div>
          </div>
        </div>
        <el-pagination
          class="pagination-container"
          @size-change="sizeChange"
          @current-change="currentChange"
          background
          :current-page="current"
          :page-size="size"
          :total="count"
          layout="prev, pager, next, jumper"
        />
      </div>
    </div>
    <tail style="margin-top: 20px;"></tail>
    <ShoppingInformation :commodity="commoditydata" v-if="isActive"></ShoppingInformation>
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
  name: "wares",
  data() {
    return {
      count: 0,
      current: 1,
      size: 12,
      options: "全部",
      radio: "1",
      value: [0, 1000],
      list: [],
      closeDate: {},
      isActive: false
    };
  },
  watch: {
    radio() {
      this.getList();
    },
    options() {
      this.getList();
    }
  },
  methods: {
    sizeChange(size) {
      this.size = size;
      this.getList();
    },
    currentChange(current) {
      this.current = current;
      this.getList();
    },
    getList() {
      this.$http
        .get("user/home/getWaresList", {
          params: {
            current: this.current,
            size: this.size,
            options: this.options,
            type: this.radio,
            priceA: this.value[0],
            priceB: this.value[1]
          }
        })
        .then(res => {
          // console.log(res.data);
          this.list = res.data.list;
          this.count = res.data.count;
          //   console.log(res.data.length);

          //   this.list = res.data.list;
          // this.count = res.data.count;
        });
    },
    Brand(i) {
      this.options = i;
      // this.getList()
    },
    slider() {
      // console.log(this.value);
      this.getList();
    },
    setcommodity(item) {
      this.commoditydata = item;
      this.isActive = true;
    }
  },
  created() {
    this.$http.get("home/getBrandNum").then(res => {
      this.closeDate = res.data;
     
    });
    this.getList();
  }
};
</script>
<style>
  .el-slider__button-wrapper{
    z-index: 3;
  }
</style>
<style scoped>
.isColor {
  color: #ec6b81;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
div {
  font-family: "Roboto", sans-serif;
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
.to {
  display: flex;
  width: 75%;
  /* background: aqua; */
  margin: 40px auto;
}
.left {
  width: 21%;
  color: #555;
  /* background-color: beige; */
}
.right {
  width: 77%;
  margin-left: 2%;
}
.sidebar-title {
  color: #111;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 10px;
}

.left_to {
  font-size: 14px;
  display: flex;
  padding: 10px 0;
  line-height: 1;
  text-transform: capitalize;
  margin-bottom: 5px;
  cursor: pointer;
}
.left_to > div:nth-child(2) {
  margin-left: auto;
}
.left_to:hover {
  color: #ec6b81;
}
.right_one {
  display: flex;
}
.right_one > div:nth-child(2) {
  margin-left: auto;
}
.right_one > div:nth-child(1) {
  color: #777;
  font-size: 14px;
  text-transform: capitalize;
  margin-left: 20px;
}
.right_two {
  display: flex;
  margin-top: 30px;
  justify-content: left;
  flex-wrap: wrap;
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