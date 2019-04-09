<style scoped>
	.header {
		margin-top: 20px
	}

	.tab-container {
		margin: 30px;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
	.filter-container{
		display: flex;
		margin-top: 20px;
		padding-left: 20px;
		}
	.filter-container .filter-item {
		margin-bottom: 0px;
		margin-right: 40px;	
	}
	.search_div{
		display: flex;
		margin-right: 40px;
	}
	.search_div>button{
		margin-left: 20px;
	}

</style>

<template>
	<div>
		 <!--预览图片开始 -->
		 <el-dialog :visible.sync="dialogVisible">
		 	<img width="100%" :src="dialogImageUrl" alt="">
		 </el-dialog>
		 <!--预览图片结束 -->
		<el-container class="notice">
			<div class="filter-container">
				<div class="search_div">
				<el-select  v-model="orderState" placeholder="请选择"  @change="handleSelect">
					<el-option v-for="item in orderStateOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" @click="tableListSearch()" icon="el-icon-search">状态查询</el-button>
				</div>
		 		<div class="search_div">
				<el-date-picker size='large' v-model="time_interval" type="daterange" align="right" unlink-panels range-separator="至"
				start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions_time"  >
				</el-date-picker>
				<el-button type="primary" icon="el-icon-search" @click="handelTimesearch()">时间查询</el-button>
				</div> 
			</div>
			<el-header class="header" style="height:auto !important">
		<!-- 		<el-form :inline="true" class="form">
					<el-form-item label="订单状态">
						<el-select v-model="orderState" placeholder="请选择" @change="handleSelect">
							<el-option v-for="item in orderStateOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				<!-- 	<el-form-item>
						<el-input style="width: 340px;" placeholder="请输入订单号查询" v-model="searchOrder_sn"></el-input>
					</el-form-item> 
				
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" >查询</el-button>
					</el-form-item>
				</el-form> -->
				<el-form :inline="true" class="form">
					<el-form-item label="导出下列表格为Excel">
						<el-button type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出</el-button>
					</el-form-item>
				</el-form>
			</el-header>
			<!--中间订单列表开始 -->
			<el-main>
				<el-table :data="tableData" stripe v-loading="listLoading" element-loading-text="给我一点时间" style="width: 100%">
					<el-table-column label="订单号" prop="order_sn">
					</el-table-column>
					<el-table-column label="金额" prop="order_amount">
					</el-table-column>
					<el-table-column label="下单时间" prop="add_time">
					</el-table-column>
					<el-table-column label="订单状态">
						<template slot-scope="scope">
							<el-tag size="medium">{{ scope.row.order_state_id | regState }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="info" @click="lookItem(scope.$index, scope.row)">查看明细</el-button>
							<el-button size="mini" type="danger" @click="selectWorker(scope.$index, scope.row)" v-if=" scope.row.order_state_id== 20 || scope.row.order_state_id== 12">发货</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
			<!--中间订单列表结束 -->
			<!--底部分页开始 -->
			<el-footer>
				<el-pagination background @size-change="handleSizeChange()" @current-change="handleCurrentChange" :current-page="listQuery.page"
				    :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
				</el-pagination>
			</el-footer>
			<!--底部分页结束 -->
			<!--查看订单详情弹框开始 -->
			<el-dialog title="订单明细" :visible.sync="detailShow" width="80%">
				<el-form :model="orderDetail" ref="ruleForm" size="medium">
					<el-row style="border:1px solid #ccc;margin-bottom:20px">
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-form-item label="订单号" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.order_sn}}
									</p>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple">
								<el-form-item label="下单时间" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.add_time}}
									</p>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">
								<el-form-item label="金额" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.order_amount}}
									</p>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple">
								<el-form-item label="定金" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.order_deposit}}
									</p>
								</el-form-item>
							</div>
						</el-col>
