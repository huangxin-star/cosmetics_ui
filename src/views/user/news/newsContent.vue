<template>
  <div>
    <h1>{{type }}</h1>
    <div
      class="main-box"
      v-for="item in newsList"
      :key="item.id"
      v-loading="loading"
    >
      <div class="left-img">
        <img src="../../../assets/newsImg/nathan-mcbride-229637.jpg" alt="" />
      </div>
      <div class="right-box">
        <div class="title">
          <a>{{ item.title }}</a>
        </div>
        <div class="date"><a>Thomson Smith - April 18,2018</a></div>
        <div class="content">
          <p>{{ item.context }}</p>
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
  name: "newsContent",
  data() {
    return {
      loading: false,
      type: "",
      queryInfo: {
        currentPage: 1,
        pageSize: 4,
        total: 0,
        sensitiveWord: "",
      },
      newsList: [
        {
          title:
            "Magna aliqua ut enim ad minim veniam quis nostrud quis xercitation\n" +
            "              ullamco.",
          context:
            "Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          path: "/homeuser/news/detail",
        },
        {
          title:
            "Magna aliqua ut enim ad minim veniam quis nostrud quis xercitation\n" +
            "              ullamco.",
          context:
            "Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        },
        {
          title:
            "Magna aliqua ut enim ad minim veniam quis nostrud quis xercitation\n" +
            "              ullamco.",
          context:
            "Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        },
        {
          title:
            "Magna aliqua ut enim ad minim veniam quis nostrud quis xercitation\n" +
            "              ullamco.",
          context:
            "Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut\n" +
            "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        },
      ],
    };
  },
  created() {
    this.type = this.$route.query.type
    console.log(this.$route.query.type);
  },
  methods: {
    getList() {
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
  },
};
</script>

<style lang="less" scoped>
.main-box {
  display: flex;
}
.main-box .left-img {
  padding-bottom: 2rem;
  height: 100%;
  width: 100%;
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
}

.left-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
