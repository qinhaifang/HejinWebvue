<template>
  <div class="border desc" :style="{'height':windowHeight}" :loading="loading">
    <box-border></box-border>
    <div class="p10">
      <h3 class="center" v-html="title">{{title}}</h3>
      <p class="p20" v-html="content">{{content}}</p>
    </div>

  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {tjjz} from '@/api/ztgk/ztgk'
  export default{
    components:{
      BoxBorder
    },
    data(){
      return{
        loading:false,
        windowHeight:window.innerHeight-220,
        title:"",
        content:"",
        queryParams: {
          type:7,
        }
      }
    },
    created(){
      console.log(1);
      this.getTjjz()
    },
    methods:{
      getTjjz(){
        tjjz(this.queryParams).then(response => {
          console.log(response.data.rows)
//            this.title = response.data.rows[0].title;
          this.content = response.data.rows[0].content;
        })
      }
    }
  }

</script>
<style scoped>
  .desc{
    position: relative;
    overflow: auto;
    padding: 0px 20px;
  }
  .p20{
    padding: 40px;
    text-align:justify;
  }
</style>



