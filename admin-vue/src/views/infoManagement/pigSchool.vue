<style>
</style>

<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width:100px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="买家昵称" prop="nickname"></el-table-column>
      <el-table-column label="产品名称" prop="name"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="添加时间" prop="time"></el-table-column>
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
    // this.getSomeList({});
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
      tableData: [
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/8f9c73a540f3711c80355af65878e9a3.jpg",
          nickname: "可爱老哥",
          name: "huaweiPRO8",
          content: "很开心的一次交易，希望平台越做越好！",
          tiem: "2019-04-15"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/8f9c73a540f3711c80355af65878e9a3.jpg",
          nickname: "可爱老哥",
          name: "huaweiPRO8",
          content: "很开心的一次交易，希望平台越做越好！",
          tiem: "2019-04-15"
        },
        {
          image:
            "http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/8f9c73a540f3711c80355af65878e9a3.jpg",
          nickname: "可爱老哥",
          name: "huaweiPRO8",
          content: "很开心的一次交易，希望平台越做越好！",
          tiem: "2019-04-15"
        }
      ],
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