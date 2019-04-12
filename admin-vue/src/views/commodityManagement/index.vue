<style>
</style>

<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width:80px;height:60px;">
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="卖家微信" prop="wechat"></el-table-column>
      <el-table-column label="分类" prop="class"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="发布时间" prop="time"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDelete(scope.$index)" type="danger" size="mini">删除</el-button>
          <div style="width:80px;height:20px;margin:10px 0 10px 0;">
            <el-button
              v-if="!scope.row.is_top"
              @click="toTopping(scope.$index)"
              type="primary"
              size="mini"
            >置顶</el-button>
            <el-button
              v-if="scope.row.is_top"
              @click="toCancelTopping(scope.$index)"
              type="danger"
              size="mini"
            >取消置顶</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next"
      background
    ></el-pagination>
  </div>
</template>

<script>
import {
  getBuyPigList_api,
  getBuyPigInfo_api,
  deleteBuyPigList_api,
  setTopping
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    // this.getBuyPigList();
  },
  data() {
    return {
      input: "",
      tableData: [
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/fae0f710406e4b3380fb59f4eb012c85.png",
          name: "华为mate系列",
          wechat: "wx009rs",
          class: "数码",
          price: "2990",
          time: "2019-03-12"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/fae0f710406e4b3380fb59f4eb012c85.png",
          name: "华为mate系列",
          wechat: "wx009rs",
          class: "数码",
          price: "2990",
          time: "2019-03-12"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/fae0f710406e4b3380fb59f4eb012c85.png",
          name: "华为mate系列",
          wechat: "wx009rs",
          class: "数码",
          price: "2990",
          time: "2019-03-12"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/fae0f710406e4b3380fb59f4eb012c85.png",
          name: "华为mate系列",
          wechat: "wx009rs",
          class: "数码",
          price: "2990",
          time: "2019-03-12"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/fae0f710406e4b3380fb59f4eb012c85.png",
          name: "华为mate系列",
          wechat: "wx009rs",
          class: "数码",
          price: "2990",
          time: "2019-03-12"
        }
      ],
      form: {},
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10
      },
      //总条数
      // total: 0,
      dialogVisible: false
    };
  },
  methods: {
    toTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 1,
        is_top: 1
      };
      setTopping(data).then(res => {
        this.getBuyPigList();
      });
    },
    toCancelTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 1,
        is_top: 0
      };
      setTopping(data).then(res => {
        this.getBuyPigList();
      });
    },
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getBuyPigList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getBuyPigList();
    },
    //查询
    tableListSearch() {
      let getData = Object.assign({ name: this.input }, this.listQuery);
      getBuyPigList_api(getData).then(res => {
        console.log("res", res.data);
        this.tableData = res.data;
      });
    },
    toLookInfo(index) {
      //查看详情
      this.dialogVisible = true;
      console.log(index);
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id
      };
      getBuyPigInfo_api(data).then(res => {
        console.log("getBuyPigInfo_api", res.data);
        res.data.image0 = res.data.image.split(",")[0];
        res.data.image1 = res.data.image.split(",")[1];
        res.data.image2 = res.data.image.split(",")[2];
        this.form = res.data;
        console.log(this.form);
      });
    },
    toDelete(index) {
      //删除
      console.log(index);
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id
      };
      deleteBuyPigList_api(data).then(res => {
        console.log(res);
        this.getBuyPigList();
      });
    },
    getBuyPigList() {
      //获取买猪列表
      let getData = [{}];
    }
  }
};
</script>
