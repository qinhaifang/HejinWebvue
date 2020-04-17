<template>
    <div class="border-box">
      <img class="icon img-left-top" width="20px" src="../assets/images/icon/ksh42.png" alt="">
      <img class="icon img-right-top" width="20px" src="../assets/images/icon/ksh43.png" alt="">
      <img class="icon img-left-bottom" width="20px" src="../assets/images/icon/ksh44.png" alt="">
      <img class="icon img-right-bottom" width="20px" src="../assets/images/icon/ksh45.png" alt="">
    </div>
</template>


<script type=“text/ecmascript-6”>
    export default{
       props:[]
    }

</script>
<style scoped>
  .img-right-top{
    position: absolute;
    right: 0;
  }
  .img-left-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .img-right-bottom{
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
