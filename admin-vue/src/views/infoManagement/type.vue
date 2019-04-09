<style scoped="scoped">
  .el-tag + .el-tag {
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
	.tab-container{
		margin: 30px;
	}
</style>
<template>
	<div class="tab-container">

				<el-container>
					<el-header>
						<el-button type="primary" icon="el-icon-edit" @click="CreateItem()">新增分类</el-button>
					</el-header>
					<el-main>
						<!--中间表格开始 -->
						<el-table :data="tableData" style="width: 100%">
							<el-table-column label="分类名称" prop="storegc_name" >
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" @click="handleRemove(scope.row,scope.$index)">删除</el-button>
									<!-- <el-button size="mini" type="success" @click="handleEdit(scope.row,scope.$index)">编辑</el-button> -->
								</template>
							</el-table-column>
						</el-table>
						<!--中间表格结束 -->
					</el-main>
				</el-container>
		<!--内容弹框开始 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="600px">
			<el-form :rules="rules" ref="form" :model="form" label-width="120px">
				<el-form-item label="分类名称" prop='name'>
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit(form)" :loading="isloading">保存</el-button>
					<el-button @click="dialogFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 内容弹框结束-->
	</div>
</template>
<script>

	import {
	addIndustry_api,
	getIndustryList_api,
	deleteIndustry_api
	} from '@/api/seller'
	export default {
		created() {
			//获取自定义商品分类列表
				this.getGoodsClass();
		},
		data() {
			return {
				//默认第一个
				activeName: '49',
				//表格数据
				tableData: [],
				//子分类输入框是否显示
				inputVisibleIdx: -1,
				//标签输入框
				inputValue: '',
				//以下为弹框操作内容 
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
				  name:' ',
				},
				//表单验证规则
				rules: {
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 6,
							message: '长度在1到6个字'
						}
					],
				},
				//正在保存
				isloading: false,
			}
		},
		methods: {
        //获取所有分类
				getGoodsClass(){
          
					getIndustryList_api().then(res=>{
						  if(res.status==0){
								this.tableData=res.data
							}
					})
					},
			//tap栏切换
			handleClick(tab, event) {
				console.log("切换")
				console.log(this.activeName)
				console.log(tab, event);
				this.tableData = []
				this.getGoodsClass()
			},
			//新增分类
			CreateItem() {
				this.form = {};
				this.dialogFormVisible = true //打开内容弹框
				this.dialogStatus = 'create'
			},
			//保存内容
			onSubmit(form) {
				console.log(form)
				let sendData={storegc_name: form.name,
				storegc_parent_id:0 }
				this.$refs['form'].validate((valid) => {
					if (valid) {
						 addIndustry_api(sendData).then(res=>{
							 console.log(res)
							 if(res.status==0){
								 this.dialogFormVisible = false;
								 this.isloading = true;
								 this.isloading = false;
								 this.$notify({
								 	title: '成功',
								 	message: '添加成功',
								 	type: 'success',
								 	duration: 2000
								 })
								 this.getGoodsClass()
							 }
						 })	
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleRemove(raw,index) {
				console.log(raw,index)
				let selfId=raw.storegc_id
				this.$confirm('确认删除该分类？')
					.then(() => {
             this.deleteClass(selfId)
					})
					.catch(() => {
						console.log("取消")
					});
			},
			deleteClass(id){
				 console.log(id)
				deleteIndustry_api(id).then(res=>{
				   if(res.status==0){
						 this.$notify({
						 title: '成功',
						 message: '删除成功',
						 type: 'success',
						 duration: 2000
						 })
						 this.getGoodsClass()
					 }
				})
			},
			handleEdit(row,index) {
				console.log("编辑")
				this.form = Object.assign({}, row) // copy obj
				this.dialogStatus = 'edit'
				this.dialogFormVisible = true
				// 					this.$nextTick(() => {
				// 						this.$refs['form'].clearValidate()
				// 					})
			},
			//标签关闭
			handleClose(idx, item) {
				console.log(item)
				let  selfId=item.storegc_id
				this.$confirm('确认删除该子类？')
					.then(() => {
						this.deleteClass(selfId)
					})
					.catch(() => {});
			},
			//显示出子分类标签输入框
			showInput(raw,idx) {
				console.log(raw)
				this.inputVisibleIdx = idx;
				this.inputValue=''
			},
			addChildren(sendObj){
				 	addIndustry_api(sendObj).then(res=>{
				 		console.log(res)
				 		if(res.status==0){
				 			this.$notify({
				 				title: '成功',
				 				message: '添加成功',
				 				type: 'success',
				 				duration: 2000
				 			})
				 			this.getGoodsClass()
				 		}
				 	})	
				 
			},
			//输入框的值，确定完成
			handleInputConfirm(raw,idx) {
				//console.log(raw)
				let inputValue = this.inputValue;
				this.inputVisibleIdx = -1;
				let pid=raw.name.storegc_id
				console.log(pid,inputValue)
				let sendObj={
					storegc_name: inputValue,
					storegc_parent_id: pid
				}
				if (inputValue) {
				    this.addChildren(sendObj)
				}
				
				this.inputValue = '';
			}
		}
	};
</script>
