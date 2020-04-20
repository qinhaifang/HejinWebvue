// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//import axios from 'axios'
//Vue.prototype.$axios = axios;

import elementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/base.css'
import '@/assets/css/common.css'

Vue.use(elementUI);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  //debugger
  if (to.path === '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if (!token) {
      next();
    } else {
      next();
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
