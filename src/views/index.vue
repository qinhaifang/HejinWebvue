<template>
    <div id="main">
      <home-header class="header"></home-header>
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import HomeHeader from '@/components/header'
  export default{
    components: {
      HomeHeader
    },
    data(){
      return{

      }
    },
    created(){

    },
    mounted: function() {
      const vm = this
      vm.$nextTick(()=> {})
    },
    watch:{
//      items:{
//        handler(newValue,oldValue){
//          let that = this;
//          that.drawInit(this.option)
//        },
//        deep:true
//      }
    }
  }

</script>
<style scoped>
  #main{
    background: #0d203c;
    color: #fff;
    height: 100%;
  }
  .content{
    padding: 0 40px;
    height: 100%;
  }

</style>
