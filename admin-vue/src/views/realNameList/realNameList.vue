<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="头像">
					        <img :src="form.member_avatar" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="昵称">
                    <div>{{form.nickname}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.seller_phone}}</div>                    
                </el-form-item>
                <el-form-item label="姓名">
                    <div>{{form.seller_name}}</div>                    
                </el-form-item>
                <el-form-item label="身份认证">
                    <img :src="form.front_idcard" style="width:200px;height: 160px;">
                    <img :src="form.back_idcard" style="width:200px;height: 160px;">
                </el-form-item>
        </el-form>
		</el-dialog>
    <el-dialog :visible.sync="dialogVisible1">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="头像">
					        <img :src="form.member_avatar" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="昵称">
                    <div>{{form.nickname}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.buyer_phone}}</div>                    
                </el-form-item>
                <el-form-item label="姓名">
                    <div>{{form.buyer_name}}</div>                    
                </el-form-item>
                <el-form-item label="身份认证">
                    <img :src="form.front_idcard" style="width:200px;height: 160px;">
                    <img :src="form.back_idcard" style="width:200px;height: 160px;">
                </el-form-item>
        </el-form>
		</el-dialog>
    <el-dialog :visible.sync="dialogVisible2">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="头像">
					        <img :src="form.member_avatar" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="昵称">
                    <div>{{form.nickname}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.driver_phone}}</div>                    
                </el-form-item>
                <el-form-item label="姓名">
                    <div>{{form.driver_name}}</div>                    
                </el-form-item>
                <el-form-item label="身份认证">
                    <img :src="form.front_idcard" style="width:200px;height: 160px;">
                    <img :src="form.back_idcard" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="驾驶证">
                    <img :src="form.driver_licence" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="行驶证">
                    <img :src="form.car_licence" style="width:200px;height: 160px;">
                </el-form-item>
        </el-form>
		</el-dialog>
    <el-dialog :visible.sync="dialogVisible3">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <el-form-item label="头像">
					        <img :src="form.member_avatar" style="width:200px;height: 160px;">
                </el-form-item>
                <el-form-item label="昵称">
                    <div>{{form.nickname}}</div>
                </el-form-item>
                <el-form-item label="联系电话">
                    <div>{{form.com_phone}}</div>                    
                </el-form-item>
                <el-form-item label="企业法人">
                    <div>{{form.corporation}}</div>                    
                </el-form-item>
                <el-form-item label="企业地址">
                    <div>{{form.address}}</div>                    
                </el-form-item>
                <el-form-item label="信用代码">
                    <div>{{form.com_code}}</div>                    
                </el-form-item>
                <el-form-item label="营业执照">
                    <img :src="form.business_img" style="width:200px;height: 160px;">
                </el-form-item>
        </el-form>
		</el-dialog>
		<div class="filter-container">
			<el-input style="width: 340px;" placeholder="请输入手机号" v-model="input"></el-input>
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
          <el-table-column label="头像">
				<template slot-scope="scope">
					<img :src="scope.row.member_avatar" style="width:60px;height: 60px;">
				</template>
			</el-table-column>
        <el-table-column label="昵称" prop="member_nickname">
			</el-table-column>
		<el-table-column label="登陆手机号" prop="member_telephone">
			</el-table-column>
    <el-table-column label="分类" prop="member_type">
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
  getRealNameList,
  getRealNameInfo,
  deleteRealNameList
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
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      selectValue: "",
      options: [
        {
          value: 1,
          label: "买家"
        },
        {
          value: 2,
          label: "卖家"
        },
        {
          value: 3,
          label: "司机"
        },
        {
          value: 4,
          label: "企业"
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
      let type = this.tableData[index].member_type;
      if (type === "卖家") {
        this.dialogVisible = true;
      }
      if (type === "买家") {
        this.dialogVisible1 = true;
      }
      if (type === "司机") {
        this.dialogVisible2 = true;
      }
      if (type === "企业") {
        this.dialogVisible3 = true;
      }
      getRealNameInfo({ member_id: this.tableData[index].member_id }).then(
        res => {
          console.log("info", res.data);
          this.form = {};
          this.form = res.data;
        }
      );
    },
    toDelete(index) {
      //删除
      deleteRealNameList({ member_id: this.tableData[index].member_id }).then(
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
      getRealNameList(getData).then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].member_type === 1) {
            res.data[i].member_type = "买家";
          }
          if (res.data[i].member_type === 2) {
            res.data[i].member_type = "卖家";
          }
          if (res.data[i].member_type === 3) {
            res.data[i].member_type = "司机";
          }
          if (res.data[i].member_type === 4) {
            res.data[i].member_type = "企业";
          }
        }
        this.tableData = res.data;
      });
    }
  }
};
</script>