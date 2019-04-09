<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
            	<el-form-item label="图片">
				    <el-upload action="" list-type="picture-card" :limit="1" :auto-upload="false" :file-list="form.image | filterUrl"
					 :on-change="handleImgChange" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<!-- <el-form-item label="视频">
				    <el-upload action="" list-type="text" :limit="1" :auto-upload="false" :file-list="form.video | filterUrl"
					 :on-change="handleImgChange_s" :on-remove="handleRemove_s">
						<el-button>添加视频</el-button>
					</el-upload>
				</el-form-item> -->
				<el-form-item label="时间">
                   <el-date-picker
                     v-model="form.pub_time"
                     type="date"
                     value-format="yyyy-MM-dd"
                     placeholder="选择日期">
                   </el-date-picker>
                </el-form-item>
        <el-form-item label="分类">
				<el-select v-model="form.brand_type" placeholder="请选择分类">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select> 
				</el-form-item>        
                <el-form-item label="标题">
                    <el-input v-model="form.title" style="width: 500px;"></el-input>                   
                </el-form-item>
				<el-form-item label="内容">
                    <el-input type="textarea" v-model="form.content" style="width: 500px;"></el-input>                   
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
                   <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
                   <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
        </el-form>
		</el-dialog>
    <el-dialog :visible.sync="dialogVisible_info">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
            	<el-form-item label="图片">
					<img :src="form.image" style="width:100px;height:80px;">
				</el-form-item>
				<!-- <el-form-item label="视频">
					<video :src="form.video" style="width:300px;height:200px;">your browser does not support the video tag</video>
				</el-form-item> -->
				<el-form-item label="分类">
                   {{form.brand_type}}
                </el-form-item>
				<el-form-item label="时间">
                   {{form.pub_time}}
                </el-form-item>
                <el-form-item label="标题">
                   {{form.title}}                 
                </el-form-item>
				<el-form-item label="内容">
                    {{form.content}}                  
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
      <el-button type="primary" @click="onAddPrice">添加资料</el-button>
      <el-select v-model="selectValue" placeholder="请选择分类" style="margin: 0 0 0 30px;" @change="toSelectClass">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>      
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
		<el-table-column label="图片">
            <template slot-scope="scope">
					<img :src="scope.row.image" style="width:100px;height: 80px;">
				</template>
		</el-table-column>
        <el-table-column label="标题" prop="title">
			</el-table-column>  
		<el-table-column label="分类" prop="brand_type">
			</el-table-column>
			<el-table-column label="时间" prop="pub_time">
			</el-table-column>
		<el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="toLookInfo(scope.$index)" type="primary" size="small">详情</el-button>
                <el-button @click="toDelete(scope.$index)" type="danger" size="small">删除</el-button>
            </template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background>
		</el-pagination>
	</div>
</template>

<script>
import {
  getBrandEnt,
  addBrandEnt,
  editBrandEnt,
  deleteBrandEnt,
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
      filterUrl: null,
      options: [
        {
          value: 1,
          label: "猪业"
        },
        {
          value: 2,
          label: "饲料"
        },
        {
          value: 3,
          label: "动保"
        }
      ]
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
      console.log(this.form);
      this.dialogVisible_info = true;
    },
    toSelectClass() {
      //选择分类
      console.log(this.selectValue);
      this.getSomeList({ brand_type: this.selectValue });
    },
    toDelete(index) {
      //删除
      let data = {
        id: this.tableData[index].id
      };
      deleteBrandEnt(data).then(res => {
        console.log("delete", res);
        if (!res.status) {
          this.getSomeList({});
        }
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getBrandEnt(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    onAddPrice() {
      //添加
      this.dialogVisible = true;
      this.isShowAdd = false;
      this.form = {};
      this.form.image = [];
    },
    onYesEdit() {
      //确定编辑
      if (!this.file.raw) {
        console.log("form", this.form);
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
          editBrandEnt(data).then(res => {
            console.log(res);
            if (!res.status) {
              this.dialogVisible = false;
              this.getSomeList({});
            }
          });
        });
      }
    },
    async onSubmit() {
      //确定添加
      let imgsUrl = "";
      let videoUrl = "";
      if (this.file) {
        let formData = new FormData();
        formData.append("file", this.file.raw);
        formData.append("type", 1);
        await upFile(formData).then(res => {
          imgsUrl = res.data.imgurl;
        });
      }
      if (this.file_s) {
        let formData_s = new FormData();
        formData_s.append("file", this.file_s.raw);
        formData_s.append("type", 2);
        await upFile(formData_s).then(res => {
          videoUrl = res.data.imgurl;
        });
      }
      let data = {
        image: imgsUrl,
        title: this.form.title,
        content: this.form.content,
        brand_type: this.form.brand_type,
        pub_time: this.form.pub_time
        // video: videoUrl
      };
      addBrandEnt(data).then(res => {
        console.log("add", res);
        if (!res.status) {
          this.dialogVisible = false;
          this.getSomeList({});
          window.location.reload();
        }
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
    },
    //上传视频
    handleImgChange_s(file, fileList) {
      console.log("fileList", fileList);
      this.file_s = file;
    },
    handleRemove_s(file, fileList) {
      console.log(file, fileList);
      this.form.video = "";
    }
  }
};
</script>