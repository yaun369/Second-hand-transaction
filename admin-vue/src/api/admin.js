//平台登录请求的api
import request from '@/utils/request'

//添加商品
export function addGoods_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon',
		method: 'post',
		data
	})
}
//获取商品列表
export function getGoodsList_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon',
		method: 'get',
		params: data
	})
}
//编辑商品
export function editGoods_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon',
		method: 'put',
		data
	})
}
//获取商品详情
export function getGoods_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon/' + data,
		method: 'get',
	})
}
//上下架商品
export function upDownGoods_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon',
		method: 'put',
		data
	})
}
//删除单个商品
export function deleGoods_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon/' + data.goods_commonid,
		method: 'delete',
		data
	})
}



// 订单操作
export function changeROrder_api(data) {
	return request({
		url: '/api/v2/admin/orderstate?order_id=' + data.order_id,
		method: 'put',
		data
	})
}
//获取订单列表
export function getROrderList_api(data) {
	return request({
		url: '/api/v2/admin/order',
		method: 'get',
		params: data
	})
}
export function getROrder_api(data) {
	//console.log(data)
	return request({
		url: '/api/v2/admin/order/' + data,
		method: 'get',
	})
}
//改变订单状态
export function rOrderState_api(data) {
	return request({
		url: '/api/v2/admin/orderstate/'+data.order_id,
		method: 'put',
		data: data
	})
}
//派单
export function pushWoker_api(data) {
	return request({
		url: '/api/v2/admin/workerorder',
		method: 'post',
		data: data
	})
}




//商品推荐设置
export function setting_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon/setting',
		method: 'put',
		data
	})
}
// 商品修改
export function editRec_api(data) {
	return request({
		url: '/api/v2/admin/goodscommon/' + data.goods_commonid,
		method: 'put',
		data
	})
}
//server => Activity =>dis
export function getActivityList_api(data) {
	return request({
		url: '/api/v2/admin/distribution',
		method: 'get',
		params: data
	})
}
export function addActivity_api(data) {
	return request({
		url: '/api/v2/admin/distribution',
		method: 'post',
		data
	})
}
export function deleteActivity_api(data) {
	return request({
		url: '/api/v2/admin/distribution?distribution_id=' + data.distribution_id,
		method: 'delete',
	})
}
//server => Activity => vote
export function getVoteList_api(data) {
	return request({
		url: '/api/v2/admin/vote',
		method: 'get',
		params: data
	})
}
export function addVote_api(data) {
	return request({
		url: '/api/v2/admin/vote',
		method: 'post',
		data
	})
}
export function deleteVote_api(data) {
	return request({
		url: '/api/v2/admin/vote?vote_id=' + data.vote_id,
		method: 'delete',
	})
}


//获取轮播图列表
export function getBannerList_api(data) {
	return request({
		url: '/api/v2/admin/banner',
		method: 'get',
		params: data
	})
}

export function deleteBanner_api(id) {
	return request({
		url: '/api/v2/admin/banner/' + id,
		method: 'delete',
	})
}
//增加轮播图
export function addBanner_api(data) {
	return request({
		url: '/api/v2/admin/banner',
		method: 'post',
		data
	})
}

export function editBanner_api(data) {
	  console.log(data)
	return request({
		url: '/api/v2/admin/banner/'+data.banner_id,
		method: 'put',
		data
	})
}
//会员管理
export function getMember_api(data) {
	return request({
		url: '/api/v2/admin/member',
		method: 'get',
		params: data
	})
}
//评价管理
export function goodEvaluate_api(data) {
	return request({
		url: '/api/v2/admin/goodsevaluate',
		method: 'get',
		params: data
	})
}
//工人管理
export function getWorker_api(data) {
	return request({
		url: '/api/v2/admin/worker',
		method: 'get',
		params: data
	})
}

export function deleteWorker_api(data) {
	console.log(data)
	return request({
		url: '/api/v2/admin/worker/' + data.workerId,
		method: 'DELETE',
		params: data
	})
}
export function addWorker_api(data) {

	return request({
		url: '/api/v2/admin/worker',
		method: 'post',
		data
	})
}
export function WorkerDetail_api(data) {

	return request({
		url: '/api/v2/admin/workerorder',
		method: 'get',
		params: data
	})
}
export function WorkerOrderDetail_api(data) {

	return request({
		url: '/api/v2/admin/workerorder/'+data,
		method: 'get',
		//params: data
	})
}
//以下为案例推广
export function deleAct_api(data) {
	return request({
		url: '/api/v2/admin/dynamic/' + data.dynamic_id,
		method: 'delete',
	})
}
export function addAct_api(data) {
	return request({
		url: '/api/v2/admin/dynamic',
		method: 'post',
		data
	})
}
export function getActList_api(data) {
	return request({
		url: '/api/v2/admin/dynamic',
		method: 'get',
		params: data
	})
}
// server => shop
export function editShopText_api(data) {
	return request({
		url: '/api/v2/admin/storeinfo',
		method: 'put',
		data
	})
}

export function getIntroForm_api(data) {
	return request({
		url: '/api/v2/admin/storeinfo',
		method: 'get',
		params: data
	})
}
// 权限管理
export function getAuthList_api(data) {
	return request({
		url: '/api/v2/admin/admin',
		method: 'get',
		params: data
	})
}
export function deleteAuth_api(data) {
	return request({
		url: '/api/v2/admin/admin/'+data.admin_id,
		method: 'delete',
		//data: data
	})
}
export function addAuth_api(data) {
	return request({
		url: '/api/v2/admin/admin',
		method: 'post',
		data: data
	})
}
export function editAuth_api(data) {
	console.log("data===>",data)
	return request({
		url: '/api/v2/admin/admin/'+data.admin_id,
		method: 'put',
		data: data
	})
}


// -----------setting => goodsType---------
//获取自定义分类
export function getIndustryList_api(data) {
	return request({
		url: '/api/v2/admin/storegc',
		method: 'get',
		params: data
	})
}
//添加分类（各级）
export function addIndustry_api(data) {
	return request({
		url: '/api/v2/admin/storegc',
		method: 'post',
		data
	})
}
export function deleteIndustry_api(id) {
	return request({
		url: '/api/v2/admin/storegc/' + id,
		method: 'delete',
	})
}

export function editIndustry_api(data) {
	return request({
		url: '/api/v2/admin/storegc',
		method: 'put',
		data
	})
}



//---------------user-------


export function addUser_api(data) {
	return request({
		url: '/api/v2/admin/member',
		method: 'post',
		data
	})
}

//-------------comment => comment-----------
export function getComment_api(data) {
	return request({
		url: '/api/v2/admin/getpcomments',
		method: 'get',
		params: data
	})
}

export function getCommentItem_api(data) {
	return request({
		url: '/api/v2/admin/getpcomments',
		method: 'get',
		params: data
	})
}

export function deleteComment_api(data) {
	return request({
		url: '/api/v2/admin/getpcomments',
		method: 'get',
		params: data
	})
}


