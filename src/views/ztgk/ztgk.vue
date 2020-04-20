<template>
    <div class="ztgk">
      <div class="left border">
        <box-border></box-border>
        <div class="center">
          <h4>项目概况</h4>
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
            <histogram :chartData="chartData1"></histogram>
          </div>
        </div>
      </div>
      <div class="middle border">
        <box-border></box-border>
        middle
      </div>
      <div class="right border">
        <box-border></box-border>
        <div class="center">
          <h4>统计口径数据</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <div class="empty"></div>
          <pie-chart :pieChart="pieChart"></pie-chart>
          <p class="text-left">全年计划投资额 <b class="color-y">{{koujin.zInvestment}}</b>亿元</p>
          <p class="text-left">截至目前累计完成投资额 <b class="color-y">{{koujin.totalInvestment}}</b>亿元</p>
          <p class="text-left">占全年计划投资额的 <b class="color-y">{{koujin.baifenbi}}</b></p>
          <div class="empty" style="padding: 10px 0"></div>
          <h4>手续办理情况统计（个/百分比）</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <histograms :chartData="chartData2"></histograms>
        </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import Histogram from '@/components/Histogram'
  import Histograms from '@/components/Histogram2'
  import PieChart from '@/components/pieChart'
  import {xmgk,getTotalInvestment,getKoujin} from '@/api/ztgk/ztgk'
    export default{
     components: {
      BoxBorder,
      Histogram,
      Histograms,
      PieChart
    },
       props:{},
      data(){
        return{
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
          chartData2: {
            elId:'bar2',
            yData:['立项审批', '环评审批', '用地选址','工程规划','工程许可'],
            data:{
              data1:[10,20,30,10,2],
              data2:[2,3,4,5,6]
            }
          },
          pieChart:[],
          chartData1:{
            elId:'bar1',
            yData:[],
            data:[]
          },
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
          })
          getTotalInvestment('').then(response =>{
            let data = response.data.data.monthlyInvestment;
//            获取地图数据
            let map = response.data.data.projectMap;
            console.log("正常从后台取到的",data)
            for(var i=0;i<data.length;i++){
              this.chartData1.yData.push(data[i].attribute);
              this.chartData1.data.push(data[i].num);
            }
//            data.forEach((item) =>{
//              this.chartData1.yData.push(item.attribute);
//              this.chartData1.data.push(item.num);
//            })
            console.log('解析后的',JSON.parse(JSON.stringify(this.chartData1)))
          })
          getKoujin('').then(response =>{
            let data= response.data.data;
            this.koujin.zInvestment = data.zInvestment;
            this.koujin.totalInvestment = data.totalInvestment;
            this.koujin.baifenbi = data.baifenbi;
            this.pieChart.push({value: data.totalInvestment, name: '累计完成投资'},{value: data.zInvestment, name: '全年计划投资'})
          })
        },

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
    padding: 20px 0;
    margin-bottom: 14px;
    float: left;
    background: url(../../assets/images/icon/cardBg.png) no-repeat;
    background-size: cover;
  }
  .left .card li span{
    display: block;
  }
</style>
