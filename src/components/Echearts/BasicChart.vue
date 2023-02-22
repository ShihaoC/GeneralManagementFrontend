<template>
  <div :id="id" :style="ChartStyle"></div>
</template>

<script>
import echarts from "echarts";
import Global from "@/views/Global.vue";


export default {
  name: "InterfaceInvoke",
  props:["id","ChartStyle","name","title","data_field","api"],
  mounted() {
    setTimeout(()=>{
      //代码
      this.initChart();
    },800)
  },
  methods:{
    initChart(){
      let myChart = this.$echarts.init(document.getElementById(this.id));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.name]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data_field
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 20
        },
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      Global.newAxios.get(this.api).then((resp)=>{
        myChart.setOption({
          series:[{
            data:resp.data
          }]
        })
      })
      setInterval(()=>{
        Global.newAxios.get(this.api).then((resp)=>{
          myChart.setOption({
            series:[{
              data:resp.data
            }]
          })
        })
      },1000)
      const chartObserver = new ResizeObserver(() => {
        myChart.resize();
      });
      chartObserver.observe(document.getElementById(this.id));
    }
  }
}
</script>

<style scoped>

</style>