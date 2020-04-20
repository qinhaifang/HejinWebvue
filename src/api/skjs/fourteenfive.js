/**
 * Created by Administrator on 2020/4/17 0017.
 */
import request from '@/utils/request'

//十四五项目库
export function fourtenfive(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/fourteenfive/list',
    method:'get',
    params:params
  })
}
//储备项目库
export function projectReserve(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/store/list',
    method:'get',
    params:params
  })
}
//建设项目库
export function projectBuild(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/construction/list',
    method:'get',
    params:params
  })
}
//达效库
export function projectDaxiao(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/daxiao/list',
    method:'get',
    params:params
  })
}
