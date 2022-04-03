<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-dialog-img">
        <img :src="commodity.picture" alt />
      </div>
      <div class="modal-right">
        <div class="modal-right-name">{{commodity.name}}</div>
        <div>
          <p class="text-center">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
        </div>
        <div class="modal-right-jies">
          <span style="font-size:17px;font-weight: 500;">介绍：</span>
          {{commodity.introduce}}
        </div>
        <div class="datainformation">
          <div>
            <span>价格：</span>
            {{commodity.price}}
          </div>
          <div>
            <span>销量：</span>
            {{commodity.salesvolume}}
          </div>
          <div>
            <span>库存：</span>
            {{commodity.stock}} &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              style="font-size:13px"
            >"由{{commodity.brand}}公司发货大概三四天"</span>
          </div>
        </div>
        <div>
          <div class="btn-group">
            <button style="border-right: 0;" type="button" class="prev" @click="reducenum">-</button>
            <button style="border-right: 0;" type="button">{{shoppingnum}}</button>
            <button type="button" class="next" @click="plusnum(commodity.stock)">+</button>
          </div>
          <div class="btn-group">
            <div class="add-to-cart" @click="addShopping(commodity.id)">
              &nbsp;&nbsp;&nbsp;&nbsp;ADD TO CART
              <p>
                <i class="el-icon-shopping-bag-1"></i>
              </p>
            </div>
            <div class="love" @click="clilove">
              <i class="icon-aixin iconfont" :class="{lovecolor:islovecolor}"></i>
              <sup class="shop-count">{{commodity.preference}}</sup>
            </div>
          </div>
        </div>
      </div>
      <div class="elicon" @click="toisActive">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingnum: 0,
      islovecolor: false
    };
  },
  props: ["commodity"],
  methods: {
    toisActive() {
      this.$parent.isActive = false;
      console.log(this.$parent.isActive);
      
      
    },
    plusnum(i) {
      if (this.shoppingnum < i) {
        this.shoppingnum++;
      } else {
        alert("已经超出库存！！留点给别人");
      }
    },
    reducenum() {
      if (this.shoppingnum != 0) {
        this.shoppingnum--;
      } else {
        this.shoppingnum = 0;
      }
    },
    clilove() {
      if (this.islovecolor == false) {
        this.$http
          .post("insertlike", {
            likeid: 0,
            commodityid: this.commodity.id,
            userid: JSON.parse(localStorage.getItem("user")).id
          })
          .then(res => {
            this.commodity.preference = res.data.selecttotal;
            this.$parent.$parent.liketotal = res.data.total;

            this.$message.success({
              message: "商品收藏成功！！！",
              duration: 1000
            });
          });
        this.islovecolor = true;
      } else {
        this.$http
          .post("reducelike", {
            likeid: 0,
            commodityid: this.commodity.id,
            userid: JSON.parse(localStorage.getItem("user")).id
          })
          .then(res => {
            this.commodity.preference = res.data.selecttotal;
            this.$parent.$parent.liketotal = res.data.total;

            this.$message.info({
              message: "取消收藏成功！！！",
              duration: 1000
            });
          });
        this.islovecolor = false;
      }
    },
    addShopping(cid) {
      if (this.shoppingnum == 0) {
        this.$message.error({
          message: "商品数量为零    不能添加商品哦！！！",
          duration: 1500
        });
        return;
      }
      let uid = JSON.parse(localStorage.getItem("user")).id;
      let d = new Date();
      let caddtime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.$http.post("user/home/addshoppingcart", {
          uid,
          cid,
          cquantity: this.shoppingnum,
          caddtime
        })
        .then(res => {
          if (res.data == "err") {
            this.$message.error({message: "商品已经在购物车了  亲！！！",duration: 1500});
            return;
          }
          this.$message.success({
            message: "商品成功添加购物车！！！",
            duration: 1500
          });
          this.$parent.$parent.shoppingtotal = res.data;
        });
    }
  },
  created() {
    this.$http.get("addhits",{params:{id:this.commodity.id}})
    this.$http
      .post("isleke", {
        likeid: 0,
        commodityid: this.commodity.id,
        userid: JSON.parse(localStorage.getItem("user")).id
      })
      .then(res => {
        if (res.data == "f") {
          this.islovecolor = false;
        } else {
          this.islovecolor = true;
        }
      });
  }
};
</script>

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
.elicon {
  font-size: 30px;
  position: absolute;
  top: 3px;
  right: 15px;
  cursor: pointer;
  color: rgb(139, 139, 139);
}
.modal {
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}
.modal::-webkit-scrollbar {
  display: none;
}
.modal-dialog {
  border-radius: 10px;
  background-color: #fff;
  width: 950px;
  height: 650px;
  margin: 3em auto;
  display: flex;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  position: relative;
}
.modal-dialog-img {
  height: 650px;
  width: 514px;
}
.modal-dialog-img img {
  width: 444px;
  margin-top: 13%;
}
.modal-right-name {
  margin-top: 11%;
  font-family: "Raleway", sans-serif;
  font-size: 25px;
  font-weight: 500;
  padding-right: 19px;
}
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
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
.modal-right-jies {
  margin-right: 19px;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: 380;
  height: 161px;
  width: 451px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.modal-right-jies::-webkit-scrollbar {
  display: none;
}
.datainformation div {
  margin-bottom: 15px;
}
.datainformation div span {
  font-size: 17px;
  font-weight: 500;
  color: rgb(153, 153, 153);
}
.btn-group {
  margin-top: 25px;
  margin-right: 10px;
  display: inline-flex;
}
.btn-group button {
  border: 1px solid #999999;
  border-radius: 0;
  background: none;
  width: 45px;
  height: 40px;
  color: #212529;
  cursor: pointer;
}
.add-to-cart {
  height: 40px;
  position: relative;
  padding-right: 70px;
  border: 1px solid #999999;
  text-decoration: none;
  line-height: 39px;
  cursor: pointer;
  box-sizing: border-box;
}
.add-to-cart p {
  position: absolute;
  width: 40px;
  right: -1px;
  height: 40px;
  top: -1px;
  bottom: 0;
  background: #999999;
  margin: 0;
}
.add-to-cart p i {
  font-size: 20px;
  color: white;
  padding: 8px 9px;
}
.prev:hover {
  background-color: rgb(51, 51, 51);
  color: white;
}
.next:hover {
  background-color: rgb(51, 51, 51);
  color: white;
}
.add-to-cart:hover p,
.add-to-cart:hover {
  background-color: rgb(51, 51, 51);
  color: rgb(255, 255, 255);
}
.love {
  position: relative;
  margin-top: -7px;
  margin-left: 25px;
  color: #0f0f0f;
  font-size: 33px;
  cursor: pointer;
}
.shop-count {
  background-color: #ec6b81;
  display: inline-block;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  width: 25px;
  height: 25px;
  padding-top: 1px;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
  position: relative;
  left: -12px;
  top: 15px;
  box-sizing: border-box;
}
.lovecolor {
  color: #ec6b81;
}
</style>