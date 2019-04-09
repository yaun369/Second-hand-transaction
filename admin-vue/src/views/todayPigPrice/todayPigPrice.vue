<style>
</style>

<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible">
			<div style="margin: 20px;"></div>
        <el-form label-position="right" label-width="80px" :model="form">
                <!-- <el-form-item label="分类">
				<el-select v-model="form.type" placeholder="请选择分类">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select> 
                </el-form-item> -->
                <el-form-item label="品牌分类">
                 <el-select v-model="form.breed_type" placeholder="请选择品牌分类">
                    <el-option
                        v-for="item in options_s"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>   
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" style="width: 200px;"></el-input>                   
                </el-form-item>
                <!-- <el-form-item label="地区">
					<el-input v-model="form.address" style="width: 200px;"></el-input>
                </el-form-item> -->
                <el-form-item label="时间">
                   <el-date-picker
                     v-model="form.pub_time"
                     type="date"
                     value-format="yyyy-MM-dd"
                     placeholder="选择日期">
                   </el-date-picker>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-if="isShowAdd" @click="onYesEdit">确定编辑</el-button>
                   <el-button type="primary" v-if="!isShowAdd" @click="onSubmit">确定添加</el-button>
                   <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
        </el-form>
		</el-dialog>

		<div class="filter-container">
            <el-button type="primary" @click="onAddPrice">添加猪价</el-button>
    <el-date-picker
      v-model="dateArr"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="/"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch">查询</el-button>
            <!-- <el-select v-model="selectValue" placeholder="请选择分类" style="margin: 0 0 0 30px;" @change="toSelectClass">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>  -->
            <el-select v-model="selectValue_s" placeholder="请选择品牌分类" style="margin: 0 0 0 30px;" @change="toSelectClass_s">
              <el-option
                v-for="item in options_s"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>          
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
		<el-table-column label="品牌分类" prop="breed_type">
			</el-table-column>
        <el-table-column label="价格" prop="price">
			</el-table-column>  
        <el-table-column label="时间" prop="pub_time">
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
  getTodayPigPriceList_api,
  addTodayPigPriceList_api,
  editTodayPigPriceList_api,
  deleteTodayPigPriceList_api
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
      options: [
        {
          value: 1,
          label: "屠宰场"
        },
        {
          value: 2,
          label: "品牌猪场"
        }
      ],
      options_s: [
        {
          value: 1,
          label: "外三元"
        },
        {
          value: 2,
          label: "内三元"
        },
        {
          value: 3,
          label: "土杂猪"
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
      this.listQuery.page = val;
      this.getSomeList({});
    },
    //查询
    tableListSearch() {
      console.log("dateArr", this.dateArr);
      this.getSomeList({
        start_time: this.dateArr[0],
        end_time: this.dateArr[1]
      });
    },
    toLookInfo(index) {
      //编辑
      this.isShowAdd = true;
      this.form = this.tableData[index];
      this.dialogVisible = true;
    },
    toDelete(index) {
      //删除
      let data = {
        id: this.tableData[index].id
      };
      deleteTodayPigPriceList_api(data).then(res => {
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
      getTodayPigPriceList_api(getData).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    toSelectClass() {
      //选择分类
      console.log(this.selectValue);
      this.getSomeList({ type: this.selectValue });
    },
    toSelectClass_s() {
      //选择分类
      console.log(this.selectValue_s);
      this.getSomeList({ breed_type: this.selectValue_s });
    },
    onAddPrice() {
      //添加猪价
      this.dialogVisible = true;
      this.isShowAdd = false;
      this.form = {};
    },
    onYesEdit() {
      //确定编辑
      console.log("form", this.form);
      if (this.form.type === "屠宰场") {
        this.form.type = 1;
      }
      if (this.form.type === "品牌猪场") {
        this.form.type = 2;
      }
      if (this.form.breed_type === "外三元") {
        this.form.breed_type = 1;
      }
      if (this.form.breed_type === "内三元") {
        this.form.breed_type = 2;
      }
      if (this.form.breed_type === "土杂猪") {
        this.form.breed_type = 3;
      }
      let data = {
        id: this.form.id,
        type: this.form.type,
        breed_type: this.form.breed_type,
        price: this.form.price,
        address: this.form.address,
        pub_time: this.form.pub_time
      };
      editTodayPigPriceList_api(data).then(res => {
        console.log(res);
        if (!res.status) {
          this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    },
    onSubmit() {
      //确定添加
      console.log(this.form.pub_time);
      let data = {
        // type: this.form.type,
        breed_type: this.form.breed_type,
        price: this.form.price,
        // address: this.form.address,
        pub_time: this.form.pub_time
      };
      addTodayPigPriceList_api(data).then(res => {
        console.log("add", res);
        if (!res.status) {
          this.dialogVisible = false;
          this.getSomeList({});
        }
      });
    }
  }
};
</script>