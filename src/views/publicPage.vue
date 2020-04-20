<template>
    <div class="content border" >
      <box-border></box-border>
        <h3 class="center">123</h3>
        <p class="pl20">111111111111</p>
    </div>
</template>


<script>
  import BoxBorder from '@/components/boxStyle'
    export default{
      components:{
        BoxBorder,
      },
      data(){
         return{
           id:''
         }
      },
      created(){
        this.getRouterData()
      },
      methods:{
        getRouterData() {
          this.row = this.$route.params.id
          console.n('row', this.row)
        }
      }
    }
</script>
<style scoped>
   .content{
     position: relative;
     height: 100%;
   }
</style>
