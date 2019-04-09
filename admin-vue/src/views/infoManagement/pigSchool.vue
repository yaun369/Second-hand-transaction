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
            :file-list="form.terrace_image | filterUrl"
            :on-change="handleImgChange"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="平台名称">
          <el-input v-model="form.terrace_name" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.classification_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台链接">
          <el-input v-model="form.terrace_link" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.terrace_product" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="额度">
          <el-input v-model="form.terrace_lines" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="通过率">
          <el-input v-model="form.terrace_probability" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="平台认证">
          <el-input v-model="form.terrace_identification" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="申请人数">
          <el-input v-model="form.terrace_apply" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="平台评分">
          <el-input v-model="form.terrace_grade" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="下款时间">
          <el-date-picker
            v-model="form.terrace_undersigned"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
          <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="filter-container">
      <el-button type="primary" @click="onAddPrice">添加技术文章</el-button>
      <el-select v-model="valueID" placeholder="请选择分类" @change="serachClass">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.terrace_image" style="width:100px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="平台名称" prop="terrace_name"></el-table-column>
      <el-table-column label="产品名称" prop="terrace_product"></el-table-column>
      <el-table-column label="分类" prop="classification_name"></el-table-column>
      <el-table-column label="平台认证" prop="terrace_identification"></el-table-column>
      <el-table-column label="预估通过率" prop="terrace_probability"></el-table-column>
      <el-table-column label="评分" prop="terrace_grade"></el-table-column>
      <el-table-column label="额度" prop="terrace_lines"></el-table-column>
      <el-table-column label="下款时间" prop="terrace_undersigned"></el-table-column>
      <el-table-column label="平台链接" prop="terrace_link"></el-table-column>
      <el-table-column label="申请人数" prop="terrace_apply"></el-table-column>
      <el-table-column label="添加时间" prop="terrace_addtime"></el-table-column>
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
import {
  getPigSchool,
  addPigSchool,
  editPigSchool,
  deletePigSchool
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
      options: [
        {
          value: "7",
          label: "最新口子"
        },
        {
          value: "8",
          label: "最热口子"
        },
        {
          value: "9",
          label: "推荐口子"
        },
        {
          value: "10",
          label: "大额贷款"
        },
        {
          value: "11",
          label: "小额技术贷"
        },
        {
          value: "12",
          label: "信用卡贷款"
        },
        {
          value: "13",
          label: "工薪贷"
        }
      ],
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
    serachClass() {
      this.getSomeList({ classification_id: this.valueID });
    },
    toLookInfo(index) {
      //详情
      this.form = this.tableData[index];
      this.isShowAdd = true;
      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let data = {
        terrace_id: this.tableData[index].terrace_id
      };
      deletePigSchool(data).then(res => {
        console.log("delete", res);
        this.getSomeList({});
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getPigSchool(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    onAddPrice() {
      //添加
      this.dialogVisible = true;
      this.isShowAdd = false;
      console.log(this.form);
      this.form = {};
      this.form.terrace_image = [];
    },
    onYesEdit() {
      //确定编辑
      let terrace_image;
      if (this.file) {
        let pic = Bmob.File(this.file.name, this.file.raw);
        pic.save().then(res => {
          console.log(res);
          terrace_image = res[0].url;
        });
      } else {
        terrace_image = this.form.terrace_image;
      }
      let data = {
        terrace_id: this.form.terrace_id,
        classification_id: this.form.classification_id,
        terrace_name: this.form.terrace_name,
        terrace_link: this.form.terrace_link,
        terrace_product: this.form.terrace_product,
        terrace_undersigned: this.form.terrace_undersigned,
        terrace_apply: this.form.terrace_apply,
        terrace_grade: this.form.terrace_grade,
        terrace_identification: this.form.terrace_identification,
        terrace_probability: this.form.terrace_probability,
        terrace_lines: this.form.terrace_lines,
        terrace_image: terrace_image
      };
      editPigSchool(data).then(res => {
        console.log("edit", res);
        this.dialogVisible = false;
        this.getSomeList({});
      });
    },
    async onSubmit() {
      //确定添加
      let pic = Bmob.File(this.file.name, this.file.raw);
      pic.save().then(res => {
        console.log(res);
        let data = {
          classification_id: this.form.classification_id,
          terrace_name: this.form.terrace_name,
          terrace_link: this.form.terrace_link,
          terrace_product: this.form.terrace_product,
          terrace_undersigned: this.form.terrace_undersigned,
          terrace_apply: this.form.terrace_apply,
          terrace_grade: this.form.terrace_grade,
          terrace_identification: this.form.terrace_identification,
          terrace_probability: this.form.terrace_probability,
          terrace_lines: this.form.terrace_lines,
          terrace_image: res[0].url
        };
        addPigSchool(data).then(res => {
          console.log("add", res);
          this.dialogVisible = false;
          this.getSomeList({});
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
      this.form.image = "";
    }
  }
};
</script>