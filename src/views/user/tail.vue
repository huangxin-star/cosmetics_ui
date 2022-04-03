<template>
  <div class="wei">
    <div>
      <img src="../../assets/img/log.png" alt />
      <div class="author">作者：漫画忧作</div>
      <div class="time">{{newdate}}</div>
      <p class="text-center">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </p>
    </div>

    <div class="busin">
      <h2>Contact</h2>
      <div>
        qq：
        <span style="font-size:20px">××××</span>
      </div>
      <div>
        wx：
        <span style="font-size:20px">××××</span>
      </div>
      <div>
        微博：
        <span style="font-size:20px">×××××</span>
      </div>
      <div>电话：13634263699</div>
    </div>
    <div class="busin">
      <h2>Business</h2>
      <div>The ordinary</div>
      <div>ELEMIS</div>
      <div>NIOD</div>
      <div>Eucerin</div>
    </div>
    <div>
      <h2>Newsletter</h2>
      <ul class="list-inline">
        <li>Subscribe to our newsletter</li>
        <li>
          <input type="text" placeholder="Email" />
        </li>
        <li style="width: 275px;">
          Copyright ©
          <span style="font-size: 14px;color: #333333;">漫画忧作</span>.Company name All rights reserved.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "tail",
  data() {
    return {
      newdate: ""
    };
  },
  created() {
    let time = new Date();
    this.newdate =
      time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
  }
};
</script>

<style scoped>
.wei {
  position:relative;
  z-index:3;
  margin-top: 100px;
  width: 75%;
  /* padding-left:12%;
  padding-right: 12%; */
  height: 200px;
  margin: 100px auto;
  border-top: 1px solid #e6e6e6;
  padding-top: 25px;
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  color: #686868;
  background-color: #ffffff;
}
.wei > div > img {
  width: 78%;
}
.author {
  margin: 35px 0 10px 0;
  font-size: 14px;
  padding-left: 30px;
  text-align: left;
  color: #333333;
}
.time {
  font-weight: 500;
  font-size: 15px;
  margin-top: 5px;
  padding-left: 30px;
  text-align: left;
}
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
.text-center {
  text-align: left;
  padding-left: 30px;
}
.text-center i {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-style: normal;
  margin-right: 13px;
}
.text-center i:hover {
  color: #ffa6a8;
}
.fa-star:before {
  content: "\f005";
}
div {
  font-family: "Raleway", sans-serif;
}
h2 {
  font-size: 26px;
  text-align: left;
  margin-bottom: 18px;
  color: #333333;
  font-weight: 500;
  margin-top: 15px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.list-inline {
  padding-left: 0;
  list-style: none;
}
.list-inline input {
  border: none;
  background: none;
  position: relative;
  width: 255px;
  border-bottom: 1px solid black;
  margin: 20px 0;
}
.busin div {
  margin-top: 7px;
}
</style>