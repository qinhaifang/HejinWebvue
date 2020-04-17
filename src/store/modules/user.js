/**
 * Created by Administrator on 2020/4/9 0009.
 */
import {login,logout} from '@/api/login'

const user ={
  state:{
    token:'',
    name:''
  },
  mutations:{
    SET_TOKEN:(state,token) => {
      state.token = token
    },
    SET_NAME:(state,name) => {
      state.name = name
    }
  },
  actions:{
    Login({commit},userInfo){
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve,reject) =>{
        login(username,password).then(res =>{
          //setToken(res.data.token)
          //commit('SET_NAME','')
          commit('SET_TOKEN', res.data.token)
          Cookies.set("token", res.data.token);
          resolve()
        }).catch(error =>{
          reject(error);
        })
      })
    }
  }
}
export default user
