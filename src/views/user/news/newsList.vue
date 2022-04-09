<template>
  <div id="">
    <el-container>
      <el-aside width="250px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item
            :index="item.path"
            v-for="item in leftMenu"
            :key="item.id"
            @click.native="refresh"
          >
            <i :class="item.icon"></i>{{ item.title }}</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <div
          class="main-box"
          v-for="item in newsList"
          :key="item.id"
          v-loading="loading"
        >
          <div class="left-img">
            <img
              src="../../../assets/newsImg/nathan-mcbride-229637.jpg"
              alt=""
            />
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
        </div> -->
        <router-view></router-view>
<!--        <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="queryInfo.currentPage"-->
<!--          :page-size="queryInfo.pageSize"-->
<!--          class="pagination-container"-->
<!--          background-->
<!--          layout=" prev, pager, next, jumper"-->
<!--          :total="queryInfo.total"-->
<!--        >-->
<!--        </el-pagination>-->
      </el-main>
    </el-container>
    <tail style="margin-top: 25px"></tail>
  </div>
</template>

<script>
import tail from "../tail.vue";
export default {
  name: "newsList",
  components: {
    tail,
  },

  data() {
    return {
      loading: false,
      queryInfo: {
        currentPage: 1,
        pageSize: 6,
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
      leftMenu: [
        {
          title: "新闻动态",
          path: "/homeuser/news/content?type=1",
          icon: "el-icon-goods",
        },
        {
          title: "作品展示",
          path: "/homeuser/news/detail?type=2",
          icon: "el-icon-present",
        },
        // {
        //   title: "通知公告",
        // },
        // {
        //   title: "学习资料",
        // },
      ],
    };
  },
  methods: {
    getList() {
      // let params = {
      //   current: this.queryInfo.currentPage,
      //   size: this.queryInfo.pageSize,
      //   sensitiveWord:this.queryInfo.sensitiveWord
      // }
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.queryInfo.pageSize = val;
    //   this.getList();
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.queryInfo.currentPage = val;
    //   this.getList();
    // },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  .el-menu-item {
    height: 70px;
    line-height: 70px;
    font-size: 16px;
  }
}
.el-aside {
  background-color: #f4fbff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
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
