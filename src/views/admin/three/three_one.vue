<template>
  <div class="outside">
    <div class="title">订单管理</div>
    <div class="operation-container">
      <div style="margin-left: auto;">
        <el-input
          style="width: 200px;display: inline-block;"
          size="small"
          placeholder="请输入下单用户"
          prefix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
        <el-button
          @click="search"
          style="margin-left: 1rem;"
          size="small"
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imghead" style="width:50px;border-radius: 50%;" />
        </template>
      </el-table-column>
      <el-table-column label="下单用户" prop="pname" width="100" align="center"></el-table-column>
      <el-table-column prop="order_number" label="订单号" align="center" />
      <el-table-column label="总金额" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.pay_amount }}元</div>
        </template>
      </el-table-column>

      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          <div class="describe">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.pay_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" prop="pay_mode" width="100" align="center"></el-table-column>
      <el-table-column label="当前状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.trade_type==1">待付款</div>
          <el-popover v-else-if="scope.row.trade_type==2" trigger="hover" placement="top">
            <p>买家提醒了“{{scope.row.pay_type}}”次快点发货</p>
            <div slot="reference" class="name-wrapper sho">待发货</div>
          </el-popover>
          <div v-else-if="scope.row.trade_type==3">等待买家收货</div>
          <div v-else>交易完成</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="openNews(scope.row)">查看</el-button>
          <el-popconfirm
            v-if="scope.row.trade_type==2"
            title="确定要一键发货吗？"
            style="margin-left: 1rem"
            @confirm="delivery(scope.row.id,scope.$index)"
          >
            <el-button size="mini" type="danger" slot="reference">一键发货</el-button>
            <!-- <el-button size="mini" type="danger" slot="reference">一键发货</el-button> -->
          </el-popconfirm>
           <el-popconfirm
            v-if="scope.row.trade_type==4"
            title="确定删除该订单？"
            style="margin-left: 1rem"
            @confirm="cutOut(scope.row.id,scope.$index,tableData)"
          >
            <el-button size="mini" type="danger" slot="reference">删除订单</el-button>
            <!-- <el-button size="mini" type="danger" slot="reference">一键发货</el-button> -->
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination-container"
      @size-change="sizeChange"
      @current-change="currentChange"
      background
      :current-page="current"
      :page-size="size"
      :total="count"
      :page-sizes="[5]"
      layout="total, sizes, prev, pager, next, jumper"
    />
    <el-dialog style="padding: 5px 20px;" :visible.sync="isnews" width="55%">
      <div class="order" slot="title">订单号：{{row.order_number}}</div>
      <div style="display: flex;border-bottom: 1px solid #e0e0e0;padding-bottom: 15px;">
        <div class="imglist" v-for="(item, index) in orderlist" :key="index">
          <img :src="item.picture" alt />
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
      <div class="address">
        <div style="font-size:15px;color:#262626">收货信息</div>
        <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{address.uname}}</div>
        <div>联系电话：{{address.uphone}}</div>
        <div>收货地址：{{address.region}} {{address.detailed}}</div>
      </div>
      <div slot="footer">
        <el-button @click="isnews = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "three_one",
  data() {
    return {
      isnews: false,
      input1: "",
      current: 1,
      size: 5,
      count: 0,
      tableData: [],
      row: {},
      orderlist: [],
      address: {}
    };
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
        .get("admin/searchOrderList", { params: { input: this.input1,current: this.current, size: this.size } })
        .then(res => {
          if (res.data != "err") {
            this.tableData = res.data.list;
            this.count = res.data.count;
          } else {
            alert("找不到“" + this.input1 + "”的下单用户！！！");
          }
        });
    },
    openNews(data) {
      this.$http
        .get("admin/order/getOrderTo", {
          params: { id: data.id, Aid: data.dzid }
        })
        .then(res => {
          this.orderlist = res.data.list;
          this.address = res.data.address;
        });
      this.row = data;
      this.isnews = true;
    },
    delivery(id,index) {
      this.$http
        .get("admin/order/setDelivery", {
          params: { id }
        })
        .then(res => {
          if(res.data=="ok"){
              this.tableData[index].trade_type=3
              this.$message.success({
                message: "发货成功！！！",
                duration: 1500
              });
          }
        });
    },
    cutOut(id,index,rows){
      this.$http
        .get("admin/order/setCutOut", {
          params: { id }
        })
        .then(res => {
          if(res.data=="ok"){
              rows.splice(index, 1);
              this.$message.success({
                message: "删除成功！！！",
                duration: 1500
              });
          }
        });
    },
    search() {
      // if (this.input1 == "") {
      //   this.$message.info({
      //     message: "请输入内容 ！！！",
      //     duration: 1500
      //   });
      //   return;
      // }
      this.current = 1;
      this.getList()
    }
  },
  created() {
    this.$parent.$parent.$parent.$parent.titledata = "订单 / 订单管理";
    this.getList();
  }
};
</script>

<style scoped>
.el-dialog__body {
  padding: 10px 20px;
}
.outside {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 96.6%;
  height: 600px;
  border: 1px solid #ebeef5;
  padding: 20px;
  position: relative;
}
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  color: #202a34;
}
.title:before {
  content: "";
  width: 24px;
  height: 16px;
  border-left: 3px solid #ec6c82;
  margin-right: 20px;
}
.operation-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 3rem;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
.describe {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sho {
  cursor: pointer;
}
.order {
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}
.orderimg {
  display: flex;
  overflow: hidden;
}
.imglist {
  display: flex;
  padding: 8px 0;
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
.address {
  margin-top: 10px;
  margin-left: 10px;
}
.introduce {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>