/**
 * Created by Administrator on 2020/4/18 0018.
 */
import request from '@/utils/request'

//目标任务
export function zsTask(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/task/list',
    method:'get',
    params:params
  })
}
//项目进度
export function zsProgress(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/attract/list',
    method:'get',
    params:params
  })
}
