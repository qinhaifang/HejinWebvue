/**
 * Created by haifang.qin on 2020/4/20 0020.
 */
import request from '@/utils/request'

//总体概况
export function xmgk(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/manage/total',
    method:'get',
    params:params
  })
}
//重点项目部门实时上报数据
export function getTotalInvestment(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/investment/getTotalInvestment',
    method:'get',
    params:params
  })
}
//统计口径数据
export function getKoujin(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/pro/baifenbi',
    method:'get',
    params:params
  })
}
//手续办理统计
export function getSptotal(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/procedures/getTatisticsProcedures',
    method:'get',
    params:params
  })
}
