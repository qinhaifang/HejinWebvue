<template>
    <div class="ztgk">
      <div class="left border">
        <box-border></box-border>
        <div class="center">
          <h4 class="p10">项目概况</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <ul class="card">
            <li>
              <span>{{xmgk.total}}个</span>
              <span>项目总数</span>
            </li>
            <li>
              <span>{{xmgk.startTotal}}个</span>
              <span>已开工</span>
            </li>
            <li>
              <span>{{xmgk.noStartTotal}}个</span>
              <span>未开工</span>
            </li>
            <li style="color: rgb(210, 71, 71)">
              <span>{{xmgk.warTotal}}个</span>
              <span>项目预警</span>
            </li>
            <li>
              <span>{{xmgk.monthInvestment}}亿元</span>
              <span>本月完成投资</span>
            </li>
            <li>
              <span>{{xmgk.totalMonth}}亿元</span>
              <span>累计完成投资额</span>
            </li>
            <div class="clear"></div>
          </ul>
          <div class="empty"></div>
          <div class="echarts">
            <h4>重点项目部门实时上报数据</h4>
            <img src="../../assets/images/icon/headline.png" alt="">
            <histogram :chartData="chartData1" v-if="flag"></histogram>
          </div>
        </div>
      </div>
      <div class="middle border">
        <box-border></box-border>
        <div class="legend">
          <ul>
            <h4>图例</h4>
            <li class="province" @click="type('province')"><span>省重点项目:</span><img src="../../assets/images/shenIcon.png" width="16" alt=""></li>
            <li class="city" @click="type('city')"><span>市重点项目:</span><img src="../../assets/images/shiIcon.png" width="16" alt=""></li>
            <li class="point" @click="type('point')"><span>"1311"项目:</span><img src="../../assets/images/1311Icon.png" width="16" alt=""></li>
            <li class="other" @click="type('other')"><span>其他项目:</span><img src="../../assets/images/other.png" width="16" alt=""></li>
          </ul>
        </div>
        <map-demos :mapData="projectMap"></map-demos>
      </div>
      <div class="right border">
        <box-border></box-border>
        <div class="center">
          <h4 class="p10">统计口径数据</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <div class="empty"></div>
          <pie-chart :pieChart="pieChart" v-if="pieFlag"></pie-chart>
          <p class="text-left">全年计划投资额 <b class="color-y">{{koujin.zInvestment}}</b>亿元</p>
          <p class="text-left">截至目前累计完成投资额 <b class="color-y">{{koujin.totalInvestment}}</b>亿元</p>
          <p class="text-left">占全年计划投资额的 <b class="color-y">{{koujin.baifenbi}}</b></p>
          <div class="empty" style="padding: 10px 0"></div>
          <h4>手续办理情况统计（个/百分比）</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <histograms :chartData="chartData2" v-if="flags"></histograms>
        </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import Histogram from '@/components/Histogram'
  import Histograms from '@/components/Histogram2'
  import PieChart from '@/components/pieChart'
  import MapDemos from '@/components/mapDemos'
  import {xmgk,getTotalInvestment,getKoujin,getSptotal} from '@/api/ztgk/ztgk'
    export default{
     components: {
      BoxBorder,
      Histogram,
      Histograms,
      PieChart,
       MapDemos
    },
       props:{},
      data(){
        return{
          flag:false,
          flags:false,
          pieFlag:false,
          projectMap:null,
          xmgk:{
            total:0,   //项目总数
            startTotal:0,  //已开工
            noStartTotal:0,  //未开工
            warTotal:0,      //项目预警
            monthInvestment:0,  //本月完成投资
            totalMonth:0,    //累计完成投资
          },
          koujin:{
            zInvestment:0,
            totalInvestment:0,
            baifenbi:0
          },
          chartData1:{
            elId:'bar1',
            height:'295px',
            title:'',
            dataY:[],
            dataX:[]
          },
          chartData2: {
            title:'',
            elId:'bar2',
            height:'285px',
            yData:['立项审批', '环评审批', '用地选址','工程规划','工程许可'],
            data:{
              data1:[],
              data2:[]
            }
          },
          pieChart:{
            elId:'pie1',
            height:'200px',
            y:'top',
            x:'center',
            orient:'horizontal',
            legend:['累计完成投资', '全年计划投资'],
            data:[],
          }
//            {value: 1, name: '累计完成投资'},
//            {value: 100, name: '全年计划投资'}   假数据
        }
      },
      created() {
        this.getXmgk()
      },
      methods:{
        getXmgk(){
          xmgk('').then(response => {
            let xmgk = response.data;
            this.xmgk.total = xmgk.Total;
            this.xmgk.startTotal = xmgk.StartTotal;
            this.xmgk.noStartTotal = xmgk.NoStartTotal;
            this.xmgk.warTotal = xmgk.warTotal;
            this.xmgk.monthInvestment = xmgk.monthInvestment.num;
            this.xmgk.totalMonth = xmgk.totalMonth;
            //            获取地图数据
            this.projectMap = xmgk.projectMap;
          })
          getTotalInvestment('').then(response =>{
            let data = response.data.data.monthlyInvestment;
            data.forEach((item) =>{
              this.chartData1.dataY.push(item.attribute)
              this.chartData1.dataX.push(item.num);
              this.flag = true;
            })
          })
          getKoujin('').then(response =>{
            let data= response.data.data;
            this.koujin.zInvestment = data.zInvestment;
            this.koujin.totalInvestment = data.totalInvestment;
            this.koujin.baifenbi = data.baifenbi;
            this.pieChart.data.push({value: data.totalInvestment, name: '累计完成投资'},{value: data.zInvestment, name: '全年计划投资'})
            this.pieFlag = true;
          })
          getSptotal('').then(response =>{
            let datas= response.data.data;
//          立项审批
            datas.proceduresMap.forEach((item) =>{
               if(item.procedures == '已审批'){
                 this.chartData2.data.data1.push(item.proceduresNum)
               }else{
                 this.chartData2.data.data2.push(item.proceduresNum)
               }

            })
//           环球审批
            datas.eiaMap.forEach((item) =>{
              if(item.eia == '已审批'){
                this.chartData2.data.data1.push(item.eiaNum)
              }else{
                this.chartData2.data.data2.push(item.eiaNum)
              }
            })
//            用地选址
            datas.projectLandMap.forEach((item) =>{
              if(item.projectLand == '已审批'){
                this.chartData2.data.data1.push(item.projectLandNum)
              }else{
                this.chartData2.data.data2.push(item.projectLandNum)
              }
            })
            // 工程规划
            datas.constructionPlanMap.forEach((item) =>{
              if(item.constructionPlan == '已审批'){
                this.chartData2.data.data1.push(item.constructionPlanNum)
              }else{
                this.chartData2.data.data2.push(item.constructionPlanNum)
              }
            })
            // 工程许可
            datas.constructionPermitMap.forEach((item) =>{
              if(item.constructionPermit == '已审批'){
                this.chartData2.data.data1.push(item.constructionPermitNum)
              }else{
                this.chartData2.data.data2.push(item.constructionPermitNum)
              }
            })
            this.flags = true;
          })
        },
        type(type){
          console.log(111,type);
          if(type == 'province'){

          }
        }

      }
    }

</script>
<style scoped>
  .ztgk{
    display: flex;
  }
  .left,.right{
    width: 25%;
    position: relative;
  }
  .middle{
    width: 50%;
    position: relative;
    margin: 0 5px;
  }
  .left .card{
    padding: 10px 0;
  }
  .left .card li{
    width: 48%;
    padding: 15px 0;
    margin-bottom: 14px;
    float: left;
    background: url(../../assets/images/icon/cardBg.png) no-repeat;
    background-size: cover;

  }
  .left .card li span{
    display: block;
  }
  .legend{
    position: absolute;
    top:10px;
    left: 10px;
    z-index: 100;
    background: #000;
    padding: 10px 20px;
    border-radius: 4px;
  }
  .legend ul li{
    cursor: pointer;
  }
  .legend img{
    padding-left: 5px;
  }
  .legend span{
    display: inline-block;
    width: 95px;
    text-align: justify;
    text-align-last: justify;
  }
  .province{
    color: #cc8c30;
  }
  .city{
    color: #1bb4bc;
  }
  .point{
    color: #b152e8;
  }
  .other{
    color: #f0385f;
  }
</style>
