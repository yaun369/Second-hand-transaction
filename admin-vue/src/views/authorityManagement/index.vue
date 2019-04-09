<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="用户名">
                <el-input v-model="form.username" style="width: 200px;" :disabled="isShowAdd"></el-input>                   
                </el-form-item>
                <el-form-item label="账号">
					      <el-input v-model="form.account" style="width: 200px;" :disabled="isShowAdd"></el-input>
                </el-form-item>
                <el-form-item label="密码">
					      <el-input v-model="form.password" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                  <div>
                    <el-checkbox-group v-model="checkbox" size="mini">
                      <el-checkbox-button v-for="(city,index) in checkboxGroup1" :label="city.zh" :key="city.zh">{{city.zh}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
                   <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
                   <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
      <el-button type="primary" @click="onAddPrice">添加管理员</el-button>         
		</div>

		<el-table :data="tableData" style="width: 100%">
		<el-table-column type="index" width="50">
		  </el-table-column>
    <el-table-column label="用户名" prop="username">
			</el-table-column>
		<el-table-column label="账号" prop="account">
			</el-table-column>
		<el-table-column label="操作">
    <template slot-scope="scope">
        <el-button @click="toLookInfo(scope.$index)" type="primary" size="small">编辑</el-button>
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
  getAuthList_api,
  addAuth_api,
  editAuth_api,
  deleteAuth_api
} from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getSomeList({});
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
      checkbox: [],
      checkboxGroup: [
        "买猪列表",
        "卖猪列表",
        "猪车列表",
        "招聘列表",
        "求职列表",
        "猪场租售列表",
        "实名认证列表",
        "投诉列表",
        "人员管理",
        "权限管理",
        "运营"
      ],
      checkboxGroup1: [
        { name: "adminbuyer", zh: "买猪列表" },
        { name: "adminseller", zh: "卖猪列表" },
        { name: "pigcar", zh: "猪车列表" },
        { name: "adminrecruit", zh: "招聘列表" },
        { name: "adminjob", zh: "求职列表" },
        { name: "piggery", zh: "猪场租售列表" },
        { name: "adminuser", zh: "用户管理" },
        { name: "admincert", zh: "实名认证列表" },
        { name: "complain", zh: "投诉列表" },
        { name: "runmanage", zh: "运营" },
        { name: "adminauth", zh: "权限管理" }
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
      //编辑
      this.isShowAdd = true;
      this.form = this.tableData[index];
      console.log(this.form.admin_limits);
      let arr = [];
      for (let i = 0; i < this.checkboxGroup1.length; i++) {
        for (let j = 0; j < this.form.admin_limits.length; j++) {
          if (this.form.admin_limits[j] === this.checkboxGroup1[i].name) {
            arr.push(this.checkboxGroup1[i].zh);
          }
        }
      }
      this.checkbox = arr;
      console.log(this.checkbox);
      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let data = {
        id: this.tableData[index].id
      };
      deleteAuth_api(data).then(res => {
        console.log("delete", res);
        if (!res.status) {
          // this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    },
    getSomeList(data) {
      //获取列表
      let getData = Object.assign(data, this.listQuery);
      getAuthList_api(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    onAddPrice() {
      //添加
      this.dialogVisible = true;
      this.isShowAdd = false;
      this.form = {};
      this.checkbox = [];
    },
    onYesEdit() {
      //确定编辑
      console.log("form", this.form);
      let arr = [];
      for (let i = 0; i < this.checkboxGroup1.length; i++) {
        for (let j = 0; j < this.checkbox.length; j++) {
          if (this.checkbox[j] === this.checkboxGroup1[i].zh) {
            arr.push(this.checkboxGroup1[i].name);
          }
        }
      }
      let admin_limits = null;
      for (let k = 0; k < arr.length; k++) {
        if (admin_limits === null) {
          admin_limits = arr[0];
        } else {
          admin_limits = admin_limits + "|" + arr[k];
        }
      }
      let data = {
        id: this.form.id,
        admin_limits: admin_limits,
        password: this.form.password
      };
      editAuth_api(data).then(res => {
        console.log(res);
        if (!res.status) {
          this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    },
    onSubmit() {
      //确定添加
      console.log(this.checkbox);
      let arr = [];
      for (let i = 0; i < this.checkboxGroup1.length; i++) {
        for (let j = 0; j < this.checkbox.length; j++) {
          if (this.checkbox[j] === this.checkboxGroup1[i].zh) {
            arr.push(this.checkboxGroup1[i].name);
          }
        }
      }
      console.log(arr);
      let admin_limits = null;
      for (let k = 0; k < arr.length; k++) {
        if (admin_limits === null) {
          admin_limits = arr[0];
        } else {
          admin_limits = admin_limits + "|" + arr[k];
        }
      }
      let data = {
        username: this.form.username,
        account: this.form.account,
        password: this.form.password,
        admin_limits: admin_limits
      };
      addAuth_api(data).then(res => {
        console.log(res);
        if (!res.status) {
          this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    }
  }
};
</script>