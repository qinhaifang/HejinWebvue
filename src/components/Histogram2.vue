<template>
  <div>
    <div ref="myChart" style="width: 100%;height: 285px"></div>
  </div>
</template>


<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default{
    props:{
      chartData:{
        type:Object,
        default: ()=>{}
      }
    },
    mounted(){
      this.drawLine()
    },
    watch:{
      chartData(val){
        this.drawLine();
      }
    },
    methods:{
      drawLine(){
        const vm = this;
        let myChart = echarts.init(this.$refs.myChart);
        // 绘制图表
        myChart.setOption({
          color: [ '#49cc90','#c23531'],
          title: {
            text: '',
            textStyle: {
              fontSize: 18,
              color: '#fff',
            },
            y: 'top',
          },
          tooltip:{
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['已办结', '办理中'],
//            itemWidth: 24,   // 设置图例图形的宽
//            itemHeight: 10,  // 设置图例图形的高
            //bottom: '0',
            left: 'center',
            textStyle: { //图例文字的样式
              color: '#fff',
              fontSize: 16
            },

          },
          xAxis: {
            type: 'category',
            data: this.chartData.yData,
            axisLabel: {
              show: true,
              interval:0,
//              rotate:36,
              textStyle: {
                color: '#ffffff',  //更改坐标轴文字颜色
                fontSize : 12     //更改坐标轴文字大小
              }
            },
            axisLine: {
              lineStyle: {
                color: '#1dd5fd', // 颜色
                width: 1 // 粗细
              }
            }
          },
          yAxis: {
            type: 'value',
            name:'',
            splitLine:{
              show:true,   //是否显示网格线
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff',  //更改坐标轴文字颜色
                fontSize : 14      //更改坐标轴文字大小
              }
            },
            axisLine: {
              symbol:['none','arrow'],
              symbolOffset: [0, 10],
              lineStyle: {
                type:'arrow',
                color: '#1dd5fd', // 颜色
                width: 1 // 粗细
              }
            }
          },
          series: [{
            data: this.chartData.data.data1,
            name:'已办结',
            // barWidth: 40,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:'#fff',
                formatter: function (params) {
                  if(params.value > 0){
                    return  params.value
                  }else{
                    return ''
                  }
                },

              }
            },
            type: 'bar',
            barGap: 0,
            showBackground: false,
          },{
            data: this.chartData.data.data2,
            type: 'bar',
            // barWidth: 40,
            name:'办理中',
            showBackground: false,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:'#fff',
                formatter: function (params) {
                  if(params.value > 0){
                    return  params.value;
                  }else{
                    return ''
                  }

                },

              }
            },
          }]
        });
      }
    },
    computed:{
      echarts() {
        return 'echarts' + Math.random()*100000
      }
    },
    mounted(){
      const vm = this
      vm.$nextTick(()=> {
        vm.drawLine()
      })
//        this.drawLine()
    },
    created: () => {}
  }

</script>
