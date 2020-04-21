/**
 * Created by Administrator on 2020/4/21 0021.
 */
import request from '@/utils/request'
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
