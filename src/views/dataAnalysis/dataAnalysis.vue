<template>
  <div class="pl20">
    <!--<div class="search-border">-->
      <!--<p><span class="blueBox"></span>统计分析</p>-->
    <!--</div>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="waringTab">
      <el-tab-pane label="基础统计分析" name="first">
        <box-border></box-border>
        <div class="box">
          <div class="item">
            <cross-histogram :chartData="chartData1" :loading="loading"  v-if="flag" ></cross-histogram>
          </div>
          <div class="item">
            <pie-chart :pieChart="chartData2" :loading="loading"  v-if="flag" ></pie-chart>
          </div>
          <div class="item">
            <histogram :chartData="chartData3" :loading="loading"  v-if="flag" ></histogram>
          </div>
          <div class="item">
            <histogram :chartData="chartData4" :loading="loading"  v-if="flag" ></histogram>
          </div>
          <div class="clear"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="进度统计分析" name="second">
        <box-border></box-border>
        <histogram style="padding: 10px;border-bottom: 1px dashed #1b93a0" :chartData="chartData5" :loading="loading"  v-if="flag2" ></histogram>
        <div class="box">
          <div class="item">
            <histogram :chartData="chartData6" :loading="loading"  v-if="flag2" ></histogram>
          </div>
          <div class="item">
            <histograms :chartData="chartData7" :loading="loading"  v-if="flag2" ></histograms>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="考核统计分析" name="three">
        <box-border></box-border>
        <div class="box">
          <p class="pl10"><span class="blueBox"></span>签约项目考核分析</p>
          <div class="search-border">
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="时间选择">
                <el-date-picker
                  v-model="queryParams.year"
                  value-format="yyyy"
                  type="year"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="季度选择">
                <el-select v-model="queryParams.quarter" placeholder='季度选择'>
                  <el-option label="一季度" value="一季度"></el-option>
                  <el-option label="二季度" value="二季度"></el-option>
                  <el-option label="三季度" value="三季度"></el-option>
                  <el-option label="四季度" value="四季度"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            </el-form>
          </div>
          <div class="item border_b">
            <pie-chart :pieChart="chartData8" :loading="loading"  v-if="flag3" ></pie-chart>
          </div>
          <div class="item border_b">
            <pie-chart :pieChart="chartData9" :loading="loading"  v-if="flag3" ></pie-chart>
          </div>
          <div class="item border_r">
            <histogram :chartData="chartData10" :loading="loading"  v-if="flag4" ></histogram>
          </div>
          <div class="item ">
            <pie-chart :pieChart="chartData11" :loading="loading"  v-if="flag4" ></pie-chart>
          </div>
          <div class="clear"></div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {xmLevel,investProgress,IndustryList,buildingProject} from '@/api/dataAnalysis/dataQuery'
  import CrossHistogram from '@/components/crossHistogram'
  import pieChart from '@/components/pieChart'
  import Histogram from '@/components/Histogram'
  import Histograms from '@/components/Histogram2'
  export default{
    components:{
      BoxBorder,
      CrossHistogram,  //横向柱状图
      pieChart,
      Histogram,        //柱状图
      Histograms
    },
    data(){
      return{
        loading:false,
        flag:false,
        flag2:false,
        flag3:false,
        flag4:false,
        activeName:'first',
        chartData1:{
          elId:'bar3',
          height:'290px',
          unit:'个',
          title:'项目级别统计分析（个）',
          dataX:[],
          dataY:[]
        },
        chartData2:{
          elId:'pie2',
          height:'290px',
          x:'right',
          y:'center',
          orient:'vertical',
          title:'项目类别统计分析（个/百分比）',
          legend:['民生社会类', '基础设施类','产业类'],
          data:[]
        },
        chartData3:{
          elId:'bar4',
          title:'项目性质统计分析（个）',
          height:'290px',
          dataX:[],
          dataY:[]
        },
        chartData4:{
          elId:'bar5',
          title:'按投资规模分析（个）',
          height:'290px',
          dataX:[],
          dataY:[]
        },
        chartData5:{
          elId:'bar6',
          title:'按投资进度分析（万元）',
          height:'290px',
          dataX:[],
          dataY:[]
        },
        chartData6:{
          elId:'bar7',
          title:'按开工状态分析（个）',
          height:'290px',
          dataX:[],
          dataY:[]
        },
        chartData7:{
          elId:'bar8',
          title:'按手续办理情况分析（个）',
          height:'290px',
          yData:['立项审批', '环评审批', '用地选址','工程规划','工程许可'],
          data:{
            data1:[],
            data2:[]
          }
        },
        chartData8:{
          elId:'pie3',
          height:'290px',
          x:'top',
          y:'center',
          title:'工业类（万元/百分比）',
          legend:[],
//          legend:['1亿以下','1-10亿','10-50亿','50亿以上'],
          data:[]
        },
        chartData9:{
          elId:'pie4',
          height:'290px',
          orient:'vertical',
          x:'right',
          y:'center',
          title:'非工业类（万元/百分比）',
          legend:[],
          data:[]
        },
        chartData10:{
          elId:'bar9',
          title:'累计完成投资额（万元）',
          height:'290px',
          dataX:[],
          dataY:[]
        },
        chartData11:{
          elId:'pie5',
          height:'290px',
          orient:'vertical',
          x:'right',
          y:'center',
          title:'计划完成投资率（万元/百分比）',
          legend:[],
          data:[]
        },
        queryParams:{
          year:'2020年',
          quarter:'一季度'
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        if(this.activeName == 'first'){
          xmLevel('').then(response =>{
            this.loading = false;
            let levelList = response.data.levelList;
            levelList.forEach((item)=>{
              this.chartData1.dataX.push(item.num);
              this.chartData1.dataY.push(item.attribute);
            })
            let typeList = response.data.typeList;
            typeList.forEach((item)=>{
              this.chartData2.data.push( {value: item.num, name: item.attribute});
            })
            let buildList = response.data.buildList;
            buildList.forEach((item)=>{
              this.chartData3.dataX.push(item.num);
              this.chartData3.dataY.push(item.attribute);
            })
            let investmentList = response.data.investmentList;
            investmentList.forEach((item)=>{
              this.chartData4.dataX.push(item.num);
              this.chartData4.dataY.push(item.attribute);
            })
            this.flag = true;
          })
        }else if(this.activeName == 'second'){
          investProgress('').then(response => {
            this.loading = false;
            let investmentList = response.data.investmentList;
            investmentList.forEach((item)=> {
              this.chartData5.dataX.push(item.num);
              this.chartData5.dataY.push(item.attribute);
            })
            let isStartList = response.data.isStartList;
            isStartList.forEach((item)=> {
              this.chartData6.dataX.push(item.num);
              if(item.attribute == '是'){
                this.chartData6.dataY.push('已开工');
              }else{
                this.chartData6.dataY.push('未开工');
              }
            })
            let projectBuildList = response.data.projectBuildList;
            //          立项审批
            projectBuildList.proceduresMap.forEach((item) =>{
              if(item.procedures == '已审批'){
                this.chartData7.data.data1.push(item.proceduresNum)
              }else{
                this.chartData7.data.data2.push(item.proceduresNum)
              }

            })
//           环球审批
            projectBuildList.eiaMap.forEach((item) =>{
              if(item.eia == '已审批'){
                this.chartData7.data.data1.push(item.eiaNum)
              }else{
                this.chartData7.data.data2.push(item.eiaNum)
              }
            })
//            用地选址
            projectBuildList.projectLandMap.forEach((item) =>{
              if(item.projectLand == '已审批'){
                this.chartData7.data.data1.push(item.projectLandNum)
              }else{
                this.chartData7.data.data2.push(item.projectLandNum)
              }
            })
            // 工程规划
            projectBuildList.constructionPlanMap.forEach((item) =>{
              if(item.constructionPlan == '已审批'){
                this.chartData7.data.data1.push(item.constructionPlanNum)
              }else{
                this.chartData7.data.data2.push(item.constructionPlanNum)
              }
            })
            // 工程许可
            projectBuildList.constructionPermitMap.forEach((item) =>{
              if(item.constructionPermit == '已审批'){
                this.chartData7.data.data1.push(item.constructionPermitNum)
              }else{
                this.chartData7.data.data2.push(item.constructionPermitNum)
              }
            })
            this.flag2 = true;
          })
        }else{
          IndustryList(this.queryParams).then(response => {
            this.loading = false;
            let industryList = response.data.IndustryList;
            industryList.forEach((item)=> {
              this.chartData8.legend.push(item.attribute);
              this.chartData8.data.push({value: item.num, name: item.attribute});
            })
            let noIndustryList = response.data.noIndustryList;
            noIndustryList.forEach((item)=> {
              this.chartData9.legend.push(item.attribute);
              this.chartData9.data.push({value: item.num, name: item.attribute});
            })
            this.flag3 = true;
          })
          buildingProject('').then(response => {
            this.loading = false;
            let industryList = response.data.totalInvestments;
            industryList.forEach((item)=> {
              this.chartData10.dataX.push(item.num);
              this.chartData10.dataY.push(item.attribute);
            })
            let planPercentage = response.data.planPercentage;
            planPercentage.forEach((item)=> {
              this.chartData11.legend.push(item.attribute);
              this.chartData11.data.push({value: item.num, name: item.attribute});
            })
            this.flag4 = true;
          })

        }
      },
      handleSizeChange(val) {
        this.queryParams.pageSize = val;
        this.getTable();
      },
      handleCurrentChange(val) {
        this.queryParams.pageNum = val;
        this.getTable();
      },
      handleClick(tab, event) {
        this.getTable(this.activeName);
        console.log(this.activeName)
      },
      onSubmit() {
        this.getTable();
      }
    }

  }

</script>
<style scoped>
  .box{
    /*padding: 10px;*/
  }
  .box .item{
    width:48.6% ;
    float: left;
    padding: 10px;
  }
  .box .item:first-child{
    border-right: 1px dashed #1b93a0;
    border-bottom: 1px dashed #1b93a0;
  }
  .box .item:nth-child(2){
    border-bottom: 1px dashed #1b93a0;
  }
  .box .item:nth-child(4){
    border-left: 1px dashed #1b93a0;
  }
</style>

