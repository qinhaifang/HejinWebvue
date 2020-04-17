/**
 * Created by Administrator on 2020/4/9 0009.
 */
import request from '@/utils/request'

//登录
export function login(username,password){
  const data ={
    username,
    password
  }
  return request({
    url:'/mobileLogin?username='+username+'&password='+password,
    method:'post'
  })
}
