/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'

//type = 1  领导关注
//type = 6  学习交流
//type = 7  政策法规
//审批流程
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
