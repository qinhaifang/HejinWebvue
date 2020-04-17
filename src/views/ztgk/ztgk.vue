<template>
    <div class="ztgk">
      <div class="left border">
        <box-border></box-border>
        <div class="center">
          <h4>项目概况</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <ul class="card">
            <li>
              <span>60个</span>
              <span>项目总数</span>
            </li>
            <li>
              <span>18个</span>
              <span>已开工</span>
            </li>
            <li>
              <span>42个</span>
              <span>未开工</span>
            </li>
            <li>
              <span>3个</span>
              <span>项目预警</span>
            </li>
            <li>
              <span>0亿元</span>
              <span>本月完成投资</span>
            </li>
            <li>
              <span>8.43亿元</span>
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
          <pie-chart></pie-chart>
          <p class="text-left">全年计划投资额 <b class="color-y">00</b>亿元</p>
          <p class="text-left">截至目前累计完成投资额 <b class="color-y">11</b>亿元</p>
          <p class="text-left">占全年计划投资额的 <b class="color-y">11.97%</b></p>
          <div class="empty" style="padding: 10px 0"></div>
          <h4>手续办理情况统计（个/百分比）</h4>
          <img src="../../assets/images/icon/headline.png" alt="">
          <histograms :chartData="chartData2"></histograms>
        </div>
      </div>
    </div>
</template>


<script>
  import BoxBorder from '@/components/boxStyle'
  import Histogram from '@/components/Histogram'
  import Histograms from '@/components/Histogram2'
  import PieChart from '@/components/pieChart'
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
          chartData1: {
            elId:'bar1',
            yData:['衬衫', '羊毛衫', '雪纺衫'],
            data:[80,60,20]
//          data:{
//            data1:[80,60,20]
//          }
          },
          chartData2: {
            elId:'bar2',
            yData:['立项审批', '环评审批', '用地选址','工程规划','工程许可'],
            data:{
              data1:[10,20,30,10,2],
              data2:[2,3,4,5,6]
            }
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
