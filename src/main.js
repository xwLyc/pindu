// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './utils'

// Vue.prototype.httpGet = utils.httpGet
// Vue.prototype.httpPost = utils.httpPost
// Vue.prototype.API = utils.API
Vue.prototype.$wechat = utils.wx  //设置全局wx接口调用
Vue.prototype.URL_WEBSITE = process.env.URL_WEBSITE

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
