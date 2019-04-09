<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="图片">
				        	<img :src="form.member_avatar" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="昵称">
                    <div>{{form.nickname}}</div>                    
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.telephone}}</div>
                </el-form-item>
                <el-form-item label="邮箱">
                    <div>{{form.email}}</div>                    
                </el-form-item>
                <el-form-item label="时间">
                    <div>{{form.ctime}}</div>
                </el-form-item>
                <el-form-item label="投诉建议">
                    <div>{{form.content}}</div>                    
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
			<el-input style="width: 340px;" placeholder="请输入手机号" v-model="input"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch">查询</el-button>
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
      <el-table-column label="头像">
				<template slot-scope="scope">
					<img :src="scope.row.member_avatar" style="width:100px;height: 80px;">
				</template>
			</el-table-column>
        <el-table-column label="昵称" prop="nickname">
			</el-table-column>
		<el-table-column label="联系电话" prop="telephone">
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
  getComplainList,
  getComplainInfo,
  deleteComplainList
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
      this.getSomeList({ telephone: this.input });
    },
    toLookInfo(index) {
      //查看详情
      this.dialogVisible = true;
      getComplainInfo({ id: this.tableData[index].id }).then(res => {
        console.log("info", res);
        this.form = res.data;
      });
    },
    toDelete(index) {
      //删除
      deleteComplainList({ id: this.tableData[index].id }).then(res => {
        console.log(res);
        this.getSomeList({});
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getComplainList(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    }
  }
};
</script>