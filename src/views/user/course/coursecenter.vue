<template>
<div>
  <div class="container-fluid custom-container">
    <div class="row">
      <div class="col-xl-12">
        <div class=" full-width">
          <div style="margin-bottom: 40px;text-align: center;">
            <el-input
                style="width: 300px;display: inline-block;font-size: 17px"
                size="small"
                class="iname"
                placeholder="请输入课程名称"
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
          <div class="row" >

            <div class="col-xl-3 col-lg-6 col-md-6"   v-for="item in tableData">
              <div class="sa-causes-single sa-causes-single-2">
                <div class="entry-thumb"  style="cursor: pointer;" @click="goDetail(item)">
                  <img :src="item.iamge" alt="img" class="img-fluid full-width">
                  <div class="dontaion-category story-meta">
                    <a style="cursor: pointer;"><strong>{{item.cname}}</strong></a>
                    <p>学费：<strong>{{item.fees}}元</strong></p>
                  </div>
                </div>
                <div class="causes-details-wrap">
                  <div class="causes-details">
<!--                    <h5><a href="story-details.html">More than One Life Changed</a></h5>-->
                    <p>描述：{{item.cdescription }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <el-dialog
            title="课程信息"
            :visible.sync="dialogVisible"
            width="65%"
            custom-class="bpmDialog"
            center
            >
          <div style="display: flex">
            <div style="padding-top: 5px;max-width: 300px">
              <img :src="detail.iamge" alt="img" class="img-fluid full-width" style="width: 100%">
            </div>
            <div style="padding-left: 20px">
              <el-descriptions class="margin-top" style="font-size: 16px" :title="detail.cname" :column="3"  border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    任课教师
                  </template>
                  {{detail.sname}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    咨询电话
                  </template>
                  {{ detail.stel }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    教室
                  </template>
                  {{detail.room_name}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-coin"></i>
                    费用
                  </template>
                  <el-tag size="medium">{{ detail.fees }}元</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-time"></i>
                    上课时间
                  </template>
                  <p v-if="detail.school_time==1">周一上午</p>
                  <p v-if="detail.school_time==2">周一下午</p>
                  <p v-if="detail.school_time==3">周二上午</p>
                  <p v-if="detail.school_time==4">周二下午</p>
                  <p v-if="detail.school_time==5">周三上午</p>
                  <p v-if="detail.school_time==6">周三下午</p>
                  <p v-if="detail.school_time==7">周四上午</p>
                  <p v-if="detail.school_time==8">周四下午</p>
                  <p v-if="detail.school_time==9">周五上午</p>
                  <p v-if="detail.school_time==10">周五下午</p>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    选课人数
                  </template>
                  <el-tag size="small">0</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    课程描述
                  </template>
                  {{ detail.cdescription }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    考核内容
                  </template>
                  {{detail.examined_content}}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="getCourse">选课</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>

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
    </div>

  </div>

  <tail style="margin-top: 25px"></tail>
</div>
</template>

<script>
import tail from "../tail.vue";
export default {
  name: "coursecenter",
  components: {
    tail,
  },
  data() {
    return {
      queryInfo: {
        currentPage: 1,
        pageSize: 6,
        total: 0,
        sensitiveWord: "",
      },
      tableData:[],
      input1:'',
      detail:'',
      dialogVisible:false,
      loading:false
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() { //列表
      this.loading = true
      this.$http
          .get("admin/getPagingCourse", {
            params: { input: this.input1, current: this.queryInfo.currentPage, size: this.queryInfo.pageSize }
          })
          .then(res => {
            console.log(res)
            if (res.data != "err") {
              this.tableData = res.data.list;
              this.queryInfo.total = res.data.count;
            } else {
              this.$message.warning("找不到“" + this.input1 + "”名字的课程！！！");
            }
            this.loading = false
          });
    },
    search() {

      this.queryInfo.currentPage = 1;
      this.getTableData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pageSize = val;
      this.getTableData();

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.currentPage = val;
      this.getTableData();
    },
    goDetail(item) {
      console.log(item)
      this.detail = item
      this.dialogVisible = true
    },
    getCourse() { //选课

    }
  }

}
</script>

<style lang="less">
.bpmDialog {
  border-radius: 10px;
  .el-dialog__header {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    overflow: hidden;
    //border-radius: 2px 2px 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666666 !important;
    //border-color: #dcdcdc !important;
    background-color: #f1f1f1 !important;
    border-radius: 10px 10px 0 0;
    .el-dialog__title {
      font-size: 18px;
    }
    .el-dialog__headerbtn {
      top: 10px;
      i {
        font-size: 18px !important;
        font-weight: bold !important;
      }
    }
  }
  .el-dialog__body {
    overflow: hidden;
    border-radius: 0 0 10px 10px;
    //box-shadow: 0 5px 5px #777;
  }
}
</style>
<style scoped>
.iname>>>.el-input__inner {
  height: 40px;
}
</style>
<style lang="less" scoped>

.causes-details p{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.container-fluid {
  /*width: 100%;*/
  padding-top: 40px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto
}
.custom-container {
  padding-right: 8%;
  padding-left: 8%;
}
.dontaion-category {
  a:hover {
    text-decoration: underline;
    color: #f5bc04;
  }
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px
}
.col-xl-3{
  position: relative;
  width: 100%;
  padding-right: 22px;
  padding-left: 22px;
  flex: 0 0 30%;
}
.sa-causes-single {
  //box-shadow: 0 0 0 1px rgb(67 41 163 ), 0 1px 5px 0 rgb(67 41 163 );
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  margin-bottom: 30px;
  border-radius: 4px;
  transition: 0.3s;
}
.entry-thumb img{
  width: 100%;
}
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
