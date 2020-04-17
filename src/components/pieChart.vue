<template>
  <div>
    <div id="pieChart" ref="pieChart" style="width: 100%;height: 220px"></div>
  </div>
</template>


<script>
  import echarts from 'echarts'
  export default{
    props:[],
    mounted(){
      this.drawLine()
    },
    methods:{
      drawLine(){
        let myChart = echarts.init(document.getElementById('pieChart'));
        // 绘制图表
        myChart.setOption({
          color:['#02c9ff', '#ffba01', '#ff5c62'],
//          backgroundColor: 'pink',   //整个图表的背景色
          title: {
            text: '',    //主标题
            subtext:'',  //副标题
            left:'center',
            x:'center',   //x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right'
            y:'top',
            itemGap: 30,  // itemGap设置主副标题纵向间隔，单位px，默认为10
            // 主标题文本样式设置
            textStyle: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fff'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 14,
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',  //当trigger为’item’时只会显示该点的数据，为’axis’时显示该列下所有坐标轴所对应的数据。
            showDelay: 20,// 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 20,   // 隐藏延迟，单位ms
//            backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
            textStyle: {
              fontSize: '16px',
              color: '#fff'  // 设置文本颜色 默认#FFF
            },
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend:{
            orient: 'horizontal', //// orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            left: 'center',
            y:'top',
//            itemWidth: 24,   // 设置图例图形的宽
//            itemHeight: 18,  // 设置图例图形的高
            padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
            textStyle: {
              color: '#fff'  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 30,
//            backgroundColor: '#eee',  // 设置整个图例区域背景颜色
            data: ['直接访问', '邮件营销']
          },
          series: [{
            name: '',
            type: 'pie',
            legendHoverLink:true,// 是否启用图列 hover 时的联动高亮
            radius: '50%',
//            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['50%', '40%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'}
            ],
            emphasis: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
//                shadowColor: 'rgba(30, 144, 255，0.5)',
                shadowColor: 'rgba(0, 0, 0，0.5)'
              }
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: 'outer',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{c}'+'亿元'
              }
            }
          }]
        });
      }
    }
  }

</script>
