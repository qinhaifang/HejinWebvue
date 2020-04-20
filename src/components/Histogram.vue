<template>
    <div>
      <div :id="this.chartData.elId" ref="myChart" style="width: 100%;height: 340px"></div>
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
      data(){
        return{

        }
      },
      methods:{
//        Object.assign({},this.chartData)
//        解决Vue __ob__: Observer
        drawLine(){
          console.log('子组件',this.chartData)
          const vm = this;
          let myChart = echarts.init(this.$refs.myChart);
          // 绘制图表
          myChart.setOption({
            title: { text: '' },
            tooltip: {
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {          // 直线指示器样式设置
                  color: '#48b',
                  width: 2,
                  type: 'solid'
                },
                shadowStyle: {                       // 阴影指示器样式设置
                  width: 'auto',                   // 阴影大小
                  color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                }
              },
              textStyle: {
                color: '#fff'
              }

            },
            grid: {
              show: true,    // 是否显示直角坐标系网格
              x:10,
              y:25,
              x2:25,
              y2:35,
//              top: 80,  // 相对位置 top\bottom\left\right
              containLabel: true, // gird 区域是否包含坐标轴的刻度标签
              tooltip: {   //鼠标放上去显示信息
                show: true,
                trigger: 'item',   // 触发类型
                textStyle: {
                  color: '#11c9fd'
                }
              }
            },
            xAxis: {
              nameTextStyle: {   // 坐标轴名称样式
                color: 'red',
                padding: [5, 0, 0, -5]
              },
              nameGap: 1, // 坐标轴名称与轴线之间的距离
              axisLabel: {  //设置坐标轴字体颜色
                show: true,
                textStyle: {
                  color: '#fff',
                },
                interval:0,
//                rotate:40  //x轴名称倾斜
//                formatter:function(value,index)  //叉开，隔一个空一行
//                {
//                  debugger
//                  if (index % 2 != 0) {
//                    return '\n\n' + value;
//                  }
//                  else {
//                    return value;
//                  }
//                }
//                formatter:function(value) {   //隔两个字换行
//                  debugger
//                  var ret = "";//拼接加\n返回的类目项
//                  var maxLength = 2;//每项显示文字个数
//                  var valLength = value.length;//X轴类目项的文字个数
//                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
//                  if (rowN > 1)//如果类目项的文字大于3,
//                  {
//                    for (var i = 0; i < rowN; i++) {
//                      var temp = "";//每次截取的字符串
//                      var start = i * maxLength;//开始截取的位置
//                      var end = start + maxLength;//结束截取的位置
//                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
//                      temp = value.substring(start, end) + "\n";
//                      ret += temp; //凭借最终的字符串
//                    }
//                    return ret;
//                  }
//                  else {
//                    return value;
//                  }
//                }
//                formatter:function(value) {    //字垂直
//                  return value.split("").join("\n");
//                }
              },
              axisLine:{    //设置坐标轴颜色
                lineStyle:{
                  color:'#1dd5fd',
                  width:1,//这里是为了突出显示加上的，可以去掉
                }
              },
              data: Object.assign({},this.chartData).yData
            },
            yAxis: {
              splitLine:{
                show:true,   //是否显示网格线
              },
              axisLine:{
                symbol:['none','arrow'],  //设置坐标箭头
                symbolSize: [10, 10], // 箭头大小
                symbolOffset: [0, 8],  // 箭头位置
                lineStyle:{
                  type:'arrow',   //坐标轴变虚线
                  color:'#1dd5fd',
                  width:1,//坐标轴粗细
                }
              },
              axisTick: {    // 坐标轴 刻度
                show: false,  // 是否显示
                inside: true,  // 是否朝内
                length: 3,     // 长度
                lineStyle: {   // 默认取轴线的样式
                  color: 'red',
                  width: 1,
                  type: 'solid'
                }
              },
              axisLabel: {// 坐标轴标签
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              splitArea: {    // 网格区域
                show: false  // 是否显示，默认为false
              }
            },
            series: [{
              name: '',
              type: 'bar',
              legendHoverLink:true,// 是否启用图列 hover 时的联动高亮
              label: {   // 图形上的文本标签
                show: true,
                position: 'insideTop', // 相对位置
                rotate: 0,  // 旋转角度
                color: '#eee'
              },
              itemStyle: {    // 图形的形状
                color: '#0ac9fe',
                barBorderRadius: [18, 18, 0 ,0]
              },
              barWidth: 20,  // 柱形的宽度
              barCategoryGap: '20%',  // 柱形的间距
              data:Object.assign({},this.chartData).data
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
