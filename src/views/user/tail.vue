<template>
  <div class="wei">
    <img src="" alt="" style="display: block" />
    <p id="title">社区老年大学网站</p>
    <p>2022，18软件工程,地址：宁波大学科学技术学院 联系电话：1238971247</p>
  </div>
</template>

<script>
export default {
  name: "tail",
  data() {
    return {
      newdate: "",
    };
  },
  created() {
    let time = new Date();
    this.newdate =
      time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
  },
};
</script>

<style scoped>
.wei {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #8ac8f7;
  color: #003399;
}
.wei #title {
  font-family: "微软雅黑";
  font-size: 16px;
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
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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