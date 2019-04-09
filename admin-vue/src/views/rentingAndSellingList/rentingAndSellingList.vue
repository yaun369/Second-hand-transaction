<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="图片">
					        <img :src="form.image0" style="width:200px;height: 160px;">
					        <img :src="form.image1" v-if="form.image1 != undefined" style="width:200px;height: 160px;">
                  <img :src="form.image2" v-if="form.image2 != undefined" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="联系人">
                    <div>{{form.name}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.telephone}}</div>                    
                </el-form-item>
                <el-form-item label="租/售">
                    <div>{{form.type}}</div>                    
                </el-form-item>
                <el-form-item label="规模">
                    <div>{{form.scale}}</div>
                </el-form-item>
                <el-form-item label="猪场地址">
                    <div>{{form.address}}</div>                    
                </el-form-item>
                <el-form-item label="建厂时间">
                    <div>{{form.b_ctime}}</div>
                </el-form-item>
                <el-form-item label="建筑面积">
                    <div>{{form.area}}</div>                    
                </el-form-item>
                <el-form-item label="具体描述">
                    <div>{{form.desc}}</div>
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
			<el-input style="width: 340px;" placeholder="请输入手机号/姓名" v-model="input"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch">查询</el-button>
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
        <el-table-column label="联系人" prop="name">
			</el-table-column>
		<el-table-column label="联系电话" prop="telephone">
			</el-table-column>
    <el-table-column label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.image" style="width:100px;height: 80px;">
				</template>
			</el-table-column>
    <el-table-column label="租/售" prop="type">
			</el-table-column>
		<el-table-column label="规模" prop="scale">
			</el-table-column>     
        <el-table-column label="猪场地址" prop="address">
			</el-table-column>
		<el-table-column label="建厂时间" prop="b_ctime">
			</el-table-column>
		<el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="toLookInfo(scope.$index)" type="primary" size="small">详情</el-button>
                <el-button @click="toDelete(scope.$index)" type="danger" size="small">删除</el-button>
                <div style="width:80px;height:20px;margin:10px 0 10px 0;">
                  <el-button v-if="!scope.row.is_top" @click="toTopping(scope.$index)" type="primary" size="mini">置顶</el-button>
                  <el-button v-if="scope.row.is_top" @click="toCancelTopping(scope.$index)" type="danger" size="mini">取消置顶</el-button>
                </div>
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
  getrentingAndSellingList_api,
  getrentingAndSellingInfo_api,
  deleterentingAndSellingList_api,
  setTopping
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getSomeList({});
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
      dialogVisible: false,
      selectValue: "",
      options: [
        {
          value: 1,
          label: "租"
        },
        {
          value: 2,
          label: "售"
        }
      ]
    };
  },
  methods: {
    toTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 6,
        is_top: 1
      };
      setTopping(data).then(res => {
        this.getSomeList({});
      });
    },
    toCancelTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 6,
        is_top: 0
      };
      setTopping(data).then(res => {
        this.getSomeList({});
      });
    },
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getSomeList({});
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getSomeList({});
    },
    //查询
    tableListSearch() {
      this.getSomeList({ name: this.input });
    },
    toLookInfo(index) {
      //查看详情
      this.dialogVisible = true;
      getrentingAndSellingInfo_api({ id: this.tableData[index].id }).then(
        res => {
          console.log("info", res);
          console.log(res.data.image.split(","));
          res.data.image0 = res.data.image.split(",")[0];
          res.data.image1 = res.data.image.split(",")[1];
          res.data.image2 = res.data.image.split(",")[2];
          if (res.data.type === 1) {
            res.data.type = "租";
          }
          if (res.data.type === 2) {
            res.data.type = "售";
          }
          this.form = res.data;
        }
      );
    },
    toDelete(index) {
      //删除
      deleterentingAndSellingList_api({ id: this.tableData[index].id }).then(
        res => {
          console.log(res);
          this.getSomeList({});
        }
      );
    },
    toSelectClass() {
      //选择分类
      console.log(this.selectValue);
      this.getSomeList({ type: this.selectValue });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getrentingAndSellingList_api(getData).then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === 1) {
            res.data[i].type = "租";
          }
          if (res.data[i].type === 2) {
            res.data[i].type = "售";
          }
          if (res.data[i].image.indexOf(",") != -1) {
            console.log(
              res.data[i].image.substring(0, res.data[i].image.indexOf(","))
            );
            res.data[i].image = res.data[i].image.substring(
              0,
              res.data[i].image.indexOf(",")
            );
          }
        }
        this.tableData = res.data;
      });
    }
  }
};
</script>