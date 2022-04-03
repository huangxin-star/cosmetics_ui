<template>
  <div>
    <div class="row">
      <div>
        <div class="row-i">
          <i class="el-icon-user-solid"></i>
        </div>
        <div class="row-t">
          <div>用户总数</div>
          <div>{{datalist[0]}},00 人</div>
        </div>
      </div>
      <div>
        <div class="row-i">
          <i class="el-icon-s-custom"></i>
        </div>
        <div class="row-t">
          <div>商家总数</div>
          <div>{{datalist[1]}},00 人</div>
        </div>
      </div>
      <div>
        <div class="row-i">
          <i class="el-icon-shopping-bag-2"></i>
        </div>
        <div class="row-t">
          <div>订单总数</div>
          <div>{{datalist[2]}},00 单</div>
        </div>
      </div>
      <div>
        <div class="row-i">
          <i class="icon-qianqian- iconfont"></i>
        </div>
        <div class="row-t">
          <div>收入总数</div>
          <div>{{datalist[3]}},00 元</div>
        </div>
      </div>
    </div>
    <echartsline></echartsline>
  </div>
</template>

<script>
import echartsline from '../admin/echartsline'
export default {
  name: "home",
  components:{
    echartsline,
  },
  data() {
    return {
      admin:JSON.parse(localStorage.getItem("admin")),
      chartLine: null,
      datalist:{},
    };
  },
  created(){
    this.$parent.$parent.$parent.$parent.titledata="后台首页"
  },
  mounted(){
    this.$http.get("admin/home/getDataTotal",{params:{id:this.admin.id}}).then(res=>{
      this.datalist=res.data
      console.log(this.datalist);
      
    })
  }
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont"; /* Project id 2954069 */
  src: url("//at.alicdn.com/t/font_2954069_kkcw31u943.woff2?t=1637483010535")
      format("woff2"),
    url("//at.alicdn.com/t/font_2954069_kkcw31u943.woff?t=1637483010535")
      format("woff"),
    url("//at.alicdn.com/t/font_2954069_kkcw31u943.ttf?t=1637483010535")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-qianqian-:before {
  content: "\e606";
}

.row {
  display: flex;
}
.row > div {
  width: 50%;
  height: 60px;
  margin: 0 17px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  color: rgb(255, 255, 255);
}
.row > div:nth-child(1) {
  background-color: rgb(51, 202, 187);
}
.row > div:nth-child(2) {
  background-color: rgb(249, 104, 104);
}
.row > div:nth-child(3) {
  background-color: rgb(21, 195, 119);
}
.row > div:nth-child(4) {
  background-color: rgb(146, 109, 222);
}
.row-i {
  width: 53px;
  height: 53px;
  line-height: 48px;
  background-color: rgba(255, 255, 255, 0.175);
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
}
.row-t {
  letter-spacing: 0.7px;
  font-size: 13px;
}
.row-t > div:nth-child(1) {
  margin-bottom: 7px;
}
.row-t > div:nth-child(2) {
  font-size: 24px;
}
</style>>

