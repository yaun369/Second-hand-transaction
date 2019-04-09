import request from '@/utils/request'
export function loginByUsername(data) {
  console.log('----------login api ---------')
  return request({
    url: '/api/v1/admin/login',
    method: 'post',
    data
  })
}
// export function loginByUsername(data) {
//   console.log('----------login api ---------')
//   return request({
//     url: '/api/v2/seller/login',
//     method: 'post',
//     data
//   })
// }
export function loginByAdminname(data) {
  return request({
    url: '/api/v2/admin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/v1/admin/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
//获取seller管理员权限（该项目中所有权限）
export function getSellerAuth() {
  return request({
    url: '/api/v2/seller/auth',
    method: 'get',
  })
}
//获取admin管理员权限（该项目中所有权限）
export function getAdminAuth() {
  return request({
    url: '/api/v2/admin/auth',
    method: 'get',
  })
}

//获取改密验证码
export function getVerificationCode(data) {
  return request({
    url: '/api/v2/notify/code',
    method: 'post',
    data
  })
}

//重置密码
export function resetPassword(data) {
  return request({
    url: '/api/v2/notify/reset',
    method: 'put',
    data
  })
}