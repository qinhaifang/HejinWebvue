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
//1-5，9,10  （招商作战菜单下的）
//type = 1  高位推动
//type = 2  挂图作战
//type = 3  周周研判
//type = 4  压茬推进
//type = 5  严格考核
//type = 7  五个一机制
// type = 8 推进机制
// type = 9 五大招商模式
// type = 10 招商作战图

export function tjjz(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/mechanismInfo/list',
    method:'get',
    params:params
  })
}
//五个一机制
export function fiveOne(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/mechanism/sjlist',
    method:'get',
    params:params
  })
}
//包联情况
export function packet(params){
  params = JSON.parse(JSON.stringify(params));
  return request({
    url:'/pt/manage/list',
    method:'get',
    params:params
  })
}
