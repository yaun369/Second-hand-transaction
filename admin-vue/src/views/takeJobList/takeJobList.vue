<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="联系人">
                    <div>{{form.name}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.telephone}}</div>                    
                </el-form-item>
                <el-form-item label="企业名称">
                    <div>{{form.com_name}}</div>
                </el-form-item>
                <el-form-item label="职位">
                    <div>{{form.job_name}}</div>                    
                </el-form-item>
                <el-form-item label="公司地区">
                    <div>{{form.address}}</div>
                </el-form-item>
                <el-form-item label="薪资">
                    <div>{{form.salary}}</div>                    
                </el-form-item>
                <el-form-item label="工作经验">
                    <div>{{form.exper}}</div>
                </el-form-item>
                <el-form-item label="人数">
                    <div>{{form.nums}}</div>                    
                </el-form-item>
                <el-form-item label="企业介绍">
                    <div>{{form.com_introduce}}</div>
                </el-form-item>
                <el-form-item label="职位描述">
                    <div>{{form.job_desc}}</div>                    
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
			<el-input style="width: 340px;" placeholder="请输入手机号/姓名" v-model="input"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch">查询</el-button>
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
        <el-table-column label="联系人" prop="name">
			</el-table-column>
		<el-table-column label="联系电话" prop="telephone">
			</el-table-column>
        <el-table-column label="企业名称" prop="com_name">
			</el-table-column>
		<el-table-column label="职位" prop="job_name">
			</el-table-column>     
        <el-table-column label="公司地区" prop="address">
			</el-table-column>
		<el-table-column label="薪资" prop="salary">
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
  getTakeJobList_api,
  getTakeJobInfo_api,
  deleteTakeJobList_api,
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
      dialogVisible: false
    };
  },
  methods: {
    toTopping(index) {
      console.log(index);
      let data = {
        id: this.tableData[index].id,
        type: 4,
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
        type: 4,
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
      getTakeJobInfo_api({ id: this.tableData[index].id }).then(res => {
        console.log("info", res);
        this.form = res.data;
      });
    },
    toDelete(index) {
      //删除
      deleteTakeJobList_api({ id: this.tableData[index].id }).then(res => {
        console.log(res);
        this.getSomeList({});
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getTakeJobList_api(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    }
  }
};
</script>
