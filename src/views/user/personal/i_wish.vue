<template>
  <div>
    <div class="tobu">
      <span>当前我的愿望。。。</span>
    </div>
    <div class="toptable">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="心愿标题" width="180"></el-table-column>
        <el-table-column prop="genre" label="心愿类别" width="180"></el-table-column>
        <el-table-column prop="wdescribe" label="内容描述">
          <template slot-scope="scope">
          <div class="describe">{{scope.row.wdescribe}}</div>
        </template>>
        </el-table-column>
        <el-table-column prop="wtime" label="许愿日期"></el-table-column>
        <el-table-column label="当前状态" >
        <template slot-scope="scope">
          <div v-if="scope.row.state==1">未实现</div>
          <div v-if="scope.row.state==2">已实现</div>
          <div v-if="scope.row.state==3">被拒绝了</div>
        </template>
      </el-table-column>
        <el-table-column label="操作" align="center" width="130">
        <template slot-scope="scope">
          <el-button size="mini" @click="openModel(scope.row.wdescribe)">查看</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <tail style="margin-top:80px;"></tail>
    
  </div>
</template>

<script>
import tail from "../tail";
export default {
  components: {
    tail
  },
  name: "i_wish",
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem("user")),
      tableData: [],
    };
  },
  methods: {
    openModel(item) {
      alert(item)
    },
  },
  created() {
    this.$http
      .get("user/home/getUserWishList", { params: { uid: this.userdata.id } })
      .then(res => {
        this.tableData=res.data;
        console.log(res.data);
        
      });
  }
};
</script>

<style scoped>

.tobu {
  width: 100%;
  margin-top: 120px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 40px;
  position: relative;
  
}
.tobu > span {
  padding-left: 180px;
  font-size: 16px;
}
.toptable {
  width: 1150px;
  margin: 40px auto;
}
.describe {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>