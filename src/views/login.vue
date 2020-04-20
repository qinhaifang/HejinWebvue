<template>
    <div class="login">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
          <el-input type="text" placeholder="账号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  type="password" placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>

      </el-form>

    </div>
</template>


<!--<script type=“text/ecmascript-6”>-->
<script type="text/ecmascript-6">
  import {login} from '@/api/login'
    export default{
      name:"Login",
      data(){
        return{
          loading:false,
          loginForm:{
            username:'admin',
            password:'admin123',
            rememberMe:false
          },
          loginRules:{
            username:[
              {required:true,trigger:"blur",message:'用户名不能为空'}
            ],
            password:[
              {required:true,trigger:"blur",message:'密码不能为空'}
            ],
          }
        }
      },
      methods: {
        handleLogin(){
          this.$refs.loginForm.validate((valid) => {
            if(valid){
              this.loading = true;
              if(this.loginForm.rememberMe){
                Cookies.set("username", this.loginForm.username, { expires: 30 });
                Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
                Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
              }
              login(this.loginForm.username,this.loginForm.password).then(response =>{
                this.loading = false;
                localStorage.setItem('token',response.data.token);
                this.$router.push({path:'/'})
              })
//              this.$store.dispatch("Login",this.loginForm)
//                .then(() => {
//                  this.loading = false;
//                  console.log(456)
//                  this.$router.push({ name: 'index', params: {}})
//                })
//                .catch(() => {
//                  this.loading = false;
//                })
            }else{
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
          })
        }
      }
    }

</script>
<style scoped>
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url("../assets/images/logo/login_bg.png");
    background-size: cover;
  }
  .login-form{
    background: url("../assets/images/logo/login_box.png");
    background-size: cover;
    padding: 20px;
  }
  .title{
    text-align: center;
    color: #fff;
  }
  .el-input{
    width: 300px;
  }
  .el-checkbox{
    color: #fff;
    float: right;
    padding-bottom: 20px;
  }
  .el-form-item{

  }

  .el-form-item__label{
    color: #fff;
  }
  .el-button--primary{
    background: #409EFF;
    border-color: #409EFF;
  }
  .el-button--primary:focus, .el-button--primary:hover{
    background: #1585f9;
    border-color: #1585f9;
  }
  /*.el-date-editor.el-input, .el-date-editor.el-input__inner{*/
  /*width: inherit;*/
  /*}*/

</style>
