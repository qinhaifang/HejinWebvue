<template>
  <div class="desc border projectDesc" :style="{'height':windowHeight}" :loading="loading">
    <box-border></box-border>
    <label for="back" class="back" @click="back()">
      <img src="../assets/images/icon/back.png" id="back" width="35px" alt="">
      <span class="title">{{title}}</span>
    </label>
    <div class="main">
      <div class="left">
        <img :src="remark" alt="">
      </div>
      <div class="right">
        <el-tabs v-model="activeName"  type="card" @tab-click="handleClick" class="waringTab">
          <el-tab-pane label="项目信息" name="1">
            <p class="pl10"><span class="blueBox"></span>项目信息</p>
            <ul class="pl20 xmInfo">
              <li v-for="(item,index) in projectInfo" :key="index">
                <span>{{item.title}}</span>
                <span>{{item.value}}</span>
              </li>
              <div class="clear"></div>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="进度分析" name="2">
            <div class="planList">
              <p class="pl10"><span class="blueBox"></span>项目计划</p>
              <el-steps direction="vertical" class="pl20">
                <template v-for="(item,index) in planList">
                  <el-step  :title= 'item.planDeclare' :description="item.planTime" ></el-step>
                </template>
              </el-steps>
            </div>
            <div class="progressList">
              <p class="pl10"><span class="blueBox"></span>项目进度</p>
              <el-steps direction="vertical" class="pl20">
                <template v-for="(item,index) in progressList">
                  <el-step  :title= 'item.scheduleDeclare' :description="item.scheduleTime" ></el-step>
                </template>
              </el-steps>
            </div>
            <div class="clear"></div>
            <p class="pl10"><span class="blueBox"></span>项目开工状态：{{isStart}}</p>
            <p class="pl10"><span class="blueBox"></span>前期手续办理情况：</p>
            <template>
              <el-steps class="pl10">
                <template v-for="(item,index) in spList">
                  <el-step :title='item.title' :description="item.desc" :status="item.state"></el-step>
                </template>
              </el-steps>
            </template>
            <p class="pl10"><span class="blueBox"></span><span></span>形象进展：<span>{{currentProgress}}</span></p>
            <histogram :chartData="chartData1" v-if="flag"></histogram>
            <p class="pl10"><span class="blueBox"></span><span>存在问题：</span><span>{{currentProblem}}</span></p>
            <p class="pl10"><span class="blueBox"></span>涉及单位：{{involveCompany}}</p>
            <p class="pl10"><span class="blueBox"></span>解决方案：<span>{{solution}}</span></p>
            <p class="pl10"><span class="blueBox"></span>督办意见：</p>
            <ul>
              <li>

              </li>
            </ul>
            <el-input type="textarea" v-model="dubanParams.message"></el-input>
            <el-button type="primary" @click="onSubmit" class="dubanBtn">提交</el-button>
          </el-tab-pane>
          <el-tab-pane label="实施现场" name="3" class="site">
            <temlate v-for="(item,index) in siteList" :key="index">
              <p class="pl10" v-html="item.content">{{item.content}}</p>
            </temlate>
          </el-tab-pane>
          <el-tab-pane label="项目通讯录" name="4">
            <div class="p15">
              <el-table
                border
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="matter"
                  label="负责事项"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="contactsName"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="contactsPhone"
                  label="电话">
                </el-table-column>
              </el-table>
            </div>

          </el-tab-pane>
          <el-tab-pane label="动态咨询" name="5">
            <ul class="list">
              <li v-for="(item,index) in dtzxList" :key="index" @click="openDesc(item.id)">
                <div class="left">
                  <!--<img v-if="item.imageUrl !==''" :src='http://119.3.56.106:8001' width="100%" height="100%" alt="">-->
                  <!--<img v-else src="../assets/images/logo.png" width="100%" height="100%" alt="">-->
                  <img src="../assets/images/logo.png" width="100%" height="100%" alt="">
                </div>
                <div class="right" style="border: 0">
                  <h3>{{item.infoTitle}}</h3>
                  <span class="date">{{item.createTime}}</span>
                </div>
                <div class="clear"></div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import Histogram from '@/components/Histogram'
  import {projectDesc,projectPlan,projectProgress,projectSp,currentProgress,dubanList,dubanSubmit,siteList,contactsList,dtzxList} from '@/api/gtzz/gtzz'
  export default{
    components: {BoxBorder,Histogram},
    data(){
      return {
        loading:false,
        windowHeight:window.innerHeight-220,
        activeName:'1',
        title:"",
        projectInfo:[],
        remark:require("../assets/logo.png"),    //详情左边图片
        planList:[],
        progressList:[],
        spList:[],
        isStart:'',   //开工状态
        currentProgress:'',  //形象进展
        flag:false,
        chartData1:{
          elId:'bar1',
          height:'295px',
          title:'项目投资完成情况/(万元)',
          dataY:['项目总投资','本月完成','累计投资'],
          dataX:[]
        }, //形象进展
        currentProblem:'',   //存在问题
        solution:'',     //解决方案
        involveCompany:'',     //涉及单位
        siteList:[],   //实施现场
        tableData: [],
        dtzxList:[],   //动态咨询
        queryParams: {
          id:this.$route.params.id
        },
        descParams: {
          projectId:this.$route.params.id
        },
        progressParams: {
          projdectId:this.$route.params.id
        },
        dubanParams:{
          projdectId:this.$route.params.id,
          message:'',
          supState:1
        }
      }
    },
    created(){
      this.getRouterData()
    },
    methods: {
      getRouterData() {
        this.queryParams.id = this.$route.params.id;
        this.descParams.projectId = this.$route.params.id;
        this.title = this.$route.params.projectName;
        this.spList = [];
        if(this.activeName == '1'){
          this.projectInfo = [];
          projectDesc(this.$route.params.id).then(response =>{
            let data = response.data.data;
            this.projectInfo.push(
              {title:'项目名称:',value:data.projectName},
              {title:'项目类型:',value:data.projectType},
              {title:'项目级别:',value:data.projectLevelRemark},
              {title:'项目主体:',value:data.projectGenre},
              {title:'项目概况:',value:data.projectInfo},
              {title:'建筑性质:',value:data.projectBuild},
              {title:'投资金额:',value:data.totalInvestment +'亿元'},
              {title:'包联领导:',value:data.leader},
              {title:'责任单位:',value:data.dutyCompany},
              {title:'责任人:',value:data.dutyPerson}
            )
            if(data.isStart == '是'){
              this.isStart = '已开工'
            }else{
              this.isStart = '未开工'
            }
            this.currentProgress = data.currentProgress;
            this.currentProblem = data.currentProblem;
            this.solution = data.solution;
            if(data.remark == ''){
              this.remark = require("../assets/logo.png");
            }else{
              this.remark = data.remark;
            }


          })
        }else if(this.activeName == 2){
          projectPlan(this.descParams).then(response =>{
            let data = response.data.rows;
            this.planList = data;
          })
          projectProgress(this.progressParams).then(response =>{
            let data = response.data.rows;
            this.progressList = data;
          })
          projectSp(this.descParams).then(response =>{
            let data = response.data.rows;
            if(data[0].procedures == 1){
              this.spList.push({title:'立项审批',desc:'已办结',state:'success'})
            }else if(data[0].procedures == 2){
              this.spList.push({title:'立项审批',desc:'办理中',state:'error'})
            }else{
              this.spList.push({title:'立项审批',desc:'未办理',state:'wait'})
            }
            if(data[0].eia == 1){
              this.spList.push({title:'环评审批',desc:'已办结',state:'success'})
            }else if(data[0].eia == 2){
              this.spList.push({title:'环评审批',desc:'办理中',state:'error'})
            }else{
              this.spList.push({title:'环评审批',desc:'未办理',state:'wait'})
            }

            if(data[0].projectland == 1){
              this.spList.push({title:'项目用地预审与选址',desc:'已办结',state:'success'})
            }else if(data[0].projectland == 2){
              this.spList.push({title:'项目用地预审与选址',desc:'办理中',state:'error'})
            }else{
              this.spList.push({title:'项目用地预审与选址',desc:'未办理',state:'wait'})
            }
            if(data[0].constructionplan == 1){
              this.spList.push({title:'建设工程规划',desc:'已办结',state:'success'})
            }else if(data[0].constructionplan == 2){
              this.spList.push({title:'建设工程规划',desc:'办理中',state:'error'})
            }else{
              this.spList.push({title:'建设工程规划',desc:'未办理',state:'wait'})
            }
            if(data[0].constructionpermit == 1){
              this.spList.push({title:'建设工程许可',desc:'已办结',state:'success'})
            }else if(data[0].constructionpermit == 2){
              this.spList.push({title:'建设工程许可',desc:'办理中',state:'error'})
            }else{
              this.spList.push({title:'建设工程许可',desc:'未办理',state:'wait'})
            }
          })
          currentProgress(this.$route.params.id).then(response =>{
            let data = response.data.data;
            this.chartData1.dataX.push(data.total_investment,data.month_investment,data.num)
            this.flag = true;
          })
          dubanList(this.queryParams).then(response => {
            console.log('获取督办列表',response.data.data)
          })
        }else if(this.activeName == 3){
          siteList(this.descParams).then(response =>{
            this.siteList = response.data.rows;
          })
        }else if(this.activeName == 4){
          contactsList(this.descParams).then(response =>{
            this.tableData = response.data.rows;
          })
        }else if(this.activeName == 5){
          dtzxList(this.descParams).then(response =>{
            this.dtzxList = response.data.data;
            console.log(this.dtzxList)
          })
        }
      },
      openDesc(id){
        this.$router.push({name:'publicPage',params:{id:id,type:'projectDesc'}})
      },
      back(){
        this.$router.go(-1);
      },
      handleClick(){
        this.getRouterData();
      },
      onSubmit(){
        console.log(this.dubanParams)
        dubanSubmit(this.dubanParams).then(response =>{
          console.log(123,response.data.data)

        })

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
  .main .left{
    width: 30%;
  }
  .main .right{
    width: 69%;
    border-left: 1px dashed #1b93a0;
  }
  .main .right ul.xmInfo li{
    padding: 10px 0;
    height: 30px;
    line-height: 30px;
  }
  .main .right ul.xmInfo li span:first-child{
    width: 80px;
    display: inline-block;
    text-align: justify;
    text-align-last:justify;
    padding-right: 10px;
    float: left;
  }
  .main .right ul.xmInfo li span:last-child{
    float: left;
    width: 90%;
  }
  .main .planList{
    width: 48%;
    float: left;
  }
  .main .progressList{
    width: 48%;
    float: right;
  }
  .site img,.site video{
    width: 100%;
    height: 200px;
  }
  .list li{
    padding: 10px;
    border-bottom: 1px dashed #9caaf2;
    position: relative;
  }
  .list .left{
    width: 20%;
  }
  .list .right{
    width: 78%;
  }
  .list .right .date{
    display: block;
    padding-top: 20px;
    position: absolute;
    bottom: 10%;
  }
  .el-textarea{
    margin-left: 20px;
  }
  .dubanBtn{
    float: right;
    margin-top: 10px;
  }
</style>
