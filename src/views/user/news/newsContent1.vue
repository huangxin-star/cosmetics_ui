<template>
  <div>
    <div style="margin-left: auto;">
      <div>
        <h1>作品展示</h1>
      </div>
      <div style="float: right">
        <el-input
            style="width: 200px;display: inline-block;font-size: 17px"
            size="small"
            class="iname"
            placeholder="请输入新闻内容"
            prefix-icon="el-icon-search"
            v-model="input1"
        ></el-input>
        <el-button
            @click="search"
            style="margin-left: 1rem;font-size: 17px"
            size="small"
            type="primary"
            icon="el-icon-search"
        >搜索</el-button>
      </div>
    </div>

    <div
        class="main-box"
        v-for="item in newsList"
        :key="item.id"
        v-loading="loading"
    >
      <div class="left-img">
        <img :src="item.newsimg" alt="" @click="goDetail(item)"/>
      </div>
      <div class="right-box">
        <div class="title">
          <a>{{ item.title }}</a>
        </div>
        <div class="date"><a>{{ new Date(+new Date(Number(item.ntime)) + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ")}}</a></div>
        <div class="content">
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-size="queryInfo.pageSize"
        class="pagination-container"
        background
        layout=" prev, pager, next, jumper"
        :total="queryInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "newsContent1",
  data() {
    return {
      input1: '',
      loading: false,
      type: "2",
      queryInfo: {
        currentPage: 1,
        pageSize: 4,
        total: 0,
      },
      newsList: [

      ],
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.nesLoading = true
      this.$http
          .get("user/getPagingNews", {
            params: { input: this.input1, current: this.queryInfo.currentPage, size: this.queryInfo.pageSize ,ntype:this.type}
          })
          .then(res => {
            console.log(res)
            if (res.data != "err") {
              this.newsList = res.data.list;
              this.queryInfo.total = res.data.count;

            }else {
              this.$message.warning('找不到该新闻')
            }
            this.nesLoading = false
          }).catch((err) => {
        console.error(err)
      });
      // let params = {
      //   current: this.queryInfo.currentPage,
      //   size: this.queryInfo.pageSize,
      //   sensitiveWord:this.queryInfo.sensitiveWord
      // }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.currentPage = val;
      this.getList();
    },
    search() {

      this.queryInfo.currentPage = 1;
      this.getList();
    },
    goDetail(item) {
      console.log(item)
      let routeData = this.$router.resolve({path:'/homeuser/news/detail',query: {id:item.nid}})
      window.open(routeData.href, '_blank');
    }
  },
};
</script>
<style scoped>
.iname>>>.el-input__inner {
  height: 40px;
}
</style>
<style lang="less" scoped>
.main-box {
  display: flex;
  margin-top: 10px;
}
.main-box .left-img {
  padding-bottom: 2rem;
  height: 200px;
  width: 300px;
}

.right-box {
  display: flex;
  flex-direction: column;

  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.right-box .title {
  font-size: 19px;
  color: #222 !important;
  font-weight: 800;
}
.right-box .content p {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.right-box .date {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;

  a:hover {
    color: #f5bc04;
  }
}

.right-box .content {
  font-size: 17px;
  color: #777;
}

.left-img {
  padding-right: 20px;
  width: 300px;
  height: 200px;
}

.left-img img {
  display: block;
  width: 300px;
  height: 200px;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
