/**
 * Created by Administrator on 2020/4/21 0021.
 */
import request from '@/utils/request'
//挂图作战
export function xmtz(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/manage/list',
    method:'get',
    params:params
  })
}
//挂图作战项目信息
export function projectDesc(id){
  return request({
    url:'/pt/manage/'+id,
    method:'get'
  })
}
//项目计划
export function projectPlan(params){
  return request({
    url:'/pt/plan/list',
    method:'get',
    params:params
  })
}
//项目进度
export function projectProgress(params){
  return request({
    url:'/pt/schedule/list',
    method:'get',
    params:params
  })
}
//审批进度
export function projectSp(params){
  return request({
    url:'/pt/procedures/list',
    method:'get',
    params:params
  })
}
//形象进展
export function currentProgress(id){
  return request({
    url:'/pt/investment/getProjectInvestment/'+id,
    method:'get',
  })
}
//获取督办列表
export function dubanList(params){
  return request({
    url:'/pt/supervision/appList',
    method:'get',
    params:params
  })
}
//提交督办意见
export function dubanSubmit(params){
  return request({
    url:'/pt/supervision',
    method:'get',
    params:params
  })
}
//实施现场
export function siteList(params){
  return request({
    url:'/pt/site/list',
    method:'get',
    params:params
  })
}
//项目通讯录
export function contactsList(params){
  return request({
    url:'/pt/contacts/list',
    method:'get',
    params:params
  })
}
//动态咨询
export function dtzxList(params){
  return request({
    url:'/pt/info/selectInfos',
    method:'get',
    params:params
  })
}
//周周研判
export function weekJudged(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/judged/list',
    method:'get',
    params:params
  })
}
//项目开工预警
export function xmWaring(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/manage/warlist',
    method:'get',
    params:params
  })
}
//项目督办预警
export function xmDubanWarlist(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/supervision/warlist',
    method:'get',
    params:params
  })
}
//项目督办
export function xmDuban(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/supervision/list',
    method:'get',
    params:params
  })
}
//项目通报
export function xmBulletin(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/notify/list',
    method:'get',
    params:params
  })
}
