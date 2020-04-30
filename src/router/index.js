import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/Home'
import Login from  '../views/login.vue'
import Index from '../views/index.vue'
Vue.use(Router)
Router.prototype.goBack = function(){
  this.isBack = true;
  window,history.go(-1);
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name:'login',
      component: resolve => require(['../views/login.vue'],resolve),
      hidden:true
    },
    {
      path: '/',
      name:'home',
      component: resolve => require(['../views/index.vue'],resolve),
      children:[
        //{path: '*', redirect: '../views/ztgk/ztgk.vue'},
        {
          path: '/ztgk',
          component: resolve => require(['../views/ztgk/ztgk.vue'],resolve),
          meta: {title: '总体概况'}
        },
        {
          path: '/tjjz',
          component: resolve => require(['../views/ztgk/tjjz.vue'],resolve),
          meta: {title: '推进机制'}
        },
        {
          path: '/fiveOne',
          component: resolve => require(['../views/ztgk/fiveOne.vue'],resolve),
          meta: {title: '五个一机制'}
        },
        {
          path: '/leaderOrgan',
          component: resolve => require(['../views/ztgk/leaderOrgan.vue'],resolve),
          meta: {title: '领导机构'}
        },
        {
          path: '/packet',
          component: resolve => require(['../views/ztgk/packet.vue'],resolve),
          meta: {title: '包联情况'}
        },
        {
          path: '/leaderFollow',
          component: resolve => require(['../views/leaderFollow.vue'],resolve),
          meta: {
            title: '领导关注',
            keepAlive: true //此组件需要被缓存}
          }
        },
        {
          path: '/projectLedger',
          component: resolve => require(['../views/gtzz/projectLedger.vue'],resolve),
          meta: {title: '项目台帐'}
        },
        {
          path: '/weekJudged',
          component: resolve => require(['../views/gtzz/weekJudged.vue'],resolve),
          meta: {title: '周周研判'}
        },
        {
          path: '/projectWaring',
          component: resolve => require(['../views/gtzz/projectWaring.vue'],resolve),
          meta: {title: '项目预警'}
        },
        {
          path: '/projectSupervision',
          component: resolve => require(['../views/gtzz/projectSupervision.vue'],resolve),
          meta: {title: '项目督办'}
        },
        {
          path: '/projectBulletin',
          component: resolve => require(['../views/gtzz/projectBulletin.vue'],resolve),
          meta: {title: '项目通报'}
        },
        {
          path: '/fourteenFive',
          component: resolve => require(['../views/skjs/fourteenFive.vue'],resolve),
          meta: {title: '十四五项目'}
        },
        {
          path: '/projectReserve',
          component: resolve => require(['../views/skjs/projectReserve.vue'],resolve),
          meta: {title: '储备项目库'}
        },
        {
          path: '/projectBuild',
          component: resolve => require(['../views/skjs/projectBuild.vue'],resolve),
          meta: {title: '建设项目库'}
        },
        {
          path: '/projectDaxiao',
          component: resolve => require(['../views/skjs/projectDaxiao.vue'],resolve),
          meta: {title: '达效库'}
        },
        {
          path: '/dataQuery',
          component: resolve => require(['../views/dataAnalysis/dataQuery.vue'],resolve),
          meta: {title: '数据查询'}
        },
        {
          path: '/dataAnalysis',
          component: resolve => require(['../views/dataAnalysis/dataAnalysis.vue'],resolve),
          meta: {title: '数据分析'}
        },
        {
          path: '/projectSigning',
          component: resolve => require(['../views/sjkh/projectSigning.vue'],resolve),
          meta: {title: '签约项目'}
        },
        {
          path: '/projectRebuilt',
          component: resolve => require(['../views/sjkh/projectRebuilt.vue'],resolve),
          meta: {title: '在建项目'}
        },
        {
          path: '/projectCommissioning',
          component: resolve => require(['../views/sjkh/projectCommissioning.vue'],resolve),
          meta: {title: '投产项目'}
        },
        {
          path: '/projectRule',
          component: resolve => require(['../views/sjkh/projectRule.vue'],resolve),
          meta: {title: '入规项目'}
        },
        {
          path: '/projectBusiness',
          component: resolve => require(['../views/sjkh/projectBusiness.vue'],resolve),
          meta: {title: '营商环境'}
        },
        {
          path: '/spProcess',
          component: resolve => require(['../views/sp/spProcess.vue'],resolve),
          meta: {title: '审批流程'}
        },
        {
          path: '/spWork',
          component: resolve => require(['../views/sp/spWork.vue'],resolve),
          meta: {title: '工作亮点'}
        },
        {
          path: '/spPolicy',
          component: resolve => require(['../views/sp/spPolicy.vue'],resolve),
          meta: {title: '政策法规'}
        },
        {
          path: '/spOffice',
          component: resolve => require(['../views/sp/spOffice.vue'],resolve),
          meta: {title: '办件公示'}
        },
        {
          path: '/spProgress',
          component: resolve => require(['../views/sp/spProgress.vue'],resolve),
          meta: {title: '审批进度'}
        },
        {
          path: '/zsTask',
          component: resolve => require(['../views/zs/zsTask.vue'],resolve),
          meta: {title: '目标任务'}
        },
        {
          path: '/zsFight',
          component: resolve => require(['../views/zs/zsFight.vue'],resolve),
          meta: {title: '招商作战'}
        },
        {
          path: '/zsTuijin',
          component: resolve => require(['../views/zs/zsTuijin.vue'],resolve),
          meta: {title: '推进机制'}
        },
        {
          path: '/zsProgress',
          component: resolve => require(['../views/zs/zsProgress.vue'],resolve),
          meta: {title: '项目进展'}
        },
        {
          path: '/learning',
          component: resolve => require(['../views/learning.vue'],resolve),
          meta: {title: '学习交流'}
        },
        {
          path: '/publicPage',
          name:'publicPage',
          component: resolve => require(['../views/publicPage.vue'],resolve),
          meta: {title: '公共详情页面', keepAlive: true}
        },
        ,
        {
          path: '/projectDesc',
          name:'projectDesc',
          component: resolve => require(['../views/projectDesc.vue'],resolve),
          meta: {title: '项目详情页面', keepAlive: true}
        },
        {
          path: '/imgDemo',
          name:'imgDemo',
          component: resolve => require(['../views/imgDemo.vue'],resolve),
          meta: {title: '图片放大', keepAlive: true}
        }
      ],
      hidden:true
    }
  ]
})
