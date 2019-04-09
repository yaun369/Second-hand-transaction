<style scoped="scoped">
	.graphic{
				border: solid #D5DBE7 1px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				border-radius: 5px;
				margin-bottom: 20px;
				padding: 30px 0;
			}
.detial_content{
	border-bottom: solid 1px #f7f7f7; 
	display: flex;
	padding-top: 20px;
}		
 .detial_content>div:first-child{
	 min-width: 200px;
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
			<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="CreateItem">添加</el-button>
		</div>
		<!--顶部菜单结束 -->
		<!--中间表格开始 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column class="extent" type="expand">
							<template slot-scope="props"  >
								<el-form label-position="left"   inline class="demo-table-expand">
									<div :key="itemInfo.Repeat_title" class="detial_content" v-for="itemInfo in props.row.dynamic_content" >
									<el-form-item label="文章内容:">
										<span>{{  itemInfo.Repeat_title}}</span>
									</el-form-item>
									<el-form-item label="文章图片:">
			
										<img :key="item.url" @click="handlePictureCardPreview(item)" v-for="item in itemInfo.Repeat_images" :src="item.url" style="height: 100px; width:100px;margin-right: 10px;">
			
									</el-form-item>
									</div>
								</el-form>
							</template>
			</el-table-column>
			<el-table-column label="轮播图片">
				<template slot-scope="scope">
					<img :key="item.dynamic_images" @click="handlePictureCardPreview(item)" v-for="item in scope.row.dynamic_images"
					 :src="item.url" style="width:80px;margin-right: 10px;">
				</template>
			</el-table-column>
			<el-table-column label="标题" prop="dynamic_title">
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- 	<el-button size="mini"  type="primary" @click="handleEdit(scope.row)">编辑</el-button> -->
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--中间表格结束 -->
		<!--内容弹框开始 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :rules="rules" ref="form" :model="form" label-width="120px">
				<el-form-item label="轮播图(1-4张)" prop="dynamic_images">
					<el-upload action="" list-type="picture-card" accept="image/*" :limit="4" :auto-upload="false" :file-list="form.dynamic_images"
					 :on-change="handleImgChangeOne" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveOne">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="文章标题" prop="dynamic_title">
				   <el-input  v-model="form.dynamic_title"  placeholder="请输入标题"></el-input>
				</el-form-item>
				<!-- 这里添加动态图文个数开始 -->
				<el-form-item label="文章内容" prop="dynamic_content">
					<el-button size="mini" type="success" @click="addGraphic()">添加内容</el-button>
				</el-form-item>
				<!-- 这里添加动态图文个数结束 -->
				<!-- 图文模块部分开始 -->
				<div v-for="(formItem,index) of formObjRepeat" :key="index" @click="getIndex(index)">
					<el-form :model="formItem"  >
						<el-row :gutter="20" class="graphic">
							<el-col :span="100">
								<div class="grid-content bg-purple">
									<el-form-item label="图文内容" label-width="130px" >
										<el-input v-model="formItem.Repeat_title" type="textarea" autosize placeholder="请输入内容"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="100">
								<div class="grid-content bg-purple">
									<el-form-item label="图文图片(1张)" label-width="130px" >
										<el-upload action="" list-type="picture-card" accept="image/*" :limit="1" :auto-upload="false" :file-list="formItem.Repeat_images"
										 :on-change="handleImgChangeTwo"  :objectBind="index" :on-remove="handleRemoveTwo">
											<i class="el-icon-plus"></i>
										</el-upload>
									</el-form-item>
								</div>
							</el-col>

							<el-col :span="100" style="margin-left: 130px;">
								<div>
									<el-button type="danger" @click="deleteItem(index)">删除</el-button>
								</div>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<!-- 图文模块部分结束 -->
				<el-form-item>
					<el-button type="primary" @click="onSubmit(form)" :disabled="isUpimg" :loading="isloading">保存</el-button>
					<el-button @click="dialogFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 内容弹框结束-->
	</div>

</template>
<script>
	import {
		addAct_api,
		getActList_api,
		deleAct_api
	} from '@/api/seller'
	import uploadFn from '@/utils/aahbs'
	export default {
		created() {
			//获取首页列表
			this.dynamicList()
		},
		data() {
			return {
				//案例列表
				tableData: [{
					dynamic_images: [],
					dynamic_title: '',
					dynamic_content: ''
				}, ],
				//弹框动态详情
				formObjRepeat: [ {
					Repeat_images: [],
					Repeat_title:''
				}],
				//动态模块当前索引
				moddele_idx: '',
				//分页（请求参数）
				listQuery: {
					page: 1,
					limit: 10,
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
				form: {
					dynamic_title: '',
					dynamic_images: [],
					dynamic_content: '',
				},
				//图片预览弹框是否打开
				dialogVisible: false,
				//要预览的图片
				dialogImageUrl: '',
				//表单验证规则
				rules: {
					dynamic_title: [{
							required: true,
							message: '请输入案例名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在1到20个字'
						}
					],
					dynamic_images: [{
						required: true,
						message: '请传1至3张图片',
						trigger: 'change'
					}, ],
				},
				//正在保存
				isloading: false,
				//正在上传图片
				isUpimg: false,
			}
		},
		methods: {
			
			//新增
			CreateItem() {
				this.form = {};
				this.form.dynamic_images = []
				this.dialogFormVisible = true //打开内容弹框
				this.dialogStatus = 'create'
			},
			//添加图片模块
			addGraphic(){
				this.formObjRepeat.push({
					Repeat_images: [],
					Repeat_title:''
				})
			},
			//获取当前模块索引值
			getIndex(index){
              this.moddele_idx = index
			},
			//删除某个图文模块
			deleteItem(idx){
				console.log("删除图文")
				console.log(idx)
			 this.formObjRepeat.splice(idx,1)
			},
			//上传图片
			async handleImgChangeOne(file, fileList,index) {
				console.log("change")
				
				//console.log(this.form)
				this.isUpimg = true
				let imgurl = await uploadFn(file.raw);
				this.isUpimg = false
				this.form.dynamic_images.push({
					url: imgurl[0]
				})
				console.log(this.form)
			},
			async handleImgChangeTwo(file, fileList) {
				console.log("change")
				console.log('change----',arguments)
				//console.log(file, fileList,idx);
				console.log(this.formObjRepeat)
				this.isUpimg = true
				let imgurl = await uploadFn(file.raw);
				this.isUpimg = false
				this.formObjRepeat[this.moddele_idx].Repeat_images.push({
					url: imgurl[0]
				})
				console.log(this.formObjRepeat)
			},
			
			//删除图片
			handleRemoveOne(file, fileList) {
				console.log(file, fileList);
			},
			handleRemoveTwo(file, fileList) {
				console.log(file, fileList);
			},
			//预览图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//保存内容
			onSubmit(form) {
				console.log(this.$refs)
				this.isloading = true;
				// return
				this.$refs['form'].validate((valid) => {
					if (valid) {
						this.isloading = false;
						this.addDynamic()
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			//编辑对应项
			handleEdit(row) {
				console.log("编辑")
				this.form = Object.assign({}, row) // copy obj
				console.log(this.form)
				//return
				this.dialogStatus = 'edit'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['form'].clearValidate()
				})
			},
			//删除
			handleDelete(index, row) {
				console.log(index, row);
				this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteDynamic(row.dynamic_id)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//改变每页条数
			handleSizeChange(val) {
				this.listQuery.limit = val
				this.dynamicList();
			},
			//选择哪一页
			handleCurrentChange(val) {
				console.log(val)
				this.listQuery.page = val;
				this.dynamicList();
			},
			//以下为api操作
			//获取案例列表
			dynamicList() {
				let sendData = Object.assign({}, this.listQuery)
				sendData.type="news"
				getActList_api(sendData).then(res => {
					this.tableData = res.data
					if (res.status == 0) {
						this.total = res.pagination.total;
						res.data.forEach((item, idx) => {
							this.tableData[idx].dynamic_images = JSON.parse(item['dynamic_images'])
							this.tableData[idx].dynamic_content = JSON.parse(item['dynamic_content'])
						})
						console.log(this.tableData)
					}
				})
			},

			//新增案例
			addDynamic() {
				console.log("数据")
				console.log(this.form)
				console.log(this.formObjRepeat)
				//return
				let sendData = {}
				for (let key in this.form) {
					if (key == 'dynamic_images') {
						sendData[key] = JSON.stringify(this.form.dynamic_images)
					} else {
						sendData[key] = this.form[key]
					}
				}
				sendData.dynamic_content=JSON.stringify(this.formObjRepeat);
				sendData.dynamic_type='news';
				addAct_api(sendData).then(res => {
					if (res.status == 0) {
						this.dialogFormVisible = false;
						this.isloading = false;
						this.$notify({
							title: '成功',
							message: '保存成功',
							type: 'success',
							duration: 2000
						})
						this.dynamicList()
					}
				})
			},
			//删除案例
			deleteDynamic(id) {
				let sendData = {}
				sendData.dynamic_id = id
				deleAct_api(sendData).then(res => {
					if (res.status == 0) {
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success',
							duration: 2000
						})
						this.dynamicList()
					}

				})
			},

		},
	}
</script>
