import request from '@/utils/request'

//获取买猪列表----------------------------
export function getBuyPigList_api(data) {
    return request({
        url: '/api/v1/adminbuyer',
        method: 'get',
        params: data
    })
}

//获取买猪详情
export function getBuyPigInfo_api(data) {
    return request({
        url: '/api/v1/adminbuyer/info',
        method: 'get',
        params: data
    })
}

//删除买猪列表
export function deleteBuyPigList_api(data) {
    return request({
        url: '/api/v1/adminbuyer',
        method: 'delete',
        data
    })
}

//获取卖猪列表-----------------------------
export function getSellPigList_api(data) {
    return request({
        url: '/api/v1/adminseller',
        method: 'get',
        params: data
    })
}

//获取卖猪详情
export function getSellPigInfo_api(data) {
    return request({
        url: '/api/v1/adminseller/info',
        method: 'get',
        params: data
    })
}

//删除卖猪列表
export function deleteSellPigList_api(data) {
    return request({
        url: '/api/v1/adminseller',
        method: 'delete',
        data
    })
}

//获取猪车列表------------------------------
export function getVehicleList_api(data) {
    return request({
        url: '/api/v1/pigcar',
        method: 'get',
        params: data
    })
}

//获取猪车详情
export function getVehicleInfo_api(data) {
    return request({
        url: '/api/v1/pigcar/info',
        method: 'get',
        params: data
    })
}

//删除猪车列表
export function deleteVehicleList_api(data) {
    return request({
        url: '/api/v1/pigcar',
        method: 'delete',
        data
    })
}

//获取猪价列表------------------------------
export function getPigPriceList_api(data) {
    return request({
        url: '/api/v1/pigprice',
        method: 'get',
        params: data
    })
}

//增加猪价
export function addPigPriceList_api(data) {
    return request({
        url: '/api/v1/pigprice',
        method: 'post',
        data
    })
}

//修改猪价
export function editPigPriceList_api(data) {
    return request({
        url: '/api/v1/pigprice',
        method: 'put',
        data
    })
}

//删除猪价
export function deletePigPriceList_api(data) {
    return request({
        url: '/api/v1/pigprice',
        method: 'delete',
        data
    })
}

//获取招聘列表------------------------------
export function getTakeJobList_api(data) {
    return request({
        url: '/api/v1/adminrecruit',
        method: 'get',
        params: data
    })
}

//获取招聘详情
export function getTakeJobInfo_api(data) {
    return request({
        url: '/api/v1/adminrecruit/info',
        method: 'get',
        params: data
    })
}

//删除招聘列表
export function deleteTakeJobList_api(data) {
    return request({
        url: '/api/v1/adminrecruit',
        method: 'delete',
        data
    })
}

//获取求职列表------------------------------
export function getJobSeekerList_api(data) {
    return request({
        url: '/api/v1/adminjob',
        method: 'get',
        params: data
    })
}

//获取求职详情
export function getJobSeekerInfo_api(data) {
    return request({
        url: '/api/v1/adminjob/info',
        method: 'get',
        params: data
    })
}

//删除求职列表
export function deleteJobSeekerList_api(data) {
    return request({
        url: '/api/v1/adminjob',
        method: 'delete',
        data
    })
}

//获取租售列表------------------------------
export function getrentingAndSellingList_api(data) {
    return request({
        url: '/api/v1/piggery',
        method: 'get',
        params: data
    })
}

//获取租售详情
export function getrentingAndSellingInfo_api(data) {
    return request({
        url: '/api/v1/piggery/info',
        method: 'get',
        params: data
    })
}

//删除租售列表
export function deleterentingAndSellingList_api(data) {
    return request({
        url: '/api/v1/piggery',
        method: 'delete',
        data
    })
}

//获取实名认证列表------------------------------
export function getRealNameList(data) {
    return request({
        url: '/api/v1/admincert',
        method: 'get',
        params: data
    })
}

//获取实名认证详情
export function getRealNameInfo(data) {
    return request({
        url: '/api/v1/admincert/info',
        method: 'get',
        params: data
    })
}

//删除实名认证列表
export function deleteRealNameList(data) {
    return request({
        url: '/api/v1/admincert',
        method: 'delete',
        data
    })
}

//获取投诉列表------------------------------
export function getComplainList(data) {
    return request({
        url: '/api/v1/complain',
        method: 'get',
        params: data
    })
}

//获取投诉详情
export function getComplainInfo(data) {
    return request({
        url: '/api/v1/complain/info',
        method: 'get',
        params: data
    })
}

//删除投诉列表
export function deleteComplainList(data) {
    return request({
        url: '/api/v1/complain',
        method: 'delete',
        data
    })
}