<!-- 						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-form-item label="总价" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.all_amount}}
									</p>
								</el-form-item>
							</div>
						</el-col> -->
						<el-col :span="4">
							<div class="grid-content bg-purple-light">
								<el-form-item label="订单状态" :label-width="formLabelWidth">
									<p class="hbs-no-margin-p">
										{{orderDetail.order_state_id | regState}}
									</p>
								</el-form-item>
							</div>
						</el-col>
					</el-row>
					<el-form-item label="客户信息" :label-width="formLabelWidth" style="border:1px solid #ccc;">
						<el-form>
							<el-form-item label="收货地址" :label-width="formLabelWidth">
								<p class="hbs-no-margin-p">
									{{orderDetail.order_reciver_info.address}}
								</p>
							</el-form-item>
							<el-form-item label="收货人" :label-width="formLabelWidth">
								<p class="hbs-no-margin-p">
									{{orderDetail.order_reciver_info.name}}
								</p>
							</el-form-item>
							<el-form-item label="收货人电话" :label-width="formLabelWidth">
								<p class="hbs-no-margin-p">
									{{orderDetail.order_reciver_info.phone}}
								</p>
							</el-form-item>
						</el-form>
					</el-form-item>
					<el-form-item label="商品信息" :label-width="formLabelWidth" style="border:1px solid #ccc;padding:10px 0 0 0">
						<el-table :data="orderDetail.order_goods" stripe element-loading-text="给我一点时间" style="margin-top:-10px;">
							<el-table-column label="商品图片">
								<template slot-scope="scope">
									<img :src="scope.row.goods_image"  @click="handlePictureCardPreview(scope.row.goods_image)" alt="" width="80px">
								</template>
							</el-table-column>
							<el-table-column label="商品名" prop="goods_name">
							</el-table-column>
							<el-table-column label="单价" prop="goods_price">
							</el-table-column>
							<el-table-column label="租用开始时间" prop="goods_start">
							</el-table-column>
							<el-table-column label="租用结束时间" prop="goods_end">
							</el-table-column>
						</el-table>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="detailShow = false">返 回</el-button>
				</span>

			</el-dialog>
			<!--查看订单详情弹框结束 -->
		</el-container>
	</div>
