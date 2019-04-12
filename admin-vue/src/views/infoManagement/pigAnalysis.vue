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
            :file-list="form.technology_image | filterUrl"
            :on-change="handleImgChange"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.technology_title" style="width: 500px;"></el-input>
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
        <el-form-item label="浏览量">
          <el-input v-model="form.technology_views" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.technology_content" style="width: 500px;"></el-input>
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
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
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
  getLinkpig,
  addLinkpig,
  editLinkpig,
  deleteLinkpig,
  upFile
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
      dateArr: [],
      isShowAdd: false,
      selectValue: "",
      selectValue_s: "",
      input: "",
      tableData: [{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"图书",
        time:"2019-03-17"
      },{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"数码",
        time:"2019-03-17"
      },{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"体育",
        time:"2019-03-17"
      },{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"文娱",
        time:"2019-03-17"
      },{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"服饰",
        time:"2019-03-17"
      },{
        image:"http://bmob-cdn-23273.b0.upaiyun.com/2019/01/03/f7aa1664405747f8802fe7c35a083a6a.jpg",
        name:"其他",
        time:"2019-03-17"
      }],
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
        technology_id: this.tableData[index].technology_id
      };
      deleteLinkpig(data).then(res => {
        console.log("delete", res);
        this.getSomeList({});
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getLinkpig(getData).then(res => {
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
      this.form.technology_image = [];
    },
    onYesEdit() {
      //确定编辑
      let technology_image;
      if (this.file) {
        let pic = Bmob.File(this.file.name, this.file.raw);
        pic.save().then(res => {
          console.log(res);
          technology_image = res[0].url;
        });
      } else {
        technology_image = this.form.technology_image;
      }
      let data = {
        technology_id: this.form.technology_id,
        classification_id: this.form.classification_id,
        technology_title: this.form.technology_title,
        technology_views: this.form.technology_views,
        technology_content: this.form.technology_content,
        technology_image: technology_image
      };
      editLinkpig(data).then(res => {
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
          technology_title: this.form.technology_title,
          technology_views: this.form.technology_views,
          technology_content: this.form.technology_content,
          technology_image: res[0].url
        };
        addLinkpig(data).then(res => {
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