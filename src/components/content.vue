<template>
  <div>
    <box-border></box-border>
    <content></content>
  </div>
</template>


<script>
  import Content from '@/components/content'
  import BoxBorder from '@/components/boxStyle'
  export default{
    components:{
      Content,
      BoxBorder
    },
    props:{}
  }

</script>