</template>
<script>
	import {
		getROrderList_api,
		getROrder_api,
		changeROrder_api,
		rOrderState_api,
		getWorker_api,
	} from '@/api/seller';
	import {
		formatDate
	} from '../../../static/date.js';
	export default {
		created() {
			//获取订单列表
			this.getOrderList()
		},
		filters: {
			JsonObj: function (value) {
			//	console.log("过滤器")
			//	console.log(value)
				  if (!value) return [];
					let arr=[];
			 arr.push(JSON.parse(value));
			// console.log(arr)
				return arr
			},
			regState: function(code){
				 if(!code) return '暂无状态';
				 let state = '';
				// console.log("过滤")
				// console.log(code)
				 switch (code) {
				 	case '0':
				 		state = '已取消'
				 		break;
						case '10':
							state = '未支付'
							break;
				 	case '20':
				 		state = '已支付'
				 		break;
				 	case '30':
				 		state = '已发货'
				 		break;
				 	case '40':
				 		state = '已完成'
				 		break;
				 	default:
				 		state = '部分支付'
				 }
				 
				 return state
			}
		},
		data() {
			return {
				//中间订单列表请求loading
				listLoading: false,
				//请求订单列表
				tableData: [{
					order_sn: '',
					order_amount: 0,
					add_time: '',
					order_state: '',
					order_state_id: '',
					tail_amount: '',
					all_amount: ''
				}],
				//订单明细
				orderDetail: {
					order_reciver_info: {
						address: '',
						name: '',
						phone: '',

					},
					msgInfo: [],
				},
				//宽度
				formLabelWidth: '140px',
				//选择工人弹框数据
				workData: [],
				//图片预览弹框是否打开
				dialogVisible: false,
				//要预览的图片
				dialogImageUrl: '',
				//派单弹框默认隐藏
				dialogTableVisible: false,
				//要派的工人
				pushWorkList: [],
				//要派的订单
				pushOrderDetail:{},
				//订单明细弹框隐藏
				detailShow: false,
				//正在导出订单
				downloadLoading: false,
				//查询订单的几种下拉状态
				orderStateOptions: [{
						value: '',
						label: '全部订单'
					},
					{
						value: 0,
						label: '已取消'
					}, {
						value: 10,
						label: '未付款'
					},
					{
						value: 20,
						label: '待发货'
					}, {
						value: 30,
						label: '已发货'
					}, {
						value: 40,
						label: '已完成'
					}
				],
				//分页请求参数
				listQuery: {
					page: 1,
					limit: 10,
				},
				//分页请求参数
				listQuery_worker: {
					page: 1,
					limit: 10,
					worker_id: '',
					search: ''
				},
				
				//固定写法
					pickerOptions_time: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				//要查询得时间
				time_interval: '',
				//要查询订单的状态
				serchState:'',
				//要查询的订单号
				searchOrder_sn: '',
				//总共订单条数
				total: 0,
				//总共工人条数
				total_worker: 0,
				//当前列表订单状态
				orderState: '',
				//正在保存
				isloading: false,
			}
		},
		methods: {
			//根据日期间隔查询某个工人订单
			handelTimesearch(){
				if(!this.time_interval) return
				//console.log(this.time_interval)
				let arr=this.time_interval
			//	let obj={}
					this.listQuery.starttime= formatDate(arr[0], 'yyyy-MM-dd');
					this.listQuery.endtime= formatDate(arr[1], 'yyyy-MM-dd');
				this.getOrderList()
				},
			//下拉选择订单状态
			handleSelect(e) {
				console.log("列表状态")
				console.log(e)
				this.serchState=e
			},
			//根据订单状态，订单号查询
			tableListSearch() {
				console.log("查询")
				this.getOrderList()
			},
			//查看订单明细
			lookItem(index, raw) {
				console.log("查看明细");
				console.log(raw)
				this.detailShow = true
				this.getOrderDetail(raw.order_id)
			},
// 			//派单之前的确认
			selectWorker(idx,raw) {
				 
        this.$confirm('确认发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.pushOrderDetail=raw;
         this.pushOrder()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          });          
        });
      
		  
			
			},
			handleSelectionChange(val) {
				console.log("工人选中")
				console.log(val)
				this.pushWorkList=val;
			},
			//预览图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file;
				this.dialogVisible = true;
			},
			//以下为分页操作

			//改变limit
			handleSizeChange(val) {
				console.log("分页操作")
				this.listQuery.limit = val
				this.getOrderList();
			},
			//当前选中的页数
			handleCurrentChange(val) {
				this.listQuery.page = val;
				this.getOrderList();
			},

			//订单导出
			async handleDownload() {
				this.downloadLoading = true
				//请求全部订单数据
				let allOrder = await this.getOrderList(true);
							//console.log("数据")
						//	console.log(allOrder)
				import ('@/vendor/Export2Excel').then(excel => {
					const tHeader = ['订单号', '定金','总价' , '下单时间', '下单状态', ]
					const filterVal = ['order_sn','order_amount' ,'order_amount' , 'add_time', 'order_state', ]
					const list = allOrder
					const data = this.formatJson(filterVal, list)
					excel.export_json_to_excel({
						header: tHeader,
						data,
						filename: '三度云仓订单',
						autoWidth: true
					})
					this.downloadLoading = false
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if (j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			},
			//以下为方法
			//获取订单列表
			async getOrderList(isall) {
				console.log("是否请求全部")
				console.log(isall)
				let getData = {}
				if (isall) {
					getData = {}
				} else {
					getData = Object.assign({}, this.listQuery);
				}
				
				 if(this.searchOrder_sn){
					getData.order_sn=this.searchOrder_sn
				}else{
					if(this.serchState || this.serchState== '0'){
						//下拉查询
						getData.order_state=this.serchState
					}
				}
				let allres = await getROrderList_api(getData).then(res => {

					if (res.status == 0) {
						if (isall) {
							return res.data
						} else {
							this.tableData = res.data
						//	this.tableData.all_amount=Number(this.tableData.order_amount)+Number(this.tableData.tail_amount)
							this.total = res.pagination.total
						}
					}
				})

				return allres
			},
			//获取订单详情
			getOrderDetail(id) {
				getROrder_api(id).then(res => {
					console.log("详情")
					let order = res.data
					this.orderDetail = order[0];
					this.orderDetail.all_amount=Number(this.orderDetail.order_amount)+Number(this.orderDetail.tail_amount)
					//	this.orderDetail.msgInfo.push(JSON.parse(order[0].json))
					console.log(this.orderDetail)
				})
			},
			pushOrder(){
				this.isloading=true;
				 console.log("派单数据")
				 
				 console.log(this.pushOrderDetail)
	       //return
				 let sendData={}
				  sendData.order_id=this.pushOrderDetail.order_id;
					sendData.state_type='deliver_goods';
				rOrderState_api(sendData).then(res=>{
					if(res.status==0){
						this.dialogTableVisible = false;
						this.isloading=false;
						this.$notify({
												title: '发货',
												message: '发货成功',
												type: 'success',
												duration: 2000
											})
						this.getOrderList()
					}else{
						  this.$notify.error({
                   title: '错误',
                 message: '发货失败'
                 });
								 this.dialogTableVisible = false;
								 this.isloading=false;
					}
				})
			}
		}
	}
</script>
