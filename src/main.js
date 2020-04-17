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
router.beforeEach((to,from,next)=>{
  if(to.matched.some( m => m.meta.auth)) {
    // console.log("先判断是否登录");
    if(to.name=='Login'){
      next();
    }else{
      if(localStorage.getItem('token')){
        //访问服务器缓存数据，判断当前token是否失效
        next('/login');
        //Vue.http.get("http:xxxx/Login/UserIsLogin?token="+localStorage.getItem('token')+"&url="+to.name,{withCredentials: true}).then(response => response.json()).then(num => {
        //  // console.log('是否登录',num);
        //  if(num.code==1001){
        //    next();
        //  }else{
        //    alert('您的token已超时，请重新登录');
        //    next('/Login');
        //  }
        //})
      }else{
        next('/login');
      }

    }
  } else {
    console.log("请先登录");
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
