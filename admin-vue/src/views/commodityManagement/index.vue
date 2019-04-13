<style>
</style>

<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image[0].url" style="width:80px;height:60px;">
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="卖家微信" prop="wechat"></el-table-column>
      <el-table-column label="分类" prop="class.title"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="描述" prop="content"></el-table-column>
      <el-table-column label="发布时间" prop="updatedAt"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDelete(scope.$index)" type="danger" size="mini">删除</el-button>
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
const query = Bmob.Query("product");

export default {
  created() {
    //获取列表
    this.getSomeList();
  },
  data() {
    return {
      input: "",
      tableData: [],
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
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getSomeList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getSomeList();
    },
    toLookInfo(index) {
      //查看详情
      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let id = this.tableData[index].objectId;
      query
        .destroy(id)
        .then(res => {
          console.log(res);
          this.getSomeList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSomeList() {
      //获取列表
      query.find().then(res => {
        console.log(res);
        this.tableData = res;
      });
    }
  }
};
</script>
