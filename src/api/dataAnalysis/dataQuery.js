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
//基础统计分析
//项目级别统计分析
//项目类别统计分析
//项目性质统计分析
//按投资规模分析
export function xmLevel(){
  return request({
    url:'/pt/analysis/baseAnalysisForPtLevel',
    method:'get',
  })
}
//按投资进度分析
//按开工状态分析
//按手续办理情况分析
export function investProgress(){
  return request({
    url:'/pt/analysis/investProgress',
    method:'get',
  })
}
//签约项目考核分析
//工业类 & 非工业类
export function IndustryList(params){
  return request({
    url:'/pt/analysis/baseAnalysisForAssessment',
    method:'get',
    params:params
  })
}
//再建项目考核分析
//累计完成投资额 & 计划完成投资率
export function buildingProject(){
  return request({
    url:'/pt/analysis/buildingProjectAssessment/1',
    method:'get'
  })
}

