/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'

//领导关注
//type =1 领导关注
export function leaderFollow(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/information/list',
    method:'get',
    params:params
  })
}
