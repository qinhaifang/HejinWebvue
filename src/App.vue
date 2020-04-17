<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:'slider-right'
    }
  },
  watch:{
    '$router'(to,from){
      let isBack = this.$router.isBack
      if(isBack){
        this.transitionName = 'slide-right'
      }else{
        this.transitionName = 'slider-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style scoped>
  #app{
    height: 100%;
  }
  .slide-left-center,.slider-right-active{
    opacity: 0;
    -webkit-transform: translate(100%,0);
    transform: translate(100%,0);
  }
  .slide-left-leave-active,.slide-right-enter{
    opacity: 0;
    -webkit-transform: translate(-100%,0);
    transform: translate(-100% ,0);
  }
</style>
