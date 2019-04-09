<style>
</style>

<template>
	<div class="app-container">
		<el-dialog title="找车信息" :visible.sync="dialogVisible1">
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
                <el-form-item label="发车时间">
                    <div>{{form.send_time}}</div>                    
                </el-form-item>
                <el-form-item label="所在地">
                    <div>{{form.address}}</div>                    
                </el-form-item>
                <el-form-item label="目的地">
                    <div>{{form.destination}}</div>                    
                </el-form-item>
                <el-form-item label="车型">
                    <div>{{form.car_type}}</div>                    
                </el-form-item>
                <el-form-item label="猪笼">
                    <div>{{form.pig_cage}}</div>                    
                </el-form-item>
                <el-form-item label="货物种类">
                    <div>{{form.pig_type}}</div>                    
                </el-form-item>
                <el-form-item label="货物数量">
                    <div>{{form.nums}}</div>                    
                </el-form-item>
                <el-form-item label="均重">
                    <div>{{form.weight}}</div>                    
                </el-form-item>
        </el-form>
		</el-dialog>

		<el-dialog title="找货信息" :visible.sync="dialogVisible2">
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
                <el-form-item label="所在地">
                    <div>{{form.address}}</div>                    
                </el-form-item>
                <el-form-item label="目的地">
                    <div>{{form.destination}}</div>                    
                </el-form-item>
                <el-form-item label="车型">
                    <div>{{form.car_type}}</div>                    
                </el-form-item>
                <el-form-item label="猪笼">
                    <div>{{form.pig_cage}}</div>                    
                </el-form-item>
                <el-form-item label="备注">
                    <div>{{form.remark}}</div>                    
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
        <el-table-column label="姓名" prop="name">
			</el-table-column>
		<el-table-column label="联系电话" prop="telephone">
			</el-table-column>
		<el-table-column label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.image" style="width:100px;height: 80px;">
				</template>
			</el-table-column>
        <el-table-column label="分类" prop="type">
			</el-table-column>
		<el-table-column label="车型" prop="car_type">
			</el-table-column>     
        <el-table-column label="猪笼" prop="pig_cage">
			</el-table-column>
		<el-table-column label="所在地区" prop="address">
			</el-table-column>        
		<el-table-column label="操作" >
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
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background >
		</el-pagination>
	</div>
</template>

<script>
import {
  getVehicleList_api,
  getVehicleInfo_api,
  deleteVehicleList_api,
  setTopping
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getBuyPigList({});
  },
  data() {
    return {
      selectValue: "",
      options: [
        {
          value: 2,
          label: "找货"
        },
        {
          value: 1,
          label: "找车"
        }
      ],
      input: "",
      tableData: [],
      form: {},
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogVisible1: false,
      dialogVisible2: false
    };
  },
  methods: {
    toTopping(index) {
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id,
        type: 3,
        is_top: 1
      };
      setTopping(data).then(res => {
        this.getBuyPigList({});
        console.log(res);
      });
    },
    toCancelTopping(index) {
      console.log(this.tableData[index].id);
      let data = {
        id: this.tableData[index].id,
        type: 3,
        is_top: 0
      };
      setTopping(data).then(res => {
        this.getBuyPigList({});
        console.log(res);
      });
    },
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getBuyPigList({});
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getBuyPigList({});
    },
    //查询
    tableListSearch() {
      this.getBuyPigList({ name: this.input });
    },
    toLookInfo(index) {
      //查看详情
      getVehicleInfo_api({ id: this.tableData[index].id }).then(res => {
        console.log(res.data);
        this.form = res.data;
        console.log(res.data.image.split(","));
        res.data.image0 = res.data.image.split(",")[0];
        res.data.image1 = res.data.image.split(",")[1];
        res.data.image2 = res.data.image.split(",")[2];
        if (res.data.type === 1) {
          this.dialogVisible1 = true;
        } else if (res.data.type === 2) {
          this.dialogVisible2 = true;
        }
      });
    },
    toDelete(index) {
      //删除
      deleteVehicleList_api({ id: this.tableData[index].id }).then(res => {
        this.getBuyPigList({});
      });
    },
    getBuyPigList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getVehicleList_api(getData).then(res => {
        this.tableData = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].type = res.data[i].type === 1 ? "找车" : "找货";
          if (res.data[i].image.indexOf(",") != -1) {
            res.data[i].image = res.data[i].image.substring(
              0,
              res.data[i].image.indexOf(",")
            );
          }
          this.tableData.push(res.data[i]);
        }
        console.log(this.tableData);
      });
    },
    toSelectClass() {
      //选择分类
      console.log(this.selectValue);
      let data = {
        type: this.selectValue
      };
      this.getBuyPigList(data);
    }
  }
};
</script>
