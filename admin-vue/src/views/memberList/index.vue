<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 340px;" placeholder="请输入用户名" v-model="listQuery.nickName"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="tableListSearch()">查询</el-button>
    </div>
    <!--顶部菜单结束 -->
    <!--中间表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.userPic" style="width:50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="nickName"></el-table-column>
      <el-table-column label="用户ID" prop="objectId"></el-table-column>
      <el-table-column label="注册时间" prop="createdAt"></el-table-column>
    </el-table>
    <!--中间表格结束 -->
    <!-- 表格分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next"
      background
    ></el-pagination>
    <!--表格分页结束 -->
  </div>
</template>
<script>
const query = Bmob.Query("_User");
export default {
  created() {
    //获取列表
    this.getMemberList();
  },
  data() {
    return {
      //会员列表
      tableData: [],
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10,
        nickName: ""
      },
      //图片预览弹框是否打开
      dialogVisible: false,
      //要预览的图片
      dialogImageUrl: "",
      //正在查询
      isloading: false,
      setData: {},
      form: {}
    };
  },
  methods: {
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file;
    },
    //保存内容
    onSubmit(form) {},
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getMemberList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getMemberList();
    },
    //查询
    tableListSearch() {
      query.equalTo("nickName", "==", this.listQuery.nickName);
      query.find().then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    //以下为api操作
    getMemberList() {
      query.find().then(res => {
        console.log(res);
        this.tableData = res;
      });
    }
  }
};
</script>
