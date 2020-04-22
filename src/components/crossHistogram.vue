<template>
    <div>
      <div :id="chartData.elId" ref="myChart" :style="{width:'100%',height:chartData.height}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
    export default{
        props:{
          chartData:{
            type:Object,
            default:()=>{}
          }
        },
        data(){
            return {}
        },
        watch:{
          chartData(val){
            this.drawLine()
          }
        },
        methods: {
          drawLine(){
//          console.log('子组件',this.chartData)
            const vm = this;
            let myChart = echarts.init(this.$refs.myChart);
            // 绘制图表
            myChart.setOption({
              color:['#02c9ff',  '#ffba01', '#ff5c62'],
              title: {
                text: '项目级别统计分析（个）',
                textStyle: {
                  fontSize: 14,
                  color: '#fff',
                },
                y: 'top',
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                left: 'center',
                orient: 'horizontal',
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                min: 0,
                splitNumber: 10,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#ffffff', //更改坐标轴文字颜色
                    fontSize: 16 //更改坐标轴文字大小
                  }
                },

                axisLine: {
                  lineStyle: {
                    color: '#4ADEFE', // 颜色
                    width: 1 // 粗细
                  }
                }
              },
              yAxis: {
                type: 'category',
                data: this.chartData.dataY,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#ffffff', //更改坐标轴文字颜色
                    fontSize: 14 //更改坐标轴文字大小
                  }
                },
                axisLine: {
                  symbol:['none','arrow'],  //设置坐标箭头
                  symbolSize: [10, 10], // 箭头大小
                  symbolOffset: [0, 8],  // 箭头位置
                  lineStyle: {
                    color: '#4ADEFE', // 颜色
                    width: 1 // 粗细
                  }
                }
              },
              series: [{
                data: this.chartData.dataX,
                type: 'bar',
                barWidth: 20,
                label: {
                  normal: {
                    show: true,
                    fontSize: 14,
                    position: 'right',
                    color: '#ffffff',
                    formatter: function(params) {
                      if(params.value > 0) {
                        return params.value
                      } else {
                        return '';
                      }
                    }
                  }
                },
                itemStyle: {    // 图形的形状
                  color: '#0ac9fe',
                  barBorderRadius: [0, 18, 18 ,0]
                }
              }]
            })
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
