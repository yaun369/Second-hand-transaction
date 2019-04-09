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
                <el-form-item label="联系电话">
                    <div>{{form.telephone}}</div>
                </el-form-item>
                <el-form-item label="姓名">
                    <div>{{form.name}}</div>                    
                </el-form-item>
                <el-form-item label="地区">
                    <div>{{form.address}}</div>                    
                </el-form-item>
                <el-form-item label="品种">
                    <div>{{form.pig_type_name}}</div>                    
                </el-form-item>
                <el-form-item label="数量">
                    <div>{{form.nums}}</div>                    
                </el-form-item>
                <el-form-item label="价格">
                    <div>{{form.price}}</div>                    
                </el-form-item>
                <el-form-item label="出栏时间">
                    <div>{{form.buy_time}}</div>                    
                </el-form-item>
                <el-form-item label="规格">
                    <div>{{form.weight}}</div>                    
                </el-form-item>
                <el-form-item label="备注">
                    <div>{{form.remark}}</div>                    
                </el-form-item>
                <el-form-item label="所属类型">
                    <div>{{form.piggery_type}}</div>                    
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
			<el-input style="width:340px;" placeholder="请输入手机号/姓名" v-model="input"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch">查询</el-button>
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
        <el-table-column label="姓名" prop="name">
			</el-table-column>
		<el-table-column label="联系电话" prop="telephone">
			</el-table-column>
		<el-table-column label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.image" style="width:80px;height:60px;">
				</template>
			</el-table-column>
        <el-table-column label="地区" prop="address">
			</el-table-column>
		<el-table-column label="品种" prop="pig_type_name">
			</el-table-column>     
        <el-table-column label="数量" prop="nums">
			</el-table-column>
		<el-table-column label="价格" prop="price">
			</el-table-column>        
    <el-table-column label="求购时间" prop="buy_time">
			</el-table-column>
		<el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="toLookInfo(scope.$index)" type="primary" size="mini">详情</el-button>
                <el-button @click="toDelete(scope.$index)" type="danger" size="mini">删除</el-button>
                <div style="width:80px;height:20px;margin:10px 0 10px 0;">
                  <el-button v-if="!scope.row.is_top" @click="toTopping(scope.$index)" type="primary" size="mini">置顶</el-button>
                  <el-button v-if="scope.row.is_top" @click="toCancelTopping(scope.$index)" type="danger" size="mini">取消置顶</el-button>
                </div>
            </template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background >
		</el-pagination>
	</div>
</template>

<script>
import {
  getBuyPigList_api,
  getBuyPigInfo_api,
  deleteBuyPigList_api,
  setTopping
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getBuyPigList();
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
      //总条数
      // total: 0,
      dialogVisible: false
    };
  },
  methods: {
    toTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 1,
        is_top: 1
      };
      setTopping(data).then(res => {
        this.getBuyPigList();
      });
    },
    toCancelTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 1,
        is_top: 0
      };
      setTopping(data).then(res => {
        this.getBuyPigList();
      });
    },
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getBuyPigList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getBuyPigList();
    },
    //查询
    tableListSearch() {
      let getData = Object.assign({ name: this.input }, this.listQuery);
      getBuyPigList_api(getData).then(res => {
        console.log("res", res.data);
        this.tableData = res.data;
      });
    },
    toLookInfo(index) {
      //查看详情
      this.dialogVisible = true;
      console.log(index);
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id
      };
      getBuyPigInfo_api(data).then(res => {
        console.log("getBuyPigInfo_api", res.data);
        res.data.image0 = res.data.image.split(",")[0];
        res.data.image1 = res.data.image.split(",")[1];
        res.data.image2 = res.data.image.split(",")[2];
        this.form = res.data;
        console.log(this.form);
      });
    },
    toDelete(index) {
      //删除
      console.log(index);
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id
      };
      deleteBuyPigList_api(data).then(res => {
        console.log(res);
        this.getBuyPigList();
      });
    },
    getBuyPigList() {
      //获取买猪列表
      let getData = Object.assign({}, this.listQuery);
      getBuyPigList_api(getData).then(res => {
        console.log("res", res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].image.indexOf(","));
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
