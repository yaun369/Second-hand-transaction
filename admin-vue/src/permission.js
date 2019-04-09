import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken,getRoles, getState,setState} from '@/utils/auth' // getToken from cookie
import { get } from 'http';

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist
// const hasGetRoleList = ['admin','seller']
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  //当前身份验证是通过 临时变量存储 
  //如果需要做持久化缓存 可以只通过cookie判断，
  // 但是，登出只能在全局拦截器进行，这需要后端的参数配合
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() 
    } else {
      if(!store.getters.hasAddRoute){ //getState 代表用户是否获取了路由
        //登录之后生成动态路由
        let roles = []
        try{
          roles = JSON.parse(getRoles())
        }catch(e){
          console.log(e)
          roles = []
        }
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          setState('ok')
          store.dispatch('addRoute').then(() => {
            next({ ...to, replace: true })
          })
        })
      }
      else {
          next()
      }
    }
  }else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
