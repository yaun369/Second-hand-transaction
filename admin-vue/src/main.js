import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data

//hbs css
import '@/viewscss/s_reset.styl'

import * as filters from './filters' // global filters

import Bmob from "hydrogen-js-sdk";
// 初始化
Bmob.initialize(
  "1faccd3681e084de99799b6f3817a941",
  "b98597ecd64e7b593b15306c8beb6198"
);
// 挂载到全局使用
Vue.prototype.Bmob = Bmob;

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
