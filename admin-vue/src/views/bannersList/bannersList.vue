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
        <!-- <el-form-item label="标题">
          <el-input v-model="form.title" style="width: 200px;"></el-input>
        </el-form-item>-->
        <el-form-item>
          <!-- <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button> -->
          <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="filter-container">
      <el-button type="primary" @click="onAddPrice">添加轮播图</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.banner_pic" style="width:100px;height: 80px;">
        </template>
      </el-table-column>
      <!-- <el-table-column label="标题" prop="title"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="toLookInfo(scope.$index)" type="primary" size="small">编辑</el-button> -->
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
import {
  getBanners,
  addBanners,
  editBanners,
  deleteBanners,
  upFile
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getSomeList({});
  },
  filters: {
    //这里进行加入url到Ui框架
    filterUrl: function(value) {
      let arr = [];
      // console.log(value)
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
      //console.log("过滤的")
      //console.log(value)
      return value;
    }
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
      dialogVisible: false,
      file: null,
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
      //编辑
      this.isShowAdd = true;
      this.form = this.tableData[index];
      console.log(this.form);

      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let data = {
        banner_id: this.tableData[index].banner_id
      };
      deleteBanners(data).then(res => {
        console.log("delete", res);
        this.getSomeList({});
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getBanners(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
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
      if (!this.file) {
        console.log("form", this.form);
        let data = {
          id: this.form.id,
          type: 0,
          image: this.form.image,
          title: this.form.title
        };
        editBanners(data).then(res => {
          console.log(res);
          if (!res.status) {
            this.dialogVisible = false;
            this.getSomeList({});
          }
        });
      } else {
        let formData = new FormData();
        formData.append("file", this.file.raw);
        formData.append("type", 1);
        upFile(formData).then(res => {
          let data = {
            id: this.form.id,
            type: 0,
            image: res.data.imgurl,
            title: this.form.title
          };
          editBanners(data).then(res => {
            console.log(res);
            if (!res.status) {
              this.dialogVisible = false;
              this.getSomeList({});
            }
          });
        });
      }
    },
    onSubmit() {
      //确定添加
      let pic = Bmob.File(this.file.name, this.file.raw);
      pic.save().then(res => {
        console.log(res);
        let data = {
          banner_pic: res[0].url
        };
        addBanners(data).then(res => {
          this.dialogVisible = false;
          this.getSomeList({});
        });
      });
    },
    //上传图片
    handleImgChange(file, fileList) {
      console.log("file", file);
      this.file = file;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.image = "";
    }
  }
};
</script>