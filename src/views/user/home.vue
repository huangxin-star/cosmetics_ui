<template>
  <div>
    <div class="lunbo">
      <el-carousel :interval="6000" height="450px">
        <el-carousel-item v-for="item in listimglbt" :key="item">
          <img :src="item" style="width: 100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="commodity">
      <h3>商品推荐</h3>
      <ul class="product_carousel_tabs">
        <li :class="{libkd:changebkd == '0'}" @click="leftChange('0')">超值推荐</li>
        <li :class="{libkd:changebkd == '1'}" @click="leftChange('1')">大众喜爱</li>
        <li :class="{libkd:changebkd == '2'}" @click="leftChange('2')">大牌精华</li>
        <li :class="{libkd:changebkd == '3'}" @click="leftChange('3')">物美价廉</li>
      </ul>
      <div style="display: flex;justify-content: center;">
        <div class="commodity_block">
          <div
            v-for="(item, index) in listcommodity"
            :key="index"
            class="Item_block"
            @click="setcommodity(item)"
          >
            <img style="height: 174px;width: 174px;margin: 0 auto;" :src="item.picture" alt />
            <div style="text-align:left;margin: 6px 19px;height:43px;">
              <span style="font-weight: 400;font-size: 13px;">{{item.name}}</span>
            </div>
            <div style="text-align:left;margin: 11px 20px;display: flex;">
              <span
                style="line-height: 24px;font-weight: 700;font-size: 16px;color: #333;"
              >{{item.price}} 元</span>
              <div style="margin-left: 61px">
                <span style="font-size: 13px;color:#999999">销量：</span>
                <span style="font-size: 14px;">{{item.salesvolume}}</span>
              </div>
            </div>
            <div style="text-align:left;font-size: 14px;margin-left:20px;color:#999999">
              <span>{{item.brand}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 230px;">
      <div class="ghs">
        <img src="../../assets/img/bg-review.jpg" alt />
        <div class="ghs_lbt">
          <el-carousel
            :interval="5000"
            arrow="never"
            height="360px"
            style="width: 75%;margin: auto;display: block;"
          >
            <el-carousel-item
              v-for="(item, index) in listsupplier"
              :key="index"
              style="text-align: center;"
            >
              <div style="display: flex;flex-direction: column;align-items: center;">
                <div class="ghs_lbt_head" style="z-index: 4;">
                  <img :src="item.head" alt />
                </div>

                <div class="ghs_lbt_name" style="z-index: 4;">
                  <span>{{item.name}}</span>
                </div>
                <p class="text-center" style="z-index: 4;">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </p>
                <div class="ghs_lbt_jies" style="z-index: 4;">
                  <span>{{item.introduce}}</span>
                </div>
              </div>
              <div class="beij"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="islike">
      <div>猜你喜欢</div>
      <vue-seamless-scroll :data="newsList" :class-option="optionLeft" class="seamless-warp2">
        <ul>
          <li v-for="(item, index) in newsList" :key="index" style="width: 194px;" @click="setcommodity(item)">
            <div class="likediv">
              <div>
                <img :src="item.picture" alt />
              </div>
              <div>{{item.name}}</div>
              <div>
                <span>{{item.price}}元</span>
                <span>{{item.brand}}</span>
              </div>
            </div>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <tail></tail>
    <ShoppingInformation :commodity="commoditydata" v-if="isActive"></ShoppingInformation>
  </div>
</template>

<script>
import tail from './tail'
import ShoppingInformation from "./Shopping_information";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    ShoppingInformation,
    vueSeamlessScroll,
    tail
  },

  data() {
    return {
      listimglbt: [
        require("../../assets/img/homecarousel1.jpg"),
        require("../../assets/img/homecarousel2.png"),
        require("../../assets/img/homecarousel3.jpg")
      ],
      listsupplier: [
        {
          head: require("../../assets/img/tox1.jpg"),
          name: "The ordinary",
          introduce:
            "  The Ordinary是加拿大Deciem [1]  旗下的一个护肤平价品牌，优点是性价比较高。The Ordinary总部和运营中心位于加拿大，坐落于加拿大安大略省多伦多市里士满东大街517号。以守护肌肤健康为核心，The Ordinary拥有管理、设计、生产、销售等系统协调能力，围绕护肤消费场景，展开多元化产品服务"
        },
        {
          head: require("../../assets/img/tox2.jpg"),
          name: "ELEMIS",
          introduce:
            "Elemis，1989年诞生的英国水疗及护肤品牌，是英国专业水疗护理的先锋。Elemis全线采用有机提取物、香薰油等天然活性成分，通过先进的护肤技术及其独特专利配方，针对不同皮肤及身体状况有效治疗皮肤。深受国内外明星名媛界如贝嫂、杨千嬅等等青。Elemis针对不同肤质和护肤功效有严格划分的产品线，比如Pro-Collagen骨胶原、Tri-enzyme三重酵素、Pro-Radiance亮采系列等等。基本熟悉elemis都人手必备骨胶原卸妆膏。"
        },
        {
          head: require("../../assets/img/tox3.jpg"),
          name: "NIOD",
          introduce:
            "NIOD是来自加拿大新兴个护品牌公司DECIEM旗下的品牌，玩转生物黑科技，主打各种功效的面部精华。功效可媲美医美微整形，不用动刀就可以深层修复肌肤，恢复肌肤年轻态。它的“高精尖”配方中都是一些创新、高效成分，比如明星成分蓝铜胜肽、玻尿酸等等，都是公认的猛药级好物。这个品牌的系列产品简直可以用4个词形容：快速、高效、惊艳、换肤，在界内也有“微整形”品牌之称。"
        },
        {
          head: require("../../assets/img/tox4.jpg"),
          name: "Eucerin",
          introduce:
            "Eucerin (优色林) 的故事始于一个多世纪前的1900年，德国皮肤科专家Lifschütz博士研制出一种新型皮肤保湿乳化剂并获得专利。与早先的护肤产品不同，Lifschütz博士研发的这种药膏的质地滑润，功效稳定无刺激，能为皮肤提供卓越的保护和调理功效。很快这个产品就被改成Eucerin “优色林”（希腊文中“美丽的蜡”的意思）。第一批在德国上市的产品还包括：治疗伤痛的优色林搽粉，优色林碘膏和优色林肥皂。"
        }
      ],
      listcommodity: [],
      changebkd: "0",
      isActive: false,
      commoditydata: {},
      newsList: [
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        },
        {
          name: "10%烟酰胺 + 1%锌精华 30ml 收敛毛孔",
          price: "43",
          picture:
            "https://source-feelunique.azoyacdn.com/media/catalog/product/t/h/The_Ordinary_Niacinamide_10____Zinc_1__30ml_1521119013.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU=",
          brand: "The ordinary"
        }
      ]
    };
  },

  created() {
    this.$http.post("specialcommodity", "0").then(
      res => {
        this.listcommodity = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.$http.get("getcommodityiike").then(res=>{
      this.newsList=res.data
    })
  },
  methods: {
    leftChange(i) {
      this.changebkd = i;
      this.$http.post("specialcommodity", i).then(
        res => {
          this.listcommodity = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    setcommodity(item) {
      this.commoditydata = item;
      this.isActive = true;
    }
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        hoverStop: true,
        step:0.4,

      };
    }
  }
};
</script>
<style scoped>
.islike {
  margin-top: -450px;
  text-align: center;
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
}
.seamless-warp2 {
  height: 290px;
  width: 75%;
  margin: 20px auto;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
}
.seamless-warp2 li {
  height: 267px;
  margin-right: 5px;
  float: left;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
}
.seamless-warp2 li:hover {
  border: 1px solid rgb(0, 0, 0);
}

.likediv img {
  width: 174px;
  margin-top: 4px;
}
.likediv > div:nth-child(2) {
  font-size: 14px;
  padding: 5px 6px;
  font-weight: 400;
  height: 45px;
}
.likediv > div:nth-child(3) {
  font-size: 16px;
  padding: 0 4px;
}

.likediv > div > span:nth-child(1) {
  margin-right: 55px;
}
.likediv > div > span:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  color: rgb(153, 153, 153);
}
</style>
<style>
li .el-carousel__button {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: rgb(204, 204, 204);
  z-index: 4;
}
.el-carousel__item {
  background-color: transparent;
  /* background-color: rgb(80, 64, 52); */
}
/* body{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
} */
</style>

<style scoped>
.lunbo {
  margin-top: 10px;
}
.ghs {
  width: 100%;
  margin-top: 3%;
}
.ghs img {
  width: 100%;
  margin-bottom: 100px;
}
.ghs_lbt {
  position: relative;
  top: -508px;
  z-index: 2;
  text-align: center;
  width: 100%;
  margin: auto;
}
.ghs_lbt_head {
  width: 80px;
  height: 80px;
}
.ghs_lbt_head img {
  border-radius: 50%;
}
.beij {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 300px;
  position: absolute;
  top: 60px;
}
.ghs_lbt_name {
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 500;
}
.ghs_lbt_jies {
  color: #212529;
  width: 75%;
}
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
.text-center {
  margin-top: 0;
}
.text-center i {
  color: #ffa6a8;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-style: normal;
}
.fa-star:before {
  content: "\f005";
}
.commodity {
  width: 100%;
  height: 500px;
  margin-top: 3%;
  text-align: center;
}
.commodity h3 {
  font-size: 20px;
  color: #333;
  text-align: center;
}
li {
  display: inline-block;
}
.product_carousel_tabs {
  text-align: center;
  width: 100%;
  padding: 0;
  cursor: pointer;
}
.product_carousel_tabs li {
  margin: 0 23px;
  margin-top: 4px;
  font-size: 14px;
  transition: 0.5s;
}
.product_carousel_tabs li:hover {
  border-bottom: rgb(0, 0, 0) 1.5px solid;
  display: inline-block;
  padding-bottom: 8px;
}
.libkd {
  border-bottom: rgb(0, 0, 0) 1.5px solid;
  display: inline-block;
  padding-bottom: 8px;
  font-size: 13px;
}
.commodity_block {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  flex-wrap: wrap;
  width: 1200px;
}
.Item_block {
  border: 1px solid rgb(255, 255, 255);
  box-sizing: border-box;
  width: 214px;
  height: 300px;
  margin: 0 5px;
}
.Item_block:hover {
  border: 1px solid rgb(0, 0, 0);
}
</style>
