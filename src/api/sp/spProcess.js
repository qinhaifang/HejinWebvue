/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'


//审批流程
export function sp(type){
  return request({
    url:'/pt/approval/list',
    method:'get',
    params:type
  })
}
//type = 1  领导关注
//type = 3
//type = 5  工作亮点
//type = 6  学习交流
//type = 7  政策法规
//
export function spProcess(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/information/list',
    method:'get',
    params:params
  })
}

//办件公示
export function spOffice(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/show/list',
    method:'get',
    params:params
  })
}
//审批进度
export function spProgress(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/progress/list',
    method:'get',
    params:params
  })
}
//工作亮点
export function spWork(id){
  return request({
    url:'/pt/information/'+id,
    method:'get',
  })
}
