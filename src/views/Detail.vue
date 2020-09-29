<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>关键字维护</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1" @click="gosen">敏感词维护</el-menu-item>
              <el-menu-item index="1-2">附件类型维护</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="filedetail">文件详情</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>刘根</span>
        </el-header>

        <el-main>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              fixed
              prop="submissiontime"
              label="送达时间"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="filename" label="送审稿名称" width="200">
            </el-table-column>
            <el-table-column prop="type" label="送审稿类型" width="200">
            </el-table-column>
            <el-table-column prop="submissionunit" label="送审单位" width="150">
            </el-table-column>
            <el-table-column prop="issuer" label="签发人姓名" width="150">
            </el-table-column>
            <el-table-column
              prop="issuerdepartment"
              label="签发人科室"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="remarks" label="备注" width="120">
            </el-table-column>
            <el-table-column prop="review" label="审查意见书" width="120">
            </el-table-column>
            <el-table-column
              prop="lastedittime"
              label="上次修改时间"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="state" label="状态" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-container style="direction: horizontal">
      <el-footer>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="current_change"
        >
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import load from "../views/Detail";
import api from "../api";

export default {
  name: "Detail",
  components: {
    load,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      total: Number,
      page: 1,
      // pagesize: 9,
      currentPage: 1,
      pageform: {
        page: 1,
        pageSize: 9,
        word: "",
        type: "0,1,2",
        state: "0,1,2,3,4",
      },
    };

    // const item = {
    //   date: "2016-05-02",
    //   name: "王小虎",
    //   address: "上海市普陀区金沙江路 1518 弄",
    // };
    // return {
    //   tableData: Array(20).fill(item),
    // };
  },
  methods: {
    gosen() {
      this.$router.push("About");
    },
    filedetail() {
      this.$router.push("filedetail");
    },
    handleClick(row) {
      console.log(row);
    },
    getfilelist(params) {
      console.log("已进入请求函数中");
      api
        .getFilelist({
          page: this.pageform.page,
          pageSize: this.pageform.pageSize,
          word: this.pageform.word,
          type: this.pageform.type,
          state: this.pageform.state,
        })
        .then((res) => {
          console.log("已取得响应数据");
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data.data.list);
            for (let i = 0; i < this.pageform.pageSize; i++) {
              if (res.data.data.list[i].fields != null) {
                this.tableData.push(res.data.data.list[i].fields);
              }else{
                this.tableData.push([{filename:""}]);
                console.log(this.tableData)
              }
            }
            // this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            console.log(res.data.data.total);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
      console.log("已进入请求函数中");
      api
        .getFilelist({
          page: this.currentPage,
          pageSize: this.pageform.pageSize,
          word: this.pageform.word,
          type: this.pageform.type,
          state: this.pageform.state,
        })
        .then((res) => {
          console.log("已取得响应数据");
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data.data.list);
            this.tableData = [];
            for (let i = 0; i < res.data.data.list.length; i++) {
              if(res.data.data.list[i].fields != null){
              this.tableData.push(res.data.data.list[i].fields);                
              }else{
                this.tableData.push([{filename:""}])
              }

            }
            // this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            console.log(res.data.data.total);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.getfilelist();
  },
};
</script>

<style type="text/css">
.el-header {
  background-color: #98aac2;
  color: #333;
  line-height: 60px;
  /* height: 100%; */
}

.el-aside {
  width: 200px;
  color: #333;
}
.el-main {
  height: 50%;
}
.el-footer{
  height: 80px;
}
</style>