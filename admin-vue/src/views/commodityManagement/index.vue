<style scoped>
	.filter-container{
		display: flex;
		
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
	.graphic{
				border: solid #D5DBE7 1px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-around;
				border-radius: 5px;
				margin-bottom: 20px;
				padding: 30px 0;
			}
</style>
<template>
	<div class="app-container">
		<!--预览图片开始 -->
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<!--预览图片结束 -->
		<!--顶部菜单开始 -->
		<div class="filter-container">
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="CreateItem">新增商品</el-button>
			<div class="search_div">
			<el-select v-model="value_top" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value"  :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="searchGoods('class_find')" icon="el-icon-search">分类查询</el-button>
			</div>
			<div class="search_div">
			<el-input v-model="listQuery.search"   placeholder="请输入商品名称"></el-input>
			<el-button type="primary" @click="searchGoods('name_find')" icon="el-icon-search">名称查询</el-button>
			</div>
			<div class="search_div">
			<el-select v-model="listQuery.goods_state" placeholder="请选择">
				<el-option label="在售" value="1">
				</el-option>
				<el-option label="未售" value="0">
				</el-option>
			</el-select>
			<el-button type="primary" @click="searchGoods('state_find')" icon="el-icon-search">状态查询</el-button>
			</div>
		</div>
		<div class="filter-container">
			<el-badge :value="checkedGoodsNum.length" class="item" style="margin-right: 40px;">
				<el-button round disabled icon="el-icon-check">已选数量</el-button>
			</el-badge>
			<el-button round type="primary" @click="pushUpload" icon="el-icon-upload2">批量上架</el-button>
			<el-button round type="danger" @click="pullDownload" icon="el-icon-download">批量下架</el-button>
		</div>
		<!--顶部菜单结束 -->
		<!--中间表格开始 -->
		<el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="listLoading"
		 element-loading-text="给我一点时间">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="图片" prop="url">
				<template slot-scope="scope">
					<img @click="handlePictureCardPreview(scope.row)" :src="scope.row.goods_image" style="width:50px">
				</template>
			</el-table-column>
			<el-table-column label="商品名称" prop="goods_name">
			</el-table-column>
			<el-table-column label="价格(元/天)" prop="goods_price">
			</el-table-column>
			<el-table-column label="分类" prop="gc_name">
			</el-table-column>
			<el-table-column label="状态" prop="gc_name">
				<template slot-scope="scope">
					<el-tag type="info">{{scope.row.goods_state==1 ? '在售' : '未售'}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="success" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handeleDel(scope.$index,scope.row)">删除</el-button>
					<el-button size="mini" type="primary" v-if="scope.row.goods_state==0" @click="handlePush(scope.$index, scope.row)">上架</el-button>
					<el-button size="mini" type="warning" v-else @click="handlePull(scope.$index, scope.row)">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--中间表格结束 -->
		<!-- 表格分页开始 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background :total="total">
		</el-pagination>
		<!--表格分页结束 -->
		<!--内容弹框开始 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="100">
			<el-form :rules="rules" ref="form" :model="form" label-width="150px">
				<el-form-item label="商品分类">
					<template>
						<el-select v-model="alertValue" placeholder="请选择分类" @change="handele_select" >
							<el-option v-for="item in selectedOptions_alert"  :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="商品轮播图(1-3张)" prop="goods_image">
					<el-upload action="" list-type="picture-card" accept="image/*" :limit="3" :auto-upload="false" :on-change="handleImgChange_image"
					 :on-preview="handlePictureCardPreview" :on-remove="handleRemove_goods_image" :file-list="form.goods_image | filterUrl">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="商品名称" prop="goods_name">
					<el-input v-model="form.goods_name"></el-input>
				</el-form-item>
				<el-form-item label="商品价格(元/天)" prop="goods_price">
					<el-input type="number" v-model="form.goods_price"></el-input>
				</el-form-item>
				<el-form-item label="商品库存" prop="goods_storage">
					<el-input v-model="form.goods_storage"></el-input>
				</el-form-item>
				<el-form-item label="商品运费" prop="goods_freight">
					<el-input type="number" v-model="form.goods_freight"></el-input>
				</el-form-item>
				<!-- 这里添加动态图文个数开始 -->
				<el-form-item label="商品详情">
					<el-button size="mini" type="success" @click="addGraphic()" :disabled="dialogStatus == 'edit'">添加内容</el-button>
				</el-form-item>
				<!-- 这里添加动态图文个数结束 -->
				<!-- 图文模块部分开始 -->
				<div v-for="(formItem,index) of form.formObjRepeat" :key="index" @click="getIndex(index)">
					<el-form :model="formItem">
						<el-row :gutter="20" class="graphic">
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="描述" label-width="130px" prop="title">
										<el-input v-model="formItem.Repeat_title" type="textarea" autosize placeholder="请输入内容"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-form-item label="图片(1张)" label-width="130px" prop="content">
										<el-upload action="" list-type="picture-card" accept="image/*" :limit="1" :auto-upload="false" :file-list="formItem.Repeat_images"
										 :on-change="handleImgChange_detail" :on-preview="handlePictureCardPreview"  :on-remove="handleRemove_detail">
											<i class="el-icon-plus"></i>
										</el-upload>
									</el-form-item>
								</div>
							</el-col>

							<el-col :span="24" style="margin-left: 130px;">
								<div>
									<el-button type="danger" :disabled="dialogStatus == 'edit'" @click="deleteItem(index)">删除</el-button>
								</div>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 图文模块部分结束 -->
				<el-form-item>
					<el-button type="primary" :disabled="isUpimg" @click="onSubmit(form)" :loading="isloading">保存</el-button>
					<el-button @click="dialogFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 内容弹框结束-->
	</div>

</template>
<script>
	import {
		addGoods_api,
		getGoodsList_api,
		deleGoods_api,
		editRec_api,
		getGoods_api,
		upDownGoods_api,
		getEntryList_api,
		getIndustryList_api,
		setting_api
	} from '@/api/seller'
	import uploadFn from '@/utils/aahbs'

	//初始化常量
	const form = {
		goods_name: '',
		goods_price: '',
		goods_storage: '',
		goods_advword: '',
		goods_image: [],
		goods_body: '',
		formObjRepeat: [{
			Repeat_images: [],
			Repeat_title: ''
		}],
		goods_freight: '',
	}
	//新增商品字段
	const sendData = {
		storegc_id: '',
		goods_name: '',
		goods_price: '',
		goods_serial: '',
		goods_advword: '',
		goods_image: [],
		goods_body: [],
		cate_id: 764,
		type_id: 0,
		goods_storage: '',
		gc_name: '自定义分类',
		mobile_body: '',
		goods_faker_salenum: 1000,
		is_platform_store: 1,
		school_id: 0,
		school_name: 1,
		goods_freight: 0,
		goods_marketprice: 0,
		goods_costprice: 0,
		goods_discount: 0,
		goods_freigth: 0,
		is_virtual: 0,
		virtual_limit: 10,
		virtual_indate: '',
		goods_commend: 0,
	}
	//修改商品字段
	const editData = {
		gc_id:'',
		gc_name: '',
		goods_commonid: '',
		goods_name: '',
		goods_price: '',
		goods_marketprice: 0,
		goods_costprice: 0,
		goods_storage: 1000,
		goods_serial: '',
		goods_image: [],
		goods_body: [],
		goods_freight: 0,
		goods_stcids: '',
		is_virtual: 0,
		is_appoint: 0,
		goods_advword: '',
		mobile_body: '',
		goods_faker_salenum: 0,
		goods_commend: 0,
		virtual_limit: 10,
		virtual_indate: '',
		is_platform_store: ''
	}
	export default {
		created() {
			//获取自定义商品分类
			this.getGoodsClass();
			//获取全部商品列表
			this.getGoodsList()
		},
		filters: {
			//这里进行加入url到Ui框架
			filterUrl: function(value) {
				//console.log("进来的")
				let arr = []
				// console.log(value)
				if (!Array.isArray(value)) {
					arr.push({
							url: value
						}),
						value = arr
				} else {
					for (let i = 0; i < value.length; i++) {
						if (!value[i].url) {
							value[i] = {
								url: value[i]
							}
						}
					}
				}
				//console.log("过滤的")
				//console.log(value)
				return value
			}
		},

		//以上为自定义方法
		data() {
			return {
				//商品勾选列表
				checkedGoodsNum: [],
				//弹框下拉分类
				selectedOptions_alert: [],
				//选项下拉数据
				options: [],
				//选择的分类
				value_top: '',
				//弹框选择的分类
				alertValue: '',
				//商品列表
				tableData: [],
				//分页（请求参数）
				listQuery: {
					page: 1,
					limit: 10,
					time: '',
					search: '',
					goods_state: '',
				},
				//总条数
				total: 0,
				//判断弹框是新增还是编辑
				textMap: {
					edit: '编辑',
					create: '添加'
				},
				//默认弹框隐藏
				dialogFormVisible: false,
				//弹框状态
				dialogStatus: '',
				//表单内容
				form: Object.assign({}, form),
				//图片预览弹框是否打开
				dialogVisible: false,
				//要预览的图片
				dialogImageUrl: '',
				//表单验证规则
				rules: {
					selectedOptions_alert: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'change'
					}],
					goods_name: [{
							required: true,
							message: '请输入商品名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在1到20个字'
						}
					],
					goods_price: [{
						required: true,
						message: '请输入商品价格',
						trigger: 'blur'
					}, ],
					goods_storage: [{
						required: true,
						message: '请输入商品库存',
						trigger: 'blur'
					}, ],
					goods_freight: [{
						required: true,
						message: '请输入商品运费',
						trigger: 'blur'
					}],
					goods_image: [{
						required: false,
						message: '请传1至3张图片',
						trigger: 'change'
					}, ],
					goods_body: [{
						required: false,
						message: '请传1至3张图片',
						trigger: 'change'
					}, ],
					goods_advword: [{
							required: true,
							message: '请输入商品描述',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: '长度在1到30个字'
						}
					]
				},
				//正在上传图片
				isUpimg: false,
				//表格刷新
				listLoading: false,
				//正在保存
				isloading: false,
				//最后提交的表单数据
				sendData: Object.assign({}, sendData),
				//最后修改的数据
				editData: Object.assign({}, editData),
				//动态模块当前索引
				moddele_idx: '',
			}
		},
		methods: {
			//获取当前模块索引值
			getIndex(index) {
				this.moddele_idx = index
			},
			//添加图片模块
			addGraphic() {
				this.form.formObjRepeat.push({
					Repeat_images: [],
					Repeat_title: ''
				})
			},
			//删除某个图文模块
			deleteItem(idx) {
				console.log("删除图文")
				console.log(idx)
				console.log(this.form)
				this.form.formObjRepeat.splice(idx, 1)
			},
			//保存内容
			onSubmit(form) {
				this.sendData = Object.assign({}, sendData)
				console.log("form最后")
				console.log(this.form)
				this.form.goods_body = JSON.stringify(this.form.formObjRepeat)

				this.$refs['form'].validate((valid) => {
					if (valid) {
						this.isloading = true;
						for (let key in this.form) {
							this.sendData[key] = this.form[key]
						}
						//这里判断是编辑商品还是新增商品
						if (this.dialogStatus == 'edit') {
							this.editGoods(this.sendData)
						} else {
							console.log("发送这一不")
							console.log(this.sendData)
							this.addGoods(this.sendData)
						}

					} else {
						return false;
					}
				});

			},
			//获取商品列表
			getGoodsList() {
				this.listLoading = true;
				let getData = Object.assign({}, this.listQuery);
				for(let key in getData){
					if(!getData[key]){
						delete getData[key]
					}
				}
				getGoodsList_api(getData).then(res => {
					if (res.status == 0) {
						this.listLoading = false;
						this.tableData = res.data;
						this.total = res.pagination.total;
					}
				})
			},
			//获取商品分类总信息
			getGoodsClass() {
				getIndustryList_api().then(res => {
					if (res.status == 0) {
						for (let i = 0; i < res.data.length; i++) {
							this.options.push({
								value: res.data[i].storegc_id,
								label: res.data[i].storegc_name
							})
						}
					}
				})

			},
			//根据条件搜索商品
			searchGoods(type) {
				console.log(this.value_top)
				console.log(this.listQuery)
				if(type=='class_find'){
					 if (!this.value_top) {
					 	return false
					 } else {
					 	this.listQuery.storegc_id=this.value_top
					 	this.getGoodsList()
					 }
				}else if(type=='name_find'){
					 if(this.listQuery.search){
						 this.getGoodsList()
					 } 
				}else{
					if(this.listQuery.goods_state){
						this.getGoodsList()
					} 
				}
				
			},
			//新增
			CreateItem() {
				if(this.options.length==0){
					 this.$message.error('请新增商品分类！');
					 return
				}
				this.selectedOptions_alert = this.options;
				this.alertValue='';
				console.log(this.options)
				//return
				this.form = Object.assign({}, form)
				console.log(this.form)
				 this.form.goods_image=[]
				this.form.formObjRepeat=[{
					Repeat_images: [],
					Repeat_title: ''
				}]
				this.dialogFormVisible = true //打开内容弹框
				this.dialogStatus = 'create'
			},
			handleSelect_top(value) {
				console.log(value)
				console.log("筛选")
				this.listQuery.storegc_id = value[value.length - 1];
			},
			//下拉分类查询
			handleSelect_alert(value) {
				console.log("选中")
				console.log(value)

				//this.goodClass=value;
				//this.storegc_id = value[value.length - 1];

			},
			//弹框分类选择
			handele_select(val) {
				console.log("选择后得分类")
				//console.log(val)
				//console.log(this.selectedOptions_alert)
				//console.log(this.form)
				let arr=this.selectedOptions_alert.filter((e,idx)=>{
					return this.selectedOptions_alert[idx].value==val
				 })
				this.form.gc_id= val ;
				this.alertValue=this.form.gc_id
				//console.log(arr)
				this.form.gc_name=arr[0].label
				console.log(this.form)
			},
			//上传轮播
			async handleImgChange_image(file, fileList) {
				this.isUpimg = true
				console.log("change")
				let imgurl = await uploadFn(file.raw);
				this.isUpimg = false
				console.log(this.form)
				this.form.goods_image.push(imgurl[0])

			},
			//商品详情图
			async handleImgChange_detail(file, fileLis) {
				console.log("商品详情")
				console.log(this.form)
				this.isUpimg = true
				let imgurl = await uploadFn(file.raw);
				console.log(imgurl)

				this.isUpimg = false
				this.form.formObjRepeat[this.moddele_idx].Repeat_images.push({
					url: imgurl[0]
				})
				console.log(this.form)

			},
			//删除多图图片
			handleRemove_goods_body(file, fileList) {
				console.log('删除图片')

				this.form.goods_body = fileList
				//return
				console.log(this.form.goods_body)
			},
			//删除商品详情图
			handleRemove_detail(file,fileList) {
				console.log(fileList)
				let that=this
// 				if(this.dialogStatus=='edit'){
// 					return false
// 				}else{
	                // return
					//this.form.formObjRepeat
					setTimeout(function(){
						console.log("删除商品详情图")
						
						console.log(that.moddele_idx)
						that.form.formObjRepeat[that.moddele_idx].Repeat_images.splice(0, 1)
					},50)
				//}
				console.log(that.form)
				
				
			},
			//删除单个图片
			handleRemove_goods_image(file, fileList) {
				console.log('删除图片')
				this.form.goods_image = fileList;
			},
			//预览图片
			handlePictureCardPreview(file) {
				console.log("预览图片")
				console.log(file)
				this.dialogImageUrl = file.goods_image || file.url;
				this.dialogVisible = true;
			},

			//编辑商品
			handleEdit(index, row) {
				//console.log("编辑的商品")
				//console.log(row)
				this.form = Object.assign({}, form)

				getGoods_api(row.goods_commonid).then(res => {
					console.log(res)
					let resObj = res.data;
					this.form = res.data;
					let arr=res.data.goodsimagesList;
					console.log(this.form)
					//return
					this.form.goods_image=[];
					for(let i=0;i<arr.length;i++){
						this.form.goods_image.push(arr[i].goodsimage_url)
					}
					this.form.formObjRepeat = JSON.parse(resObj.goods_body);
					this.form.goods_storage =resObj.SKUList[0].goods_storage;
					console.log("分类")
					console.log(this.options)
					
					this.selectedOptions_alert = this.options;
					let storegc_id = this.options.filter(e => {
						return e.label == resObj.gc_name
					})
					console.log(storegc_id)
					 if(storegc_id.length==0){
					    this.form.storegc_id='';
						this.alertValue=''
					 }else{
						 this.form.storegc_id = storegc_id[0].value;
					this.alertValue=this.form.storegc_id 
					}
					console.log("填充的form")
					console.log(this.form)
					this.dialogFormVisible = true;
					this.dialogStatus = 'edit';
				})

			},
			//上架商品api
			push_pullGoods(obj) {

				setting_api(obj).then(res => {
					console.log(res)
					if (res.status == 0) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.getGoodsList()
					} else {
						this.$message({
							type: 'warning',
							message: '操作失败!'
						});
					}
				})
			},
			//上架商品
			handlePush(index, row) {
				let send = {
					type: 'online',
					goods_commonid: [],
				}
				send.goods_commonid.push(row.goods_commonid)
				//return
				this.push_pullGoods(send)
			},
			//下架商品
			handlePull(index, row) {
				console.log(index, row);
				let send = {
					type: 'offline',
					goods_commonid: [],
				}
				send.goods_commonid.push(row.goods_commonid)
				//return
				this.push_pullGoods(send)
			},
			//删除商品
			handeleDel(index, row) {
				this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					this.deleteGoods(row.goods_commonid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//全选
			handleSelectionChange(list) {
				console.log("勾选")
				console.log(list)
				this.checkedGoodsNum = list
			},
			//批量上架
			pushUpload() {
				if (this.checkedGoodsNum.length == 0) {
					this.$message({
						message: '请选择商品',
						type: 'warning'
					});
				} else {
					let send = {
						type: 'online',
						goods_commonid: []
					}

					console.log(this.checkedGoodsNum)
					let arr = this.checkedGoodsNum.filter(e => {
						return e.goods_state == 0
					})
					for (let i = 0; i < arr.length; i++) {
						send.goods_commonid.push(arr[i].goods_commonid)
					}
					this.push_pullGoods(send)
				}

			},
			//批量下架
			pullDownload() {
				if (this.checkedGoodsNum.length == 0) {
					this.$message({
						message: '请选择商品',
						type: 'warning'
					});
				} else {
					let send = {
						type: 'offline',
						goods_commonid: []
					}
					let arr = this.checkedGoodsNum.filter(e => {
						return e.goods_state == 1
					})
					for (let i = 0; i < arr.length; i++) {
						send.goods_commonid.push(arr[i].goods_commonid)
					}
					this.push_pullGoods(send)
				}

			},
			//改变每页条数
			handleSizeChange(val) {
				this.listQuery.limit = val
				this.getGoodsList();
			},
			//选择哪一页
			handleCurrentChange(val) {
				console.log(val)
				this.listQuery.page = val;
				this.getGoodsList();
			},
			// 以下为api操作=============================================
			//去除url
			delUrlfun(e) {
				console.log("去除")
				console.log(e)
				let arr = []
				for (let i = 0; i < e.length; i++) {
					arr.push(e[i].url)
				}
				return arr
			},
			//新增商品
			addGoods(res) {
				let delUrl_goods_image = this.delUrlfun(res.goods_image)
				res.goods_image = JSON.stringify(delUrl_goods_image)
				delete res.formObjRepeat;
				//console.log(this.options)
				//console.log(res)
				let gc_name_one=''
				for(let i=0;i<this.options.length;i++){
					 if(this.options[i].value==res.gc_id || this.options[i].value==res.storegc_id){
						 gc_name_one=this.options[i].label
				   }
				}
				res.gc_name = gc_name_one;
				console.log("添加的商品")
				console.log(res)
				//return
				addGoods_api(res).then((data) => {
					if (data.status == 0) {
						this.dialogFormVisible = false;
						this.isloading = false;
						this.$notify({
							title: '成功',
							message: '保存成功',
							type: 'success',
							duration: 2000
						})
						this.getGoodsList()
					}
				}).catch(e => {
					console.error("addGoods_api 接口错误")
				})
			},
			//编辑商品
			editGoods(obj) {
				 console.log("编辑的数据")
				 console.log(obj)
				 
				 let delUrl_goods_image = this.delUrlfun(obj.goods_image)
				 obj.goods_image = JSON.stringify(delUrl_goods_image)
				 delete obj.formObjRepeat;
				for (let key in obj) {
								if (key in this.editData) {
									this.editData[key] = obj[key]
									}
								}
								console.log("最后发送的数据")
								console.log(this.editData)
								//return
				editRec_api(this.editData).then((data) => {
					console.log("上传返回的结果")
					console.log(data)
					if (data.status == 0) {
						this.dialogFormVisible = false;
						this.isloading = false;
						this.$notify({
							title: '成功',
							message: '保存成功',
							type: 'success',
							duration: 2000
						})
						this.getGoodsList()
					}
				}).catch(e => {
					console.error("addGoods_api 接口错误")
				})
			},
			//删除某个商品
			deleteGoods(id) {
				let delData = {
					goods_commonid: id
				}
				deleGoods_api(delData).then(res => {
					console.log(res)
					if (res.status == 0) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getGoodsList()
					} else {
						this.$message({
							type: 'warning',
							message: '删除失败!'
						});
					}

				})
			},

		},
	}
</script>
