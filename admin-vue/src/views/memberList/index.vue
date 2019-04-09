<template>
  <div class="app-container">
    <!--预览图片开始 -->
    <el-dialog :visible.sync="dialogVisible">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="会员等级">
          <el-input v-model="form.member_rank" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.member_starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            v-model="form.member_endtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSetting">确定</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--预览图片结束 -->
    <!--顶部菜单开始 -->
    <div class="filter-container">
      <el-input style="width: 340px;" placeholder="请输入用户名" v-model="listQuery.telephone"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="tableListSearch()">查询</el-button>
    </div>
    <!--顶部菜单结束 -->
    <!--中间表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <!-- <el-table-column label="用户头像">
				<template slot-scope="scope">
					<img :src="scope.row.member_avatar" style="width:50px;height: 50px;">
				</template>
      </el-table-column>-->
      <el-table-column label="用户名" prop="member_name"></el-table-column>
      <el-table-column label="用户ID" prop="member_accountid"></el-table-column>
      <el-table-column label="注册时间" prop="member_addtime"></el-table-column>
      <el-table-column label="会员开始时间" prop="member_starttime"></el-table-column>
      <el-table-column label="会员结束时间" prop="member_endtime"></el-table-column>
      <el-table-column label="会员等级" prop="member_rank"></el-table-column>
      <el-table-column label="会员指定编码" prop="member_account"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="settingMember(scope.row)" type="primary" size="small">设置会员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--中间表格结束 -->
    <!-- 表格分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next"
      background
    ></el-pagination>
    <!--表格分页结束 -->
  </div>
</template>
<script>
import { getMemberList_api, settingMemberInfo } from "@/api/buyPigList";
export default {
  created() {
    //获取列表
    this.getMemberList();
  },
  data() {
    return {
      //会员列表
      tableData: [],
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10,
        telephone: ""
      },
      //图片预览弹框是否打开
      dialogVisible: false,
      //要预览的图片
      dialogImageUrl: "",
      //正在查询
      isloading: false,
      setData: {},
      form: {}
    };
  },
  methods: {
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file;
    },
    //保存内容
    onSubmit(form) {},
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getMemberList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getMemberList();
    },
    //查询
    tableListSearch() {
      if (!this.listQuery.telephone) return;
      this.getMemberList();
    },
    settingMember(row) {
      console.log("row", row);
      this.form = row;
      this.setData = row;
      this.dialogVisible = true;
    },
    //以下为api操作
    getMemberList() {
      let getData = Object.assign({}, this.listQuery);
      getMemberList_api(getData).then(res => {
        this.tableData = res.data;
        console.log("tabdata", this.tableData);
      });
    },
    doSetting() {
      console.log(this.setData.member_id);
      console.log(this.form.member_rank);
      let member_starttime = new Date(
        Date.parse(this.form.member_starttime.replace(/-/g, "/"))
      ).getTime();
      let member_endtime = new Date(
        Date.parse(this.form.member_endtime.replace(/-/g, "/"))
      ).getTime();
      console.log(member_starttime / 1000);
      console.log(member_endtime / 1000);
      let data = {
        member_id: Number(this.setData.member_id),
        member_rank: Number(this.form.member_rank),
        member_starttime: member_starttime / 1000,
        member_endtime: member_endtime / 1000
      };
      settingMemberInfo(data).then(res => {
        console.log(res);
        this.dialogVisible = false;
        this.getMemberList();
      });
    }
  }
};
</script>
