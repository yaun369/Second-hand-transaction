import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000 // request timeout
})
// request interceptor
service.interceptors.request.use(config => {
  console.log(process.env.BASE_API)
  console.log('getToken()', getToken())
  config.headers['Content-Type'] = 'application/json'
  if (getToken()) {
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error)
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res && res.status === 1) {
      Message({
        message: res.error,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('request.js拦截响应 res.status == 1')
    } else if (res && res.status === 10) {
      Message({
        message: res.error,
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
