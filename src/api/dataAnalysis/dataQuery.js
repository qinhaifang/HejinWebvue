/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'
//数据查询
export function dataQuery(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/manage/list',
    method:'get',
    params:params
  })
}
