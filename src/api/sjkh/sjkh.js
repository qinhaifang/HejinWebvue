/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'

//签约项目
export function signing(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/attracts/list',
    method:'get',
    params:params
  })
}
//在建项目
export function reBuilt(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/progres/list',
    method:'get',
    params:params
  })
}
//投产项目
export function touchang(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/jungong/list',
    method:'get',
    params:params
  })
}
//入规项目
export function rule(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/rgauge/list',
    method:'get',
    params:params
  })
}
//营商环境
export function business(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/environment/list',
    method:'get',
    params:params
  })
}

