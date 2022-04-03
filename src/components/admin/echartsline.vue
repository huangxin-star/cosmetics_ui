
<template>
  <div class="wai">
    <div id="chart_category"></div>
    <div id="chart_example"></div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {
        title: {
          text: "用户交易额"
        },
        legend: {
          data: ["用户"]
        },
        tooltip: {
          trigger: "axis"
        },
        color: ["#70dace", "#70dace", "#70dace"],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "用户",
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      },
      option1: {
        title: {
          text: "商家交易额"
        },
        color: ["#70dace", "#70dace", "#70dace"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["交易额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "交易额",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  watch: {
    option() {
      console.log("asdasdsa");
    }
  },
  created() {},
  mounted() {
    this.$http.get("getEcharts").then(res => {
      this.option.xAxis.data = res.data.UserName;
      this.option.series[0].data = res.data.UserMoney;
      let myChart = echarts.init(document.getElementById("chart_category"));
      console.log(this.option);
      myChart.setOption(this.option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
      this.option1.xAxis.data = res.data.ShangjiaName;
      this.option1.series[0].data = res.data.ShangjiaMoney;
      let myChar = echarts.init(document.getElementById("chart_example"));
      myChar.setOption(this.option1);
      window.addEventListener("resize", function() {
        myChar.resize();
      });
    });
  }
};
</script>
<style scoped>
.wai {
  display: flex;
  margin-top: 10px;
}
.wai > div {
  width: 47.5%;
  height: 400px;
  margin: 30px auto;
  background-color: rgb(255, 255, 255);
}
</style>