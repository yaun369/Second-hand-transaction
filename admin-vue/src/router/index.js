import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
//isAdmin为true时，平台路由
export let asyncRouterMapAdmin = [
  {
    path: '/bannersList', //轮播图
    component: Layout,
    redirect: '/bannersList/bannersList',
    meta: {
      title: 'bannersList',
      roles: 'bannersList',
      icon: 'goods'
    },
    children: [{
      path: 'bannersList',
      component: () =>
        import('@/views/bannersList/bannersList'),
      name: 'bannersList',
      meta: {
        title: 'bannersList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  //   {
  //   path: '/commodityManagement', //商品管理
  //   component: Layout,
  //   redirect: '/commodityManagement/index',
  //   meta: {
  //     roles: 'commodityManagement'
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () =>
  //       import('@/views/commodityManagement/index'),
  //     name: 'commodityManagement',
  //     meta: {
  //       title: 'commodityManagement',
  //       icon: 'goods',
  //       noCache: true
  //     }
  //   }]
  // },
  {
    path: '/commodityManagement', //商品管理
    component: Layout,
    redirect: '/commodityManagement/index',
    meta: {
      roles: 'commodityManagement'
    },
    children: [{
      path: 'index',
      component: () =>
        import('@/views/commodityManagement/index'),
      name: 'commodityManagement',
      meta: {
        title: 'commodityManagement',
        icon: 'goods',
        noCache: true
      }
    }]
  }, 
  // {
  //   path: '/orderManagement', //订单管理
  //   component: Layout,
  //   redirect: '/orderManagement/index',
  //   meta: {
  //     title: 'orderManagement',
  //     icon: 'orderlist',
  //     roles: 'orderManagement'
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () =>
  //       import('@/views/orderManagement/index'),
  //     name: 'orderManagement',
  //     meta: {
  //       title: 'orderManagement',
  //       noCache: true,
  //       icon: 'orderlist'
  //     }
  //   }]
  // },
  {
    path: '/memberList', //人员列表
    component: Layout,
    redirect: '/memberList/index',
    meta: {
      title: 'memberList',
      icon: 'member',
      roles: 'memberList'
    },
    children: [{
      path: 'memberList',
      component: () =>
        import('@/views/memberList/index'),
      name: 'memberList',
      meta: {
        title: 'memberList',
        noCache: true,
        icon: 'worker',
      }
    }]
  },

  // {
  //   path: '/authorityManagement', //权限管理
  //   component: Layout,
  //   redirect: '/authorityManagement/index',
  //   meta: {
  //     roles: 'authorityManagement'
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () =>
  //       import('@/views/authorityManagement/index'),
  //     name: 'authorityManagement',
  //     meta: {
  //       title: 'authorityManagement',
  //       icon: 'auth',
  //       noCache: true,
  //     }
  //   }]
  // },
  {
    path: '/infoManagement', //运营
    component: Layout,
    redirect: '/infoManagement/spec',
    meta: {
      title: 'infoManagement',
      icon: 'infoM',
      roles: 'infoManagement'
    },
    children: [
      {
        path: 'pigAnalysis', //链猪分析
        component: () =>
          import('@/views/infoManagement/pigAnalysis'),
        name: 'pigAnalysis',
        meta: {
          title: 'pigAnalysis',
          noCache: true
        }
      },
      {
        path: 'pigSchool', //养猪学院
        component: () =>
          import('@/views/infoManagement/pigSchool'),
        name: 'benner',
        meta: {
          title: 'pigSchool',
          noCache: true
        }
      },

      // {
      //   path: 'brandEnterprise', //品牌企业
      //   component: () =>
      //     import('@/views/infoManagement/brandEnterprise'),
      //   name: 'brandEnterprise',
      //   meta: {
      //     title: 'brandEnterprise',
      //     noCache: true
      //   }
      // },
      // {
      //   path: 'pigNews', //养猪资讯
      //   component: () =>
      //     import('@/views/infoManagement/pigNews'),
      //   name: 'pigNews',
      //   meta: {
      //     title: 'pigNews',
      //     noCache: true
      //   }
      // }
    ]
  },

]
export const constantRouterMap = [{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: () =>
    import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import('@/views/errorPage/401'),
  hidden: true
},
// 首页
{
  path: '',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: () =>
      import('@/views/home/index'),
    name: 'home',
    meta: {
      title: 'home',
      icon: 'dashboard',
      noCache: true
    }
  }]
},
]

export default new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

//isAdmin为false时，商家路由
export let asyncRouterMapSeller = [
  // {
  //     path: '/commodityManagement', //商品管理
  //     component: Layout,
  //     redirect: '/commodityManagement/index',
  //     meta: {
  //       roles: 'commodityManagement'
  //     },
  //     children: [{
  //       path: 'index',
  //       component: () =>
  //         import('@/views/commodityManagement/index'),
  //       name: 'commodityManagement',
  //       meta: {
  //         title: 'commodityManagement',
  //         icon: 'goods',
  //         noCache: true
  //       }
  //     }]
  //   }, {
  //     path: '/orderManagement', //订单管理
  //     component: Layout,
  //     redirect: '/orderManagement/index',
  //     meta: {
  //       title: 'orderManagement',
  //       icon: 'orderlist',
  //       roles: 'orderManagement'
  //     },
  //     children: [{
  //       path: 'index',
  //       component: () =>
  //         import('@/views/orderManagement/index'),
  //       name: 'orderManagement',
  //       meta: {
  //         title: 'orderManagement',
  //         noCache: true,
  //         icon: 'orderlist'
  //       }
  //     }]
  //   },
  {
    path: '/buyPigList', //买猪列表
    component: Layout,
    redirect: '/buyPigList/index',
    meta: {
      title: 'buyPigList',
      roles: 'adminbuyer',
      icon: 'goods'
    },
    children: [{
      path: 'index',
      component: () =>
        import('@/views/buyPigList/index'),
      name: 'buyPigList',
      meta: {
        title: 'buyPigList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/sellPigList', //卖猪列表
    component: Layout,
    redirect: '/sellPigList/sellPigList',
    meta: {
      title: 'sellPigList',
      roles: 'adminseller',
      icon: 'goods'
    },
    children: [{
      path: 'sellPigList',
      component: () =>
        import('@/views/sellPigList/sellPigList'),
      name: 'sellPigList',
      meta: {
        title: 'sellPigList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/vehicleList', //猪车列表
    component: Layout,
    redirect: '/vehicleList/vehicleList',
    meta: {
      title: 'vehicleList',
      roles: 'pigcar',
      icon: 'goods'
    },
    children: [{
      path: 'vehicleList',
      component: () =>
        import('@/views/vehicleList/vehicleList'),
      name: 'vehicleList',
      meta: {
        title: 'vehicleList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  // {
  //   path: '/pigPrice', //猪价
  //   component: Layout,
  //   redirect: '/pigPrice/pigPrice',
  //   meta: {
  //     title: 'pigPrice',
  //     roles: 'pigPrice',
  //     icon: 'goods'
  //   },
  //   children: [{
  //     path: 'pigPrice',
  //     component: () =>
  //       import('@/views/pigPrice/pigPrice'),
  //     name: 'pigPrice',
  //     meta: {
  //       title: 'pigPrice',
  //       icon: 'goods',
  //       noCache: true
  //     }
  //   }]
  // },
  {
    path: '/takeJobList', //招聘列表
    component: Layout,
    redirect: '/takeJobList/takeJobList',
    meta: {
      title: 'takeJobList',
      roles: 'adminrecruit',
      icon: 'goods'
    },
    children: [{
      path: 'takeJobList',
      component: () =>
        import('@/views/takeJobList/takeJobList'),
      name: 'takeJobList',
      meta: {
        title: 'takeJobList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/jobSeekerList', //求职列表
    component: Layout,
    redirect: '/jobSeekerList/jobSeekerList',
    meta: {
      title: 'jobSeekerList',
      roles: 'adminjob',
      icon: 'goods'
    },
    children: [{
      path: 'jobSeekerList',
      component: () =>
        import('@/views/jobSeekerList/jobSeekerList'),
      name: 'jobSeekerList',
      meta: {
        title: 'jobSeekerList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/rentingAndSellingList', //猪场租售列表
    component: Layout,
    redirect: '/rentingAndSellingList/rentingAndSellingList',
    meta: {
      title: 'rentingAndSellingList',
      roles: 'piggery',
      icon: 'goods'
    },
    children: [{
      path: 'rentingAndSellingList',
      component: () =>
        import('@/views/rentingAndSellingList/rentingAndSellingList'),
      name: 'rentingAndSellingList',
      meta: {
        title: 'rentingAndSellingList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/realNameList', //实名认证列表
    component: Layout,
    redirect: '/realNameList/realNameList',
    meta: {
      title: 'realNameList',
      roles: 'admincert',
      icon: 'goods'
    },
    children: [{
      path: 'realNameList',
      component: () =>
        import('@/views/realNameList/realNameList'),
      name: 'realNameList',
      meta: {
        title: 'realNameList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/complaintList', //投诉列表
    component: Layout,
    redirect: '/complaintList/complaintList',
    meta: {
      title: 'complaintList',
      roles: 'complain',
      icon: 'goods'
    },
    children: [{
      path: 'complaintList',
      component: () =>
        import('@/views/complaintList/complaintList'),
      name: 'complaintList',
      meta: {
        title: 'complaintList',
        icon: 'goods',
        noCache: true
      }
    }]
  },
  {
    path: '/memberList', //人员列表
    component: Layout,
    redirect: '/memberList/index',
    meta: {
      title: 'memberList',
      icon: 'member',
      roles: 'adminuser'
    },
    children: [{
      path: 'memberList',
      component: () =>
        import('@/views/memberList/index'),
      name: 'memberList',
      meta: {
        title: 'memberList',
        noCache: true,
        icon: 'worker',
      }
    }]
  },
  // {
  //   path: '/bannersList', //轮播图
  //   component: Layout,
  //   redirect: '/bannersList/bannersList',
  //   meta: {
  //     title: 'bannersList',
  //     roles: 'bannersList',
  //     icon: 'goods'
  //   },
  //   children: [{
  //     path: 'bannersList',
  //     component: () =>
  //       import('@/views/bannersList/bannersList'),
  //     name: 'bannersList',
  //     meta: {
  //       title: 'bannersList',
  //       icon: 'goods',
  //       noCache: true
  //     }
  //   }]
  // },
  // {
  //   path: '/todayPigPrice', //今日猪价
  //   component: Layout,
  //   redirect: '/todayPigPrice/todayPigPrice',
  //   meta: {
  //     title: 'todayPigPrice',
  //     roles: 'todayPigPrice',
  //     icon: 'goods'
  //   },
  //   children: [{
  //     path: 'todayPigPrice',
  //     component: () =>
  //       import('@/views/todayPigPrice/todayPigPrice'),
  //     name: 'todayPigPrice',
  //     meta: {
  //       title: 'todayPigPrice',
  //       icon: 'goods',
  //       noCache: true
  //     }
  //   }]
  // },
  {
    path: '/authorityManagement', //权限管理
    component: Layout,
    redirect: '/authorityManagement/index',
    meta: {
      roles: 'adminauth'
    },
    children: [{
      path: 'index',
      component: () =>
        import('@/views/authorityManagement/index'),
      name: 'authorityManagement',
      meta: {
        title: 'authorityManagement',
        icon: 'auth',
        noCache: true,
      }
    }]
  },
  {
    path: '/infoManagement', //运营
    component: Layout,
    redirect: '/infoManagement/spec',
    meta: {
      title: 'infoManagement',
      icon: 'infoM',
      roles: 'runmanage'
    },
    children: [
      {
        path: 'bannersList', //轮播图
        component: () =>
          import('@/views/infoManagement/bannersList'),
        name: 'bannersList',
        meta: {
          title: 'bannersList',
          noCache: true
        }
      },
      {
        path: 'todayPigPrice', //今日猪价
        component: () =>
          import('@/views/infoManagement/todayPigPrice'),
        name: 'todayPigPrice',
        meta: {
          title: 'todayPigPrice',
          noCache: true
        }
      },
      {
        path: 'pigPrice', //猪价
        component: () =>
          import('@/views/infoManagement/pigPrice'),
        name: 'pigPrice',
        meta: {
          title: 'pigPrice',
          noCache: true
        }
      },
      {
        path: 'pigAnalysis', //链猪分析
        component: () =>
          import('@/views/infoManagement/pigAnalysis'),
        name: 'pigAnalysis',
        meta: {
          title: 'pigAnalysis',
          noCache: true
        }
      },
      {
        path: 'pigSchool', //养猪学院
        component: () =>
          import('@/views/infoManagement/pigSchool'),
        name: 'benner',
        meta: {
          title: 'pigSchool',
          noCache: true
        }
      },

      {
        path: 'brandEnterprise', //品牌企业
        component: () =>
          import('@/views/infoManagement/brandEnterprise'),
        name: 'brandEnterprise',
        meta: {
          title: 'brandEnterprise',
          noCache: true
        }
      },
      {
        path: 'pigNews', //养猪资讯
        component: () =>
          import('@/views/infoManagement/pigNews'),
        name: 'pigNews',
        meta: {
          title: 'pigNews',
          noCache: true
        }
      }
    ]
  },

]
