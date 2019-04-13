<style>
</style>

<template>
  <div class="app-container">
    <el-dialog :visible.sync="dialogVisible">
      <div style="margin: 20px;"></div>
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="价格">
          <el-input v-model="form.price" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="form.address" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
          <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="分类" prop="type"></el-table-column>
      <el-table-column label="品牌分类" prop="breed_type"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="地区" prop="address"></el-table-column>
      <el-table-column label="时间" prop="pub_time"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toLookInfo(scope.$index)" type="primary" size="small">编辑</el-button>
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
export default {
  created() {
    //获取列表
    this.getSomeList();
  },
  data() {
    return {
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
      dialogVisible: false
    };
  },
  methods: {
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getSomeList({});
    },
    //选择哪一页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getSomeList({});
    },
    //查询
    tableListSearch() {
      console.log("dateArr", this.dateArr);
      this.getSomeList({
        start_time: this.dateArr[0],
        end_time: this.dateArr[1]
      });
    },
    toLookInfo(index) {
      //编辑
      this.isShowAdd = true;
      this.form = this.tableData[index];
      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let data = {
        id: this.tableData[index].id
      };
      deletePigPriceList_api(data).then(res => {
        console.log("delete", res);
        if (!res.status) {
          // this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    },
    getSomeList(data) {
      //获取列表

    },
    toSelectClass() {
      //选择分类
      console.log(this.selectValue);
      this.getSomeList({ type: this.selectValue });
    },
    toSelectClass_s() {
      //选择分类
      console.log(this.selectValue_s);
      this.getSomeList({ breed_type: this.selectValue_s });
    },
    onAddPrice() {
      //添加猪价
      this.dialogVisible = true;
      this.isShowAdd = false;
      this.form = {};
    },
    onYesEdit() {
      //确定编辑
      this.dialogVisible = false;
      this.getSomeList();
    },
    onSubmit() {
      //确定添加
      this.dialogVisible = false;
      this.getSomeList();
    }
  }
};
</script>