//获取人员列表------------------------------
export function getMemberList_api(data) {
    return request({
        url: '/api/v1/admin/member',
        method: 'get',
        params: data
    })
}
//设置会员
export function settingMemberInfo(data) {
    return request({
        url: '/api/v1/admin/member',
        method: 'put',
        data
    })
}

//获取今日猪价列表------------------------------
export function getTodayPigPriceList_api(data) {
    return request({
        url: '/api/v1/dayprice',
        method: 'get',
        params: data
    })
}

//增加今日猪价
export function addTodayPigPriceList_api(data) {
    return request({
        url: '/api/v1/dayprice',
        method: 'post',
        data
    })
}

//修改今日猪价
export function editTodayPigPriceList_api(data) {
    return request({
        url: '/api/v1/dayprice',
        method: 'put',
        data
    })
}

//删除今日猪价
export function deleteTodayPigPriceList_api(data) {
    return request({
        url: '/api/v1/dayprice',
        method: 'delete',
        data
    })
}

//获取轮播图列表------------------------------
export function getBanners(data) {
    return request({
        url: '/api/v1/admin/banner',
        method: 'get',
        params: data
    })
}

//增加轮播图
export function addBanners(data) {
    return request({
        url: '/api/v1/admin/banner',
        method: 'post',
        data
    })
}

//修改轮播图
export function editBanners(data) {
    return request({
        url: '/api/v1/lunboimg',
        method: 'put',
        data
    })
}

//删除轮播图
export function deleteBanners(data) {
    return request({
        url: '/api/v1/admin/banner',
        method: 'delete',
        data
    })
}

export function upFile(data) {
    return request({
        url: '/api/v1/adminupload',
        method: 'post',
        data
    })
}

//获取链猪列表------------------------------
export function getLinkpig(data) {
    return request({
        url: '/api/v1/admin/technology',
        method: 'get',
        params: data
    })
}

//增加链猪
export function addLinkpig(data) {
    return request({
        url: '/api/v1/admin/technology',
        method: 'post',
        data
    })
}

//修改链猪
export function editLinkpig(data) {
    return request({
        url: '/api/v1/admin/technology',
        method: 'put',
        data
    })
}

//删除链猪
export function deleteLinkpig(data) {
    return request({
        url: '/api/v1/admin/technology',
        method: 'delete',
        data
    })
}
//获取养猪学院列表------------------------------
export function getPigSchool(data) {
    return request({
        url: '/api/v1/admin/terrace',
        method: 'get',
        params: data
    })
}

//增加养猪学院
export function addPigSchool(data) {
    return request({
        url: '/api/v1/admin/terrace',
        method: 'post',
        data
    })
}

//修改养猪学院
export function editPigSchool(data) {
    return request({
        url: '/api/v1/admin/terrace',
        method: 'put',
        data
    })
}

//删除养猪学院
export function deletePigSchool(data) {
    return request({
        url: '/api/v1/admin/terrace',
        method: 'delete',
        data
    })
}
//获取养猪资讯列表------------------------------
export function getPigNews(data) {
    return request({
        url: '/api/v1/article',
        method: 'get',
        params: data
    })
}

//增加养猪资讯
export function addPigNews(data) {
    return request({
        url: '/api/v1/article',
        method: 'post',
        data
    })
}

//修改养猪资讯
export function editPigNews(data) {
    return request({
        url: '/api/v1/article',
        method: 'put',
        data
    })
}

//删除养猪资讯
export function deletePigNews(data) {
    return request({
        url: '/api/v1/article',
        method: 'delete',
        data
    })
}
//获取品牌企业列表------------------------------
export function getBrandEnt(data) {
    return request({
        url: '/api/v1/brandcompany',
        method: 'get',
        params: data
    })
}

//增加品牌企业
export function addBrandEnt(data) {
    return request({
        url: '/api/v1/brandcompany',
        method: 'post',
        data
    })
}

//修改品牌企业
export function editBrandEnt(data) {
    return request({
        url: '/api/v1/brandcompany',
        method: 'put',
        data
    })
}

//删除品牌企业
export function deleteBrandEnt(data) {
    return request({
        url: '/api/v1/brandcompany',
        method: 'delete',
        data
    })
}
//获取管理员列表------------------------------
export function getAuthList_api(data) {
    return request({
        url: '/api/v1/adminauth/admin',
        method: 'get',
        params: data
    })
}

//增加管理员
export function addAuth_api(data) {
    return request({
        url: '/api/v1/adminauth',
        method: 'post',
        data
    })
}

//修改管理员
export function editAuth_api(data) {
    return request({
        url: '/api/v1/adminauth',
        method: 'put',
        data
    })
}

//删除管理员
export function deleteAuth_api(data) {
    return request({
        url: '/api/v1/adminauth',
        method: 'delete',
        data
    })
}

//设置置顶
export function setTopping(data) {
    return request({
        url: '/api/v1/adminupload/set_top',
        method: 'post',
        data
    })
}