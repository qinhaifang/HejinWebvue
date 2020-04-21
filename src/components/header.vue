<template>
    <div ref="HomeHeader">
      <div class="header center">
        <h3><img :src="logo" width="50px" alt="">河津市重点项目挂图作战调度平台</h3>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0d203c"
        text-color="#fff"
        active-text-color="#ffba15"
        router
        >
        <!--v-cloak 指令来解决屏幕闪动的问题  {{}}转变获取到内容的过程-->
        <template v-for="(item,index) in navList">
          <template v-if="item.children.length !==0">
            <el-submenu :index="String(index)">
              <template slot="title">
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <template v-for="child in item.children">
                  <el-menu-item class="slider-child-item" :index="child.path" :key="String(item.id)+'-'+String(child.id)">{{child.title}}</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>

          <template v-else>
            <el-menu-item  :index="item.path" :key="item.id">
              {{ item.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>


<script>
    export default{
      name:'HomeHeader',
      props:[],
      data(){
        return{
          logo:require("@/assets/images/logo.png"),
          navList:[
            {
              path:'',title:'总体概况',id:1,
              children:[
                {path:'/ztgk',title:'总体概况',id:'1'},
                {path:'/tjjz',title:'推进机制',id:'2'},
                {path:'/fiveOne',title:'五个一机制',id:'3'},
                {path:'/leaderOrgan',title:'领导机构',id:'4'},
                {path:'/packet',title:'包联情况',id:'5'}
              ]
            },
            {path:'/leaderFollow',title:'领导关注',id:'2',children:[]},
            {
              path:'',title:'挂图作战',id:'3',
              children:[
                {path:'/projectLedger',title:'项目台帐',id:'1'},
                {path:'/weekJudged',title:'周周研判',id:'2'},
                {path:'/projectWaring',title:'项目预警',id:'3'},
                {path:'/projectSupervision',title:'项目督办',id:'4'},
                {path:'/projectBulletin',title:'项目通报',id:'5'}
              ]
            },
            {
              path:'',title:'四库建设',id:'4',
              children:[
                {path:'/fourteenFive',title:'十四五项目',id:'1'},
                {path:'/projectReserve',title:'储备项目库',id:'2'},
                {path:'/projectBuild',title:'建设项目库',id:'3'},
                {path:'/projectDaxiao',title:'达效库',id:'4'}
              ]
            },
            {
              path:'',title:'数据分析',id:'5',
              children:[
                {path:'/dataQuery',title:'数据查询',id:'1'},
                {path:'/dataAnalysis',title:'统计分析',id:'2'}
              ]
            },
            {
              path:'',title:'上级考核',id:'6',
              children:[
                {path:'/projectSigning',title:'签约项目',id:'1'},
                {path:'/projectRebuilt',title:'再建项目',id:'2'},
                {path:'/projectCommissioning',title:'投产项目',id:'3'},
                {path:'/projectRule',title:'入规项目',id:'4'},
                {path:'/projectBusiness',title:'营商环境',id:'5'},
              ]
            },
            {
              path:'',title:'项目审批',id:'7',
              children:[
                {path:'/spProcess',title:'审批流程',id:'1'},
                {path:'/spWork',title:'工作亮点',id:'2'},
                {path:'/spPolicy',title:'政策法规',id:'3'},
                {path:'/spOffice',title:'办件公示',id:'4'},
                {path:'/spProgress',title:'审批进度',id:'5'},
              ]
            },
            {
              path:'',title:'招商引资',id:'8',
              children:[
                {path:'/zsTask',title:'目标任务',id:'1'},
                {path:'/zsFight',title:'招商作战',id:'2'},
                {path:'/zsTuijin',title:'推进机制',id:'3'},
                {path:'/zsProgress',title:'项目进展',id:'4'}
              ]
            },{
              path:'/learning',title:'学习交流',id:'9',
              children:[]
            }
          ]
        }
      },
      methods: {
        handleSelect(key, keyPath) {

        }
      },
      computed:{

      }
    }

</script>
<style scoped>
  .header{
    background: url("../assets/images/index_title.png");
    background-repeat: round;
  }
  .el-menu.el-menu--horizontal{
    border-bottom: 0;
  }
  .el-menu-item,.el-submenu__title{
    font-size: 16px!important;
  }
  .el-menu{
    padding: 0 15px;
  }
  .el-menu-demo li{
    width: 11.11%;
    text-align: center;
  }
  .el-menu-item-group ul li{
    text-align: center;
  }
</style>
