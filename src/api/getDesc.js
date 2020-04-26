/**
 * Created by Administrator on 2020/4/20 0020.
 */
import request from '@/utils/request'

//获取详情
export function getDesc(id){
  return request({
    url:'/pt/information/'+id,
    method:'get',
  })
}


export function getInfo(id){
  return request({
    url:'/pt/info/'+id,
    method:'get',
  })
}
