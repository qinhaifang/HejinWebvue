<template>
    <div class="desc border" :style="{'height':windowHeight}" :loading="loading">
      <box-border></box-border>
      <label for="back" class="back" @click="back()">
        <img src="../assets/images/icon/back.png" id="back" width="35px" alt="">
        <span class="title">{{title}}</span>
      </label>
      <p class="pl20" v-html="content">{{content}}</p>
    </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {getDesc,getInfo} from '@/api/getDesc'
    export default{
      name:'publicPage',
      components:{
        BoxBorder,
      },
      data(){
         return{
           loading:false,
           windowHeight:window.innerHeight-220,
           title:"",
           content:"",
           id:'',  //页面id
           type:'' //页面来自哪
         }
      },
      created(){
        this.getRouterData()
      },
      methods:{
        getRouterData() {
          this.row = this.$route.params.id;
          this.type = this.$route.params.type;
          console.log('页面标识',this.type)
          if(this.type == 'leaderFollow'){
            getDesc(this.row).then(response =>{
              this.title = response.data.data.title;
              this.content = response.data.data.content;
            })
          }else if(this.type == 'projectDesc'){
            getInfo(this.row).then(response =>{
              this.title = response.data.data.infoTitle;
              this.content = response.data.data.infoContent;
            })
          }

        },
        back(){
          this.$router.go(-1);
        }
      }
    }
</script>
<style scoped>
   .desc{
     position: relative;
     overflow: auto;
     padding: 0 20px;
   }
   .back{
     display: flex;
     padding: 10px 0;
     cursor: pointer;
   }
  .back span{
    display: flex;
    line-height: 35px;
    color: #11c9fd;
  }
</style>
