<style>
</style>

<template>
  <div class="app-container">
    <el-dialog :visible.sync="dialogVisible">
      <div style="margin: 20px;"></div>
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="图片">
          <el-upload
            action
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :file-list="form.image | filterUrl"
            :on-change="handleImgChange"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.title" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
          <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="filter-container">
      <el-button type="primary" @click="onAddPrice">添加物品分类</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width:100px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="title"></el-table-column>
      <el-table-column label="时间" prop="createdAt"></el-table-column>
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
const query = Bmob.Query("class");
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
        limit: 30
      },
      dialogVisible: false,
      dialogVisible_info: false,
      file: null,
      file_s: null,
      filterUrl: null
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
    toLookInfo(index) {
      //详情
      this.form = this.tableData[index];
      this.isShowAdd = true;
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
    getSomeList(data) {
      //获取列表
      query.find().then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    onAddPrice() {
      //添加
      this.dialogVisible = true;
      this.isShowAdd = false;
      this.form = Object.assign({}, this.form);
      this.form.image = [];
      this.form.title = "";
    },
    onYesEdit() {
      //确定编辑
      if (this.file) {
        let pic = Bmob.File(this.file.name, this.file.raw);
        pic.save().then(res => {
          this.form.image = res[0].url;
        });
      }
      console.log(this.form);
      query.set("id", this.form.objectId);
      query.set("image", this.form.image);
      query.set("title", this.form.title);
      query
        .save()
        .then(res => {
          console.log(res);
          this.getSomeList();
          this.dialogVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      //确定添加
      let pic = Bmob.File(this.file.name, this.file.raw);
      pic.save().then(res => {
        this.form.image = res[0].url;
        query.set("image", this.form.image);
        query.set("title", this.form.title);
        query
          .save()
          .then(res => {
            console.log(res);
            this.getSomeList();
            this.dialogVisible = false;
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //上传图片
    handleImgChange(file, fileList) {
      console.log("fileList", fileList);
      this.file = file;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.image = [];
    }
  }
};
</script>