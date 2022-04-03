<template>
  <div>
    <div class="wai">
      <div class="jies">品牌介绍...</div>
      <div class="store">
        <div class="store_jies">
          <img class="bj" src="../../assets/bj.png" alt />
          <div class="bon">
            <div class="title">The ordinary</div>
            <div class="wenzhi">
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Ordinary是加拿大Deciem旗下的一个护肤平价品牌，优点是性价比较高。坚持“有诚意的成分美妆”理念。The Ordinary总部和运营中心位于加拿大，坐落于加拿大安大略省多伦多市里士满东大街517号。以守护肌肤健康为核心。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Ordinary的产品就用了很便宜又很有效的成分，浓度都非常高，俗称猛药，而且产品涵盖面特别多，可以说要什么有什么，不管你是油皮、干皮，痘痘皮、混合皮，还是敏感皮，肯定能从中找到合适自己的产品，从基础的抗氧化如维c、烟酰胺、硫辛酸、维a醇，到各种去角质的酸，各种浓度的果酸乳酸水杨酸到保湿剂如NMF、透明质酸钠，角鲨烷，基础油比如阿甘油到美白成分比如熊果苷、壬二酸；到较高端的抗老成分如胜肽等等，比较热门类的成分都可以找得到。
            </div>
            <div class="shangp">
              <vue-seamless-scroll
                :data="newsList"
                :class-option="optionLeft"
                class="seamless-warp2"
              >
                <ul>
                  <li v-for="(item, index) in newsList" :key="index" @click="setcommodity(item)">
                    <div class="likediv">
                      <div>
                        <img :src="item.picture" alt />
                      </div>
                      <div>{{item.name}}</div>
                    </div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div style="margin-top:60px" class="store_jies">
          <div class="bon">
            <div style="text-align:right;" class="title">DECIEM NIOD&nbsp;&nbsp;&nbsp;</div>
            <div class="wenzhi">
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DECIEM创建于2012年，主打科技护肤理念，短短几年内就通过社交媒体、美妆达人、当红明星等多种渠道，以极高的口碑首先火遍英国美妆圈，然后进一步扩散到整个欧美美妆圈。它家产品最大的特点可以归纳为一个字：“快”，因为很多体验过的人都表示，他们可以在短时间内看到比较显著的成效，而不像某些换了味道不换成分而且成分还没有什么成效的牌子（真诚善良的委媛才没有在黑碧欧泉什么的）。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DECIEM推出NIOD这个子品牌，将它家的科技护肤理念运用到最容易显现效果的精华类产品中，专注于打造具有两个高效——“高效率”、“高成效”——的面部精华产品。这让像委媛这种没有时间（其实是懒癌晚期）花几百个工序呵护这张老脸的人，仿佛抓到了一根救命稻草。
            </div>
            <div class="shangp">
              <vue-seamless-scroll
                :data="newsListTo"
                :class-option="optionLeftTo"
                class="seamless-warp2"
              >
                <ul>
                  <li v-for="(item, index) in newsListTo" :key="index" @click="setcommodity(item)">
                    <div class="likediv">
                      <div>
                        <img :src="item.picture" alt />
                      </div>
                      <div>{{item.name}}</div>
                    </div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
          <img class="bj" src="../../assets/img/blogto.png" alt />
          
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
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    ShoppingInformation,
    tail,
    vueSeamlessScroll
  },
  name: "store",
  data() {
    return {
      isActive: false,
      commoditydata: {},
      newsList: [
        "1q",
        "2e",
        "4r",
        "5t",
        "6y",
        "7u",
        "8i",
        "9i",
        "10ww",
        "123e",
        "123y",
        "123ww"
      ],
      newsListTo: [
        "1q",
        "2e",
        "4r",
        "5t",
        "6y",
        "7u",
        "8i",
        "9i",
        "10ww",
        "123e",
        "123y",
        "123ww"
      ],
    };
  },
  mounted() {
    this.$http.get("user/newsList").then(res => {
      console.log(res.data);
      this.newsList = res.data.newsList;
      this.newsListTo=res.data.newsListTo
    });
  },
  methods: {
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
        step: 0.4
      };
    
    },
    optionLeftTo() {
      return {
        direction: 3,
        limitMoveNum: 2,
        hoverStop: true,
        step: 0.4
      };
  }

  }
};
</script>
<style scoped>
.seamless-warp2 {
  height: 250px;
  width: 700px;
  overflow: hidden;
  
}
.seamless-warp2 li {
  height: 230px;
  margin-right: 8px;
  margin-bottom: 10px;
  float: left;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
}
.seamless-warp2 li:hover {
  border: 1px solid rgb(0, 0, 0);
}
.likediv {
  width: 180px;
}
.likediv img {
  width: 178px;
  margin-top: 4px;
}
.likediv > div:nth-child(2) {
  font-size: 10px;
  width: 78%;
  margin: auto;
  color: #777;
}
</style>
<style scoped>
/* .wai {
} */
.jies {
  margin-top: 120px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 40px;
  padding-left: 180px;
}
.bj {
  width: 330px;
}
.store {
  width: 70%;
  margin: auto;
}
.store_jies {
  display: flex;
}
.bon {
  width: 100%;
}
.title {
  font-size: 33px;
 
}
.wenzhi {
  font-size: 17px;
  padding: 25px;
  color: #777;
}
.shangp {
  width: 100%;
  padding: 0 20px;
}
</style>