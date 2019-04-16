<style>
</style>

<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image[0].url" style="width:100px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="买家昵称" prop="user.nickName"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="添加时间" prop="createdAt"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDelete(scope.$index)" type="danger" size="small">删除</el-button>
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
const query = Bmob.Query("show");
export default {
  created() {
    //获取列表
    this.getSomeList();
  },
  filters: {
    //这里进行加入url到Ui框架
    filterUrl: function(value) {
      let arr = [];
      if (!Array.isArray(value)) {
        arr.push({
          url: value
        }),
          (value = arr);
      } else {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].url) {
            value[i] = {
              url: value[i]
            };
          }
        }
      }
      return value;
    }
  },
  data() {
    return {
      valueID: null,
      dateArr: [],
      isShowAdd: false,
      selectValue: "",
      selectValue_s: "",
      input: "",
      tableData: [],
      form: {},
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      dialogVisible_info: false
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
      this.listQuery.page = val;
      this.getSomeList();
    },
    toDelete(index) {
      //删除
      let objectId = this.tableData[index].objectId;
      query
        .destroy(objectId)
